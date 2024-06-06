/* eslint-disable @typescript-eslint/no-explicit-any */
interface HighlightStore {
  hs: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
}

class LocalStore {
  private key: string;

  constructor(id?: string) {
    this.key =
      id !== undefined ? `highlight-mengshou-${id}` : "highlight-mengshou";
  }

  private storeToJson(): HighlightStore[] {
    const store = localStorage.getItem(this.key);
    let sources: HighlightStore[];
    try {
      sources = store ? JSON.parse(store) : [];
    } catch (e) {
      sources = [];
    }
    return sources;
  }

  private jsonToStore(stores: HighlightStore[]): void {
    localStorage.setItem(this.key, JSON.stringify(stores));
  }

  public save(data: HighlightStore | HighlightStore[]): void {
    const stores = this.storeToJson();
    const map: { [key: string]: number } = {};
    stores.forEach((store, idx) => (map[store.hs.id] = idx));

    if (!Array.isArray(data)) {
      data = [data];
    }

    data.forEach((store) => {
      if (map[store.hs.id] !== undefined) {
        stores[map[store.hs.id]] = store;
      } else {
        stores.push(store);
      }
    });
    this.jsonToStore(stores);
  }

  public forceSave(store: HighlightStore): void {
    const stores = this.storeToJson();
    stores.push(store);
    this.jsonToStore(stores);
  }

  public remove(id: string): void {
    const stores = this.storeToJson();
    const index = stores.findIndex((store) => store.hs.id === id);
    if (index !== -1) {
      stores.splice(index, 1);
    }
    this.jsonToStore(stores);
  }

  public getAll(): HighlightStore[] {
    return this.storeToJson();
  }

  public removeAll(): void {
    this.jsonToStore([]);
  }
}

export default LocalStore;
