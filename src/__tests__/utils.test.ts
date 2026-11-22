/**
 * HSE Learning Guide - Utility Tests
 */

import { describe, it, expect } from 'vitest';
import {
  cn,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatDuration,
  formatFileSize,
  truncate,
  slugify,
  capitalizeWords,
  generateId,
  generateUUID,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  getNestedValue,
  setNestedValue,
  flattenObject,
  groupBy,
  multiSort,
  unique,
  chunkArray,
  shuffleArray,
  getRandomItem,
  getRandomItems,
  calculatePercentage,
  clamp,
  lerp,
  stringToColor,
  getContrastColor,
  formatNumber,
  formatCurrency,
  getInitials,
  getAvatarColor,
  getAvatarTextColor,
  parseQueryString,
  buildQueryString,
  sleep,
  retry,
  storage,
  sessionStorage,
  cookies,
  device,
  features,
} from '../utils';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('handles conditional classes', () => {
    expect(cn('a', true && 'b', false && 'c')).toBe('a b');
  });

  it('handles objects', () => {
    expect(cn({ a: true, b: false, c: true })).toBe('a c');
  });
});

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  it('accepts string dates', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
  });
});

describe('formatRelativeTime', () => {
  it('returns "just now" for recent times', () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe('just now');
  });

  it('formats minutes ago', () => {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    expect(formatRelativeTime(twoMinutesAgo)).toBe('2 min ago');
  });

  it('formats hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeHoursAgo)).toBe('3h ago');
  });

  it('formats days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoDaysAgo)).toBe('2d ago');
  });
});

describe('formatDuration', () => {
  it('formats minutes', () => {
    expect(formatDuration(30)).toBe('30 min');
  });

  it('formats hours', () => {
    expect(formatDuration(90)).toBe('1h 30min');
  });

  it('formats hours only', () => {
    expect(formatDuration(120)).toBe('2h');
  });
});

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(1500)).toBe('1.46 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(2000000)).toBe('1.91 MB');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello world', 8)).toBe('Hello...');
  });

  it('returns original if shorter', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('slugify', () => {
  it('converts to slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('Hello @ World #1')).toBe('hello-world-1');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });
});

describe('generateId', () => {
  it('generates ID of correct length', () => {
    expect(generateId(8)).toHaveLength(8);
    expect(generateId(16)).toHaveLength(16);
  });
});

describe('generateUUID', () => {
  it('generates valid UUID', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});

describe('debounce', () => {
  it('delays function execution', async () => {
    let callCount = 0;
    const debouncedFn = debounce(() => { callCount++; }, 50);
    
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    expect(callCount).toBe(0);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callCount).toBe(1);
  });
});

describe('throttle', () => {
  it('limits function calls', async () => {
    let callCount = 0;
    const throttledFn = throttle(() => { callCount++; }, 50);
    
    throttledFn();
    throttledFn();
    throttledFn();
    
    expect(callCount).toBe(1);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    throttledFn();
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(callCount).toBe(2);
  });
});

describe('deepClone', () => {
  it('clones objects deeply', () => {
    const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
    const cloned = deepClone(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.d).not.toBe(original.d);
  });

  it('handles dates', () => {
    const date = new Date('2024-01-15');
    const obj = { date };
    const cloned = deepClone(obj);
    
    expect(cloned.date).toEqual(date);
    expect(cloned.date).not.toBe(date);
  });
});

describe('isEmpty', () => {
  it('returns true for null/undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for empty arrays/objects', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  it('returns false for non-empty', () => {
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});

describe('getNestedValue', () => {
  it('gets nested values', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(getNestedValue(obj, 'a.b.c')).toBe(1);
    expect(getNestedValue(obj, 'a.b')).toEqual({ c: 1 });
  });

  it('returns default for missing paths', () => {
    const obj = { a: 1 };
    expect(getNestedValue(obj, 'a.b.c', 'default')).toBe('default');
  });
});

describe('setNestedValue', () => {
  it('sets nested values', () => {
    const obj = {};
    setNestedValue(obj, 'a.b.c', 1);
    expect(obj).toEqual({ a: { b: { c: 1 } } });
  });
});

describe('flattenObject', () => {
  it('flattens nested objects', () => {
    const obj = { a: { b: 1, c: { d: 2 } }, e: 3 };
    expect(flattenObject(obj)).toEqual({
      'a.b': 1,
      'a.c.d': 2,
      e: 3,
    });
  });
});

describe('groupBy', () => {
  it('groups array by key', () => {
    const arr = [
      { category: 'a', value: 1 },
      { category: 'b', value: 2 },
      { category: 'a', value: 3 },
    ];
    const grouped = groupBy(arr, 'category');
    expect(grouped).toEqual({
      a: [{ category: 'a', value: 1 }, { category: 'a', value: 3 }],
      b: [{ category: 'b', value: 2 }],
    });
  });
});

describe('multiSort', () => {
  it('sorts by multiple criteria', () => {
    const arr = [
      { name: 'a', age: 30 },
      { name: 'b', age: 20 },
      { name: 'a', age: 25 },
    ];
    const sorted = multiSort(arr, [
      { key: 'name', order: 'asc' },
      { key: 'age', order: 'asc' },
    ]);
    expect(sorted.map(x => x.name)).toEqual(['a', 'a', 'b']);
    expect(sorted[0].age).toBe(25);
    expect(sorted[1].age).toBe(30);
  });
});

describe('unique', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('works with key function', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(unique(arr, 'id')).toHaveLength(2);
  });
});

describe('chunkArray', () => {
  it('chunks array into chunks', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});

describe('shuffleArray', () => {
  it('shuffles array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toHaveLength(5);
    expect(shuffled).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
  });
});

describe('getRandomItem', () => {
  it('returns random item', () => {
    const item = getRandomItem([1, 2, 3]);
    expect([1, 2, 3]).toContain(item);
  });

  it('returns undefined for empty array', () => {
    expect(getRandomItem([])).toBeUndefined();
  });
});

describe('getRandomItems', () => {
  it('returns specified number of items', () => {
    const items = getRandomItems([1, 2, 3, 4, 5], 3);
    expect(items).toHaveLength(3);
  });
});

describe('calculatePercentage', () => {
  it('calculates percentage', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(25, 100)).toBe(25);
  });

  it('handles zero total', () => {
    expect(calculatePercentage(10, 0)).toBe(0);
  });
});

describe('clamp', () => {
  it('clamps value between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('lerp', () => {
  it('interpolates between values', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 100, 0.25)).toBe(25);
  });
});

describe('stringToColor', () => {
  it('generates consistent color from string', () => {
    const color1 = stringToColor('hello');
    const color2 = stringToColor('hello');
    expect(color1).toBe(color2);
    expect(color1).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('getContrastColor', () => {
  it('returns black for light colors', () => {
    expect(getContrastColor('#ffffff')).toBe('#000000');
    expect(getContrastColor('#ffff00')).toBe('#000000');
  });

  it('returns white for dark colors', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
    expect(getContrastColor('#0000ff')).toBe('#ffffff');
  });
});

describe('formatNumber', () => {
  it('formats numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});

describe('formatCurrency', () => {
  it('formats currency', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(1000, 'EUR', 'de-DE')).toBe('1.000 €');
  });
});

describe('getInitials', () => {
  it('gets initials from name', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('John')).toBe('J');
    expect(getInitials('John Michael Doe')).toBe('JM');
  });
});

describe('getAvatarColor', () => {
  it('returns consistent color for name', () => {
    const color1 = getAvatarColor('John');
    const color2 = getAvatarColor('John');
    expect(color1).toBe(color2);
  });
});

describe('getAvatarTextColor', () => {
  it('returns contrast color', () => {
    expect(getAvatarTextColor('bg-blue-500')).toBe('text-white');
    expect(getAvatarTextColor('bg-gray-500')).toBe('text-white');
  });
});

describe('parseQueryString', () => {
  it('parses query string', () => {
    expect(parseQueryString('a=1&b=2')).toEqual({ a: '1', b: '2' });
  });
});

describe('buildQueryString', () => {
  it('builds query string', () => {
    expect(buildQueryString({ a: '1', b: '2' })).toBe('a=1&b=2');
  });

  it('handles arrays', () => {
    expect(buildQueryString({ a: ['1', '2'] })).toBe('a=1&a=2');
  });
});

describe('sleep', () => {
  it('delays execution', async () => {
    const start = Date.now();
    await sleep(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });
});

describe('retry', () => {
  it('retries on failure', async () => {
    let attempts = 0;
    const result = await retry(async () => {
      attempts++;
      if (attempts < 3) throw new Error('fail');
      return 'success';
    }, 3, 10);
    
    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });
});

describe('storage', () => {
  it('sets and gets values', () => {
    storage.set('test', { a: 1 });
    expect(storage.get('test')).toEqual({ a: 1 });
    storage.remove('test');
    expect(storage.get('test')).toBeNull();
  });
});

describe('sessionStorage', () => {
  it('sets and gets values', () => {
    sessionStorage.set('test', { a: 1 });
    expect(sessionStorage.get('test')).toEqual({ a: 1 });
    sessionStorage.remove('test');
    expect(sessionStorage.get('test')).toBeNull();
  });
});

describe('cookies', () => {
  it('sets and gets cookies', () => {
    cookies.set('test', 'value', 1);
    expect(cookies.get('test')).toBe('value');
    cookies.remove('test');
    expect(cookies.get('test')).toBeNull();
  });
});

describe('device', () => {
  it('detects device type', () => {
    // These will depend on the test environment
    expect(typeof device.isMobile()).toBe('boolean');
    expect(typeof device.isDesktop()).toBe('boolean');
    expect(typeof device.isTouch()).toBe('boolean');
  });
});

describe('features', () => {
  it('detects features', () => {
    expect(typeof features.hasLocalStorage()).toBe('boolean');
    expect(typeof features.hasSessionStorage()).toBe('boolean');
    expect(typeof features.hasServiceWorker()).toBe('boolean');
  });
});

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('handles conditional classes', () => {
    expect(cn('a', true && 'b', false && 'c')).toBe('a b');
  });

  it('handles objects', () => {
    expect(cn({ a: true, b: false, c: true })).toBe('a c');
  });
});