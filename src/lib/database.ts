/**
 * IndexedDB abstraction layer for W Planner.
 * All data is partitioned by userId for future multi-user support.
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';

const DB_NAME = 'wplanner';
const DB_VERSION = 1;
const DEFAULT_USER_ID = 'default';

interface WPlannerDB extends DBSchema {
  /** Generic key-value store, keyed by `${userId}::${storeKey}` */
  kvStore: {
    key: string;
    value: {
      compositeKey: string;
      userId: string;
      storeKey: string;
      data: unknown;
      updatedAt: number;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<WPlannerDB>> | null = null;

function getDB(): Promise<IDBPDatabase<WPlannerDB>> {
  if (!dbPromise) {
    dbPromise = openDB<WPlannerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('kvStore')) {
          db.createObjectStore('kvStore', { keyPath: 'compositeKey' });
        }
      },
    });
  }
  return dbPromise;
}

function compositeKey(userId: string, storeKey: string): string {
  return `${userId}::${storeKey}`;
}

/**
 * Read a value from the database.
 * Falls back to `fallback` if not found or on error.
 */
export async function dbGet<T>(storeKey: string, fallback: T, userId = DEFAULT_USER_ID): Promise<T> {
  try {
    const db = await getDB();
    const record = await db.get('kvStore', compositeKey(userId, storeKey));
    if (record) return record.data as T;
    return fallback;
  } catch (err) {
    console.warn(`[database] dbGet("${storeKey}") failed:`, err);
    return fallback;
  }
}

/**
 * Write a value to the database.
 */
export async function dbSet<T>(storeKey: string, data: T, userId = DEFAULT_USER_ID): Promise<void> {
  try {
    const db = await getDB();
    await db.put('kvStore', {
      compositeKey: compositeKey(userId, storeKey),
      userId,
      storeKey,
      data,
      updatedAt: Date.now(),
    });
  } catch (err) {
    console.warn(`[database] dbSet("${storeKey}") failed:`, err);
  }
}

/**
 * Delete a key from the database.
 */
export async function dbDelete(storeKey: string, userId = DEFAULT_USER_ID): Promise<void> {
  try {
    const db = await getDB();
    await db.delete('kvStore', compositeKey(userId, storeKey));
  } catch (err) {
    console.warn(`[database] dbDelete("${storeKey}") failed:`, err);
  }
}

/**
 * List all keys for a given userId.
 */
export async function dbListKeys(userId = DEFAULT_USER_ID): Promise<string[]> {
  try {
    const db = await getDB();
    const allKeys = await db.getAllKeys('kvStore');
    const prefix = `${userId}::`;
    return allKeys
      .filter((k) => k.startsWith(prefix))
      .map((k) => k.slice(prefix.length));
  } catch (err) {
    console.warn(`[database] dbListKeys failed:`, err);
    return [];
  }
}
