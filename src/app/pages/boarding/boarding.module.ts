import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BoardingPageRoutingModule } from "./boarding-routing.module";

import { BoardingPage } from "./boarding.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardingPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BoardingPage],
})
export class BoardingPageModule {}
