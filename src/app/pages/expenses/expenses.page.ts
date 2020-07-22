import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { ExpensesAddComponent } from "./expenses-add/expenses-add.component";
import * as _ from "lodash";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"],
})
export class ExpensesPage implements OnInit {
  expenseList = [];
  selectMode = false;
  sortMode = "default";
  constructor(private _gs: GlobalService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseList = this._gs.userPfm.value.data.expenses;
    this._gs.log("expense list", this.expenseList);
    if (this.expenseList.length) {
      this.expenseList.forEach((element) => {
        element.selected = false;
      });
    }
  }

  async openModalAdd(expenseData = null) {
    const modal = await this.modalCtrl.create({
      component: ExpensesAddComponent,
      componentProps: {
        expenseData,
      },
    });

    modal.onDidDismiss().then((_) => {
      this.getExpenseList();
    });

    return await modal.present();
  }

  goToModeFunction(type) {
    if (type === "delete") {
      const filteredData = this.expenseList.filter(
        (data) => data.selected === false
      );
      const tempData = this._gs.userPfm.value;
      tempData.data.expenses = filteredData;
      this._gs.userPfm.next(tempData);
      this.getExpenseList();
      this.selectMode = false;
    }
  }

  onToggle(event) {
    this.selectMode = event;
    this.expenseList.forEach((element) => {
      element.selected = false;
    });
  }

  actionMode(idx) {
    if (this.selectMode) {
      !this.expenseList[idx].selected
        ? (this.expenseList[idx].selected = true)
        : (this.expenseList[idx].selected = false);
    } else {
      const dataPass = {
        obj: this.expenseList[idx],
        index: idx,
      };
      this.openModalAdd(dataPass);
    }
  }

  sort(mode) {
    this.sortMode = mode;
    this.getExpenseList();
    switch (mode) {
      case "name":
        this.expenseList = _.sortBy(this.expenseList, [
          function (o) {
            return o.name;
          },
        ]);
        break;
      case "date":
        this.expenseList = _.sortBy(this.expenseList, [
          function (o) {
            return o.date;
          },
        ]);
        break;
      case "amount":
        this.expenseList = _.sortBy(this.expenseList, [
          function (o) {
            return o.amount;
          },
        ]);
        break;
      default:
        this.getExpenseList();
        break;
    }
  }
}
