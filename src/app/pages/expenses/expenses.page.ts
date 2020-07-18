import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { ExpensesAddComponent } from "./expenses-add/expenses-add.component";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"],
})
export class ExpensesPage implements OnInit {
  expenseList = [];
  constructor(private _gs: GlobalService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseList = this._gs.userPfm.value.data.expenses;
    this._gs.log("expense list", this.expenseList);
  }

  async openModalAdd() {
    const modal = await this.modalCtrl.create({
      component: ExpensesAddComponent,
    });

    modal.onDidDismiss().then((_) => {
      this.getExpenseList();
    });

    return await modal.present();
  }
}
