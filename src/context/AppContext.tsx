/**
 * HSE Learning Guide - Global Application Context
 * Provides state management for user, progress, preferences, and app-wide data
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import type {
  UserProfile,
  UserPreferences,
  UserProgress,
  HSEModule,
  LearningPath,
  ModuleWithProgress,
  Notification,
  Achievement,
  UserAchievement,
  SearchFilters,
  SortOption,
  OfflineData,
  PendingAction,
} from '../types/hse';
import { HSE_MODULES, LEARNING_PATHS, getModuleById, getLearningPathById } from '../data/modules';

// ============================================
// STATE TYPES
// ============================================

interface AppState {
  // User & Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  // Progress & Learning
  progress: Record<string, UserProgress>; // moduleId -> progress
  currentModuleId: string | null;
  currentLessonId: string | null;
  currentPathId: string | null;

  // UI State
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchQuery: string;
  searchFilters: SearchFilters;
  sortOption: SortOption;
  theme: 'light' | 'dark' | 'system';
  viewMode: 'grid' | 'list' | 'path';

  // Notifications & Achievements
  notifications: Notification[];
  unreadNotificationCount: number;
  achievements: UserAchievement[];
  newAchievement: UserAchievement | null;

  // Offline & Sync
  isOnline: boolean;
  pendingActions: PendingAction[];
  lastSyncedAt: Date | null;
  syncInProgress: boolean;

  // Content
  modules: HSEModule[];
  learningPaths: LearningPath[];
  bookmarkedModules: string[];
  recentlyViewed: string[];

  // Analytics
  dailyGoalMinutes: number;
  todayMinutes: number;
  currentStreak: number;
}

type AppAction =
  | { type: 'SET_USER'; payload: UserProfile | null }
  | { type: 'SET_AUTH_LOADING'; payload: boolean }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_PROGRESS'; payload: { moduleId: string; progress: UserProgress } }
  | { type: 'UPDATE_PROGRESS'; payload: { moduleId: string; updates: Partial<UserProgress> } }
  | { type: 'SET_CURRENT_MODULE'; payload: string | null }
  | { type: 'SET_CURRENT_LESSON'; payload: string | null }
  | { type: 'SET_CURRENT_PATH'; payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_MOBILE_MENU_OPEN'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_FILTERS'; payload: SearchFilters }
  | { type: 'SET_SORT_OPTION'; payload: SortOption }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' | 'path' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'CLEAR_NOTIFICATION'; payload: string }
  | { type: 'ADD_ACHIEVEMENT'; payload: UserAchievement }
  | { type: 'SET_NEW_ACHIEVEMENT'; payload: UserAchievement | null }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'ADD_PENDING_ACTION'; payload: PendingAction }
  | { type: 'REMOVE_PENDING_ACTION'; payload: string }
  | { type: 'SET_SYNC_STATUS'; payload: { inProgress: boolean; lastSyncedAt?: Date } }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'ADD_RECENTLY_VIEWED'; payload: string }
  | { type: 'UPDATE_DAILY_STATS'; payload: { minutes: number; streak?: number } }
  | { type: 'LOAD_OFFLINE_DATA'; payload: OfflineData }
  | { type: 'RESET_APP' };

// ============================================
// INITIAL STATE
// ============================================

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
  progress: {},
  currentModuleId: null,
  currentLessonId: null,
  currentPathId: null,
  sidebarOpen: true,
  mobileMenuOpen: false,
  searchQuery: '',
  searchFilters: {},
  sortOption: { field: 'title', direction: 'asc' },
  theme: 'system',
  viewMode: 'grid',
  notifications: [],
  unreadNotificationCount: 0,
  achievements: [],
  newAchievement: null,
  isOnline: true,
  pendingActions: [],
  lastSyncedAt: null,
  syncInProgress: false,
  modules: HSE_MODULES,
  learningPaths: LEARNING_PATHS,
  bookmarkedModules: [],
  recentlyViewed: [],
  dailyGoalMinutes: 30,
  todayMinutes: 0,
  currentStreak: 0,
};

// ============================================
// REDUCER
// ============================================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        authLoading: false,
        dailyGoalMinutes: action.payload?.preferences.dailyGoalMinutes ?? 30,
      };

    case 'SET_AUTH_LOADING':
      return { ...state, authLoading: action.payload };

    case 'UPDATE_PREFERENCES':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...action.payload },
        },
        dailyGoalMinutes: action.payload.dailyGoalMinutes ?? state.dailyGoalMinutes,
        theme: action.payload.theme ?? state.theme,
      };

    case 'SET_PROGRESS':
      return {
        ...state,
        progress: { ...state.progress, [action.payload.moduleId]: action.payload.progress },
      };

    case 'UPDATE_PROGRESS':
      const existingProgress = state.progress[action.payload.moduleId];
      if (!existingProgress) return state;
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.moduleId]: { ...existingProgress, ...action.payload.updates },
        },
      };

    case 'SET_CURRENT_MODULE':
      return {
        ...state,
        currentModuleId: action.payload,
        currentLessonId: null,
      };

    case 'SET_CURRENT_LESSON':
      return { ...state, currentLessonId: action.payload };

    case 'SET_CURRENT_PATH':
      return { ...state, currentPathId: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.payload };

    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };

    case 'SET_MOBILE_MENU_OPEN':
      return { ...state, mobileMenuOpen: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SEARCH_FILTERS':
      return { ...state, searchFilters: action.payload };

    case 'SET_SORT_OPTION':
      return { ...state, sortOption: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'ADD_NOTIFICATION':
      const newNotification = action.payload;
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 100),
        unreadNotificationCount: state.unreadNotificationCount + (newNotification.read ? 0 : 1),
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1),
      };

    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadNotificationCount: 0,
      };

    case 'CLEAR_NOTIFICATION':
      const notification = state.notifications.find(n => n.id === action.payload);
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadNotificationCount: state.unreadNotificationCount - (notification && !notification.read ? 1 : 0),
      };

    case 'ADD_ACHIEVEMENT':
      const exists = state.achievements.some(a => a.achievementId === action.payload.achievementId);
      if (exists) return state;
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
        newAchievement: action.payload,
      };

    case 'SET_NEW_ACHIEVEMENT':
      return { ...state, newAchievement: action.payload };

    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };

    case 'ADD_PENDING_ACTION':
      return {
        ...state,
        pendingActions: [...state.pendingActions, action.payload],
      };

    case 'REMOVE_PENDING_ACTION':
      return {
        ...state,
        pendingActions: state.pendingActions.filter(a => a.id !== action.payload),
      };

    case 'SET_SYNC_STATUS':
      return {
        ...state,
        syncInProgress: action.payload.inProgress,
        lastSyncedAt: action.payload.lastSyncedAt ?? state.lastSyncedAt,
      };

    case 'TOGGLE_BOOKMARK':
      const isBookmarked = state.bookmarkedModules.includes(action.payload);
      return {
        ...state,
        bookmarkedModules: isBookmarked
          ? state.bookmarkedModules.filter(id => id !== action.payload)
          : [...state.bookmarkedModules, action.payload],
      };

    case 'ADD_RECENTLY_VIEWED':
      const filtered = state.recentlyViewed.filter(id => id !== action.payload);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 20),
      };

    case 'UPDATE_DAILY_STATS':
      return {
        ...state,
        todayMinutes: state.todayMinutes + action.payload.minutes,
        currentStreak: action.payload.streak ?? state.currentStreak,
      };

    case 'LOAD_OFFLINE_DATA':
      return {
        ...state,
        progress: { ...state.progress, ...Object.fromEntries(action.payload.progress.map(p => [p.moduleId, p])) },
        achievements: [...state.achievements, ...action.payload.notes.map(n => ({ ...n } as UserAchievement))],
        pendingActions: action.payload.pendingActions,
        lastSyncedAt: action.payload.lastSyncedAt,
      };

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
}

// ============================================
// CONTEXT
// ============================================

interface AppContextType extends AppState {
  // Actions
  setUser: (user: UserProfile | null) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setProgress: (moduleId: string, progress: UserProgress) => void;
  updateProgress: (moduleId: string, updates: Partial<UserProgress>) => void;
  startModule: (moduleId: string) => void;
  startLesson: (moduleId: string, lessonId: string) => void;
  startPath: (pathId: string) => void;
  completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => void;
  completeModule: (moduleId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSortOption: (option: SortOption) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setViewMode: (mode: 'grid' | 'list' | 'path') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (id: string) => void;
  unlockAchievement: (achievement: Omit<UserAchievement, 'earnedAt'>) => void;
  dismissAchievement: () => void;
  setOnlineStatus: (online: boolean) => void;
  addPendingAction: (action: Omit<PendingAction, 'id' | 'createdAt' | 'retries'>) => void;
  removePendingAction: (id: string) => void;
  setSyncStatus: (inProgress: boolean, lastSyncedAt?: Date) => void;
  toggleBookmark: (moduleId: string) => void;
  addRecentlyViewed: (moduleId: string) => void;
  addLearningTime: (minutes: number) => void;
  getModuleProgress: (moduleId: string) => UserProgress | undefined;
  getModuleWithProgress: (moduleId: string) => ModuleWithProgress | undefined;
  getPathProgress: (pathId: string) => { completed: number; total: number; percentage: number };
  isModuleCompleted: (moduleId: string) => boolean;
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const stored = localStorage.getItem('hse-app-data');
        if (stored) {
          const data = JSON.parse(stored);
          if (data.user) dispatch({ type: 'SET_USER', payload: data.user });
          if (data.progress) {
            Object.entries(data.progress).forEach(([moduleId, progress]) => {
              dispatch({ type: 'SET_PROGRESS', payload: { moduleId, progress: progress as UserProgress } });
            });
          }
          if (data.preferences && data.user) {
            dispatch({ type: 'UPDATE_PREFERENCES', payload: data.preferences });
          }
          if (data.theme) dispatch({ type: 'SET_THEME', payload: data.theme });
          if (data.bookmarkedModules) dispatch({ type: 'TOGGLE_BOOKMARK', payload: data.bookmarkedModules[0] }); // Will be handled properly
          if (data.recentlyViewed) data.recentlyViewed.forEach((id: string) => dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: id }));
          if (data.dailyGoalMinutes) dispatch({ type: 'UPDATE_PREFERENCES', payload: { dailyGoalMinutes: data.dailyGoalMinutes } });
          if (data.currentStreak) dispatch({ type: 'UPDATE_DAILY_STATS', payload: { minutes: 0, streak: data.currentStreak } });
        }
        dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      } catch (error) {
        console.error('Failed to load persisted data:', error);
        dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      }
    };
    loadPersistedData();
  }, []);

  // Persist data on changes
  useEffect(() => {
    if (state.authLoading) return;
    const data = {
      user: state.user,
      progress: state.progress,
      preferences: state.user?.preferences,
      theme: state.theme,
      bookmarkedModules: state.bookmarkedModules,
      recentlyViewed: state.recentlyViewed,
      dailyGoalMinutes: state.dailyGoalMinutes,
      currentStreak: state.currentStreak,
    };
    localStorage.setItem('hse-app-data', JSON.stringify(data));
  }, [state.user, state.progress, state.theme, state.bookmarkedModules, state.recentlyViewed, state.dailyGoalMinutes, state.currentStreak, state.authLoading]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    dispatch({ type: 'SET_ONLINE_STATUS', payload: navigator.onLine });
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme application
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark' || (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  // Computed helpers
  const getModuleProgress = useCallback((moduleId: string) => state.progress[moduleId], [state.progress]);

  const getModuleWithProgress = useCallback((moduleId: string): ModuleWithProgress | undefined => {
    const module = getModuleById(moduleId);
    if (!module) return undefined;
    return { ...module, progress: state.progress[moduleId] };
  }, [state.progress]);

  const getPathProgress = useCallback((pathId: string) => {
    const path = getLearningPathById(pathId);
    if (!path) return { completed: 0, total: 0, percentage: 0 };
    const requiredModules = path.modules.filter(m => m.required);
    let completed = 0;
    requiredModules.forEach(m => {
      const prog = state.progress[m.moduleId];
      if (prog?.status === 'completed' || prog?.status === 'mastered') completed++;
    });
    return {
      completed,
      total: requiredModules.length,
      percentage: requiredModules.length > 0 ? Math.round((completed / requiredModules.length) * 100) : 0,
    };
  }, [state.progress]);

  const isModuleCompleted = useCallback((moduleId: string) => {
    const prog = state.progress[moduleId];
    return prog?.status === 'completed' || prog?.status === 'mastered';
  }, [state.progress]);

  const isLessonCompleted = useCallback((moduleId: string, lessonId: string) => {
    const prog = state.progress[moduleId];
    return prog?.completedLessons.includes(lessonId) ?? false;
  }, [state.progress]);

  // Action creators
  const actions = {
    setUser: (user: UserProfile | null) => dispatch({ type: 'SET_USER', payload: user }),
    updatePreferences: (prefs: Partial<UserPreferences>) => dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs }),
    setProgress: (moduleId: string, progress: UserProgress) => dispatch({ type: 'SET_PROGRESS', payload: { moduleId, progress } }),
    updateProgress: (moduleId: string, updates: Partial<UserProgress>) => dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates } }),
    startModule: (moduleId: string) => {
      dispatch({ type: 'SET_CURRENT_MODULE', payload: moduleId });
      dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: moduleId });
      const existing = state.progress[moduleId];
      if (!existing) {
        const newProgress: UserProgress = {
          userId: state.user?.id ?? 'anonymous',
          moduleId,
          status: 'in-progress',
          startedAt: new Date(),
          lastAccessedAt: new Date(),
          timeSpentMinutes: 0,
          quizScores: [],
          completedLessons: [],
          bookmarkedItems: [],
          notes: [],
        };
        dispatch({ type: 'SET_PROGRESS', payload: { moduleId, progress: newProgress } });
      } else if (existing.status === 'not-started') {
        dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates: { status: 'in-progress', startedAt: new Date() } } });
      }
      dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates: { lastAccessedAt: new Date() } } });
    },
    startLesson: (moduleId: string, lessonId: string) => {
      dispatch({ type: 'SET_CURRENT_LESSON', payload: lessonId });
      dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: lessonId });
      const existing = state.progress[moduleId];
      if (existing) {
        dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates: { lastAccessedAt: new Date() } } });
      }
    },
    startPath: (pathId: string) => dispatch({ type: 'SET_CURRENT_PATH', payload: pathId }),
    completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => {
      const existing = state.progress[moduleId];
      if (!existing) return;
      const completedLessons = [...new Set([...existing.completedLessons, lessonId])];
      const updates: Partial<UserProgress> = { completedLessons, lastAccessedAt: new Date() };
      if (quizScore !== undefined) {
        updates.quizScores = [...existing.quizScores, {
          quizId: `${moduleId}-${lessonId}`,
          score: quizScore,
          maxScore: 100,
          percentage: quizScore,
          passed: quizScore >= 70,
          attemptedAt: new Date(),
          answers: [],
          timeSpentSeconds: 0,
        }];
      }
      dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates } });
    },
    completeModule: (moduleId: string) => {
      const existing = state.progress[moduleId];
      if (!existing) return;
      dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, updates: { status: 'completed', completedAt: new Date() } } });
      // Check for achievements
      const completedCount = Object.values(state.progress).filter(p => p.status === 'completed' || p.status === 'mastered').length + 1;
      if (completedCount === 1) {
        dispatch({ type: 'ADD_ACHIEVEMENT', payload: { userId: state.user?.id ?? 'anonymous', achievementId: 'first-module', earnedAt: new Date() } });
      } else if (completedCount === 5) {
        dispatch({ type: 'ADD_ACHIEVEMENT', payload: { userId: state.user?.id ?? 'anonymous', achievementId: 'five-modules', earnedAt: new Date() } });
      } else if (completedCount === 10) {
        dispatch({ type: 'ADD_ACHIEVEMENT', payload: { userId: state.user?.id ?? 'anonymous', achievementId: 'ten-modules', earnedAt: new Date() } });
      } else if (completedCount === 20) {
        dispatch({ type: 'ADD_ACHIEVEMENT', payload: { userId: state.user?.id ?? 'anonymous', achievementId: 'twenty-modules', earnedAt: new Date() } });
      }
    },
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    setSidebarOpen: (open: boolean) => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open }),
    toggleMobileMenu: () => dispatch({ type: 'TOGGLE_MOBILE_MENU' }),
    setMobileMenuOpen: (open: boolean) => dispatch({ type: 'SET_MOBILE_MENU_OPEN', payload: open }),
    setSearchQuery: (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setSearchFilters: (filters: SearchFilters) => dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters }),
    setSortOption: (option: SortOption) => dispatch({ type: 'SET_SORT_OPTION', payload: option }),
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch({ type: 'SET_THEME', payload: theme }),
    setViewMode: (mode: 'grid' | 'list' | 'path') => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notification, id: crypto.randomUUID(), createdAt: new Date() },
    }),
    markNotificationRead: (id: string) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    markAllNotificationsRead: () => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' }),
    clearNotification: (id: string) => dispatch({ type: 'CLEAR_NOTIFICATION', payload: id }),
    unlockAchievement: (achievement: Omit<UserAchievement, 'earnedAt'>) => dispatch({
      type: 'ADD_ACHIEVEMENT',
      payload: { ...achievement, earnedAt: new Date() },
    }),
    dismissAchievement: () => dispatch({ type: 'SET_NEW_ACHIEVEMENT', payload: null }),
    setOnlineStatus: (online: boolean) => dispatch({ type: 'SET_ONLINE_STATUS', payload: online }),
    addPendingAction: (action: Omit<PendingAction, 'id' | 'createdAt' | 'retries'>) => dispatch({
      type: 'ADD_PENDING_ACTION',
      payload: { ...action, id: crypto.randomUUID(), createdAt: new Date(), retries: 0 },
    }),
    removePendingAction: (id: string) => dispatch({ type: 'REMOVE_PENDING_ACTION', payload: id }),
    setSyncStatus: (inProgress: boolean, lastSyncedAt?: Date) => dispatch({ type: 'SET_SYNC_STATUS', payload: { inProgress, lastSyncedAt } }),
    toggleBookmark: (moduleId: string) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: moduleId }),
    addRecentlyViewed: (moduleId: string) => dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: moduleId }),
    addLearningTime: (minutes: number) => dispatch({ type: 'UPDATE_DAILY_STATS', payload: { minutes } }),
    getModuleProgress,
    getModuleWithProgress,
    getPathProgress,
    isModuleCompleted,
    isLessonCompleted,
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}