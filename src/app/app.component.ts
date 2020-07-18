import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CacheService } from "./shared/services/cache.service";
import { GlobalService } from "./shared/services/global.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  user: any = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _cache: CacheService,
    private _gs: GlobalService,
    private router: Router
  ) {
    this.initializeApp();
    this._cache.getStorage("pfm-user").then((res) => {
      this._gs.log("res????", res);
      if (!res) {
        this.router.navigate(["/boarding"]);
      } else {
        this._gs.userPfm.next(res);
        this._gs.log("gs user", this._gs.userPfm);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
