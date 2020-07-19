import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IncomesPageRoutingModule } from "./incomes-routing.module";

import { IncomesPage } from "./incomes.page";
import { IncomesAddComponent } from "./incomes-add/incomes-add.component";
import { LongPressModule } from "ionic-long-press";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomesPageRoutingModule,
    ReactiveFormsModule,
    LongPressModule,
  ],
  declarations: [IncomesPage, IncomesAddComponent],
})
export class IncomesPageModule {}
