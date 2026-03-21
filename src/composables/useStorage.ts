import { storageService } from '@/services/storage.service'

export function useStorage() {
  async function get<T>(key: string): Promise<T | null> {
    return storageService.get<T>(key)
  }

  async function set<T>(key: string, value: T): Promise<void> {
    return storageService.set(key, value)
  }

  async function remove(key: string): Promise<void> {
    return storageService.remove(key)
  }

  async function clear(): Promise<void> {
    return storageService.clear()
  }

  /**
   * Get a value with a default fallback if not found
   */
  async function getOrDefault<T>(key: string, defaultValue: T): Promise<T> {
    const value = await storageService.get<T>(key)
    return value ?? defaultValue
  }

  /**
   * Update a stored value by applying a transform function
   */
  async function update<T>(key: string, updater: (current: T | null) => T): Promise<void> {
    const current = await storageService.get<T>(key)
    const updated = updater(current)
    await storageService.set(key, updated)
  }

  return {
    get,
    set,
    remove,
    clear,
    getOrDefault,
    update,
  }
}
