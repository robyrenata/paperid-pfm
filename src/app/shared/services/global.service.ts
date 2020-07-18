import { Injectable, isDevMode } from "@angular/core";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { BehaviorSubject } from "rxjs";
import { CacheService } from "./cache.service";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  userPfm = new BehaviorSubject<any>(null);
  constructor(private _cache: CacheService) {
    this.userPfm.subscribe((data) => {
      if (data) {
        this._cache.setStorage("pfm-user", data);
        console.log("set to storage?", this._cache.getStorage("pfm-user"));
      }
    });
  }

  log(message: string, data: any = null, type: string = "log") {
    if (isDevMode()) {
      if (type === "log") {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === "error") {
        console.error(message, data);
      }
    }
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: "This field is required",
        alpha: "Only alphabet are allowed",
        alphaNumeric: "Only alphanumeric are allowed",
        numeric: "Only numeric are allowed",
        url: "Only URL are allowed (www.example.com)",
        email: "Please input correct email format (ex: someone@example.com)",
        phonenumber:
          "Please input correct phone number format (ex: 08123456789)",
        minLength: "Minimum 9 character",
        maxLength: "Maximum 13 character",
      },
    });
  }
}
