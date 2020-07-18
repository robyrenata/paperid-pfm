import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class CacheService {
  constructor(private _storage: Storage) {}
  setStorage(key, data) {
    return this._storage.set(key, data);
  }

  getStorage(key) {
    return this._storage.get(key);
  }

  clearStorage(key) {
    return this._storage.remove(key);
  }
}
