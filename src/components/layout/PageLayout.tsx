/**
 * HSE Learning Guide - Main Page Layout
 * Provides sidebar navigation, header, and responsive layout
 */

import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { AchievementToast } from '../feedback/AchievementToast';
import { NotificationBell } from '../feedback/NotificationBell';
import { ThemeToggle } from '../ui/ThemeToggle';

export function PageLayout() {
  const { sidebarOpen, mobileMenuOpen, setSidebarOpen, setMobileMenuOpen, user, isAuthenticated } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-hse-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (except for auth pages handled in routes)
  // This is handled by the routes configuration

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`lg:pl-64 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        {/* Header */}
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 xl:p-8 pb-16" id="main-content" role="main">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 px-4 lg:px-6 xl:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 HSE Learning Guide. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-hse-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-hse-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-hse-primary transition-colors">Contact</a>
              <span className="px-2 py-1 bg-hse-primary/10 text-hse-primary rounded-full text-xs font-medium">
                v1.0.0
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Global Toasts */}
      <AchievementToast />
      <NotificationBell />
    </div>
  );
}