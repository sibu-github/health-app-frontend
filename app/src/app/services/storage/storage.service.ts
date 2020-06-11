/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from "@angular/core";
import { NLocalStorageService, NSystemService } from "neutrinos-seed-services";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable()
export class storageService {
  private systemService: NSystemService = NSystemService.getInstance();
  constructor(
    private nLocalStorage: NLocalStorageService,
    private nativeStorage: NativeStorage
  ) {
    //
  }

  // set value to local storage
  async setValue(key: string, value: any): Promise<any> {
    if (!key) {
      console.error("Error setting value in local storage: key is missing");
      return false;
    }

    if (!value) {
      console.error("Error setting value in local storage: value is missing");
      return false;
    }

    try {
      if (this.systemService.deviceType === "browser") {
        await this.nLocalStorage.setValue(key, value);
      } else {
        await this.nativeStorage.setItem(key, value);
      }
      return true;
    } catch (err) {
      console.error("Error setting value in local storage:", err);
      return false;
    }
  }

  async getValue(key: string): Promise<any> {
    if (!key) {
      console.error("Error getting value in local storage: key is missing");
      return false;
    }

    try {
      if (this.systemService.deviceType === "browser") {
        return await this.nLocalStorage.getValue(key);
      } else {
        return await this.nativeStorage.getItem(key);
      }
    } catch (err) {
      console.error("Error getting value from local storage", err);
      return false;
    }
  }

  async remove(key: string): Promise<any> {
    if (!key) {
      console.error("Error removing value in local storage: key is missing");
      return false;
    }

    try {
      if (this.systemService.deviceType === "browser") {
        await this.nLocalStorage.remove(key);
      } else {
        await this.nativeStorage.remove(key);
      }
      return true;
    } catch (err) {
      console.error("Error removing value in local storage: ", err);
      return false;
    }
  }
}
