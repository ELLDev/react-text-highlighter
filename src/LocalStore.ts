import { DomMeta } from "web-highlighter/dist/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HighlightStore {
  highlightSource: {
    id: string;
    startMeta: DomMeta;
    endMeta: DomMeta;
    text: string;
    extra: {
      color: string;
    };
  };
}

class LocalStore {
  private key: string;

  constructor(id?: string) {
    this.key =
      id !== undefined ? `highlight-storage-${id}` : "highlight-storage";
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
    stores.forEach((store, idx) => (map[store.highlightSource.id] = idx));

    if (!Array.isArray(data)) {
      data = [data];
    }

    data.forEach((store) => {
      if (map[store.highlightSource.id] !== undefined) {
        stores[map[store.highlightSource.id]] = store;
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
    const index = stores.findIndex((store) => store.highlightSource.id === id);
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
