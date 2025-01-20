export class LocalStorageService {
  // Obținerea unei valori sub formă de obiect JSON de la o cheie specifică
  static get<T>(key: string): T | null {
    try {
      const stringValue = localStorage.getItem(key);
      if (stringValue === null) {
        return null;
      }
      return JSON.parse(stringValue) as T;
    } catch (error) {
      console.error("Load from localStorage failed: ", error);
      return null;
    }
  }

  // Returnarea tuturor valorilor din localStorage sub formă de obiect
  static getAll(): { [key: string]: any } {
    let items: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        const value = localStorage.getItem(key);
        try {
          items[key] = JSON.parse(value!);
        } catch (error) {
          items[key] = value;
        }
      }
    }
    return items;
  }

  // Adăugarea sau actualizarea unei valori la o cheie specifică
  static set<T>(key: string, value: T): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error("Save to localStorage failed: ", error);
    }
  }

  // Ștergerea unei valori de la o cheie specifică
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Remove from localStorage failed: ", error);
    }
  }

  // Curățarea completă a localStorage
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Clear localStorage failed: ", error);
    }
  }
}
