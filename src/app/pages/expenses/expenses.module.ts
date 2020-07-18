import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExpensesPageRoutingModule } from "./expenses-routing.module";

import { ExpensesPage } from "./expenses.page";
import { ExpensesAddComponent } from "./expenses-add/expenses-add.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ExpensesPage, ExpensesAddComponent],
})
export class ExpensesPageModule {}
