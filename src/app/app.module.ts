import { NgModule } from "@angular/core";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";
import { IonicGestureConfig } from "./utils/ionic-gesture-config";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig,
    },
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
