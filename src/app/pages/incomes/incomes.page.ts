import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { IncomesAddComponent } from "./incomes-add/incomes-add.component";
import * as _ from "lodash";
@Component({
  selector: "app-incomes",
  templateUrl: "./incomes.page.html",
  styleUrls: ["./incomes.page.scss"],
})
export class IncomesPage implements OnInit {
  incomeList = [];
  selectMode = false;
  sortMode = "default";

  constructor(
    private _gs: GlobalService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getIncomeList();
  }

  getIncomeList() {
    this.incomeList = this._gs.userPfm.value.data.incomes;
    if (this.incomeList.length) {
      this.incomeList.forEach((element) => {
        element.selected = false;
      });
    }
    this._gs.log("income list", this.incomeList);
  }

  async openModalAdd(incomeData) {
    const modal = await this.modalController.create({
      component: IncomesAddComponent,
      componentProps: {
        incomeData,
      },
    });

    modal.onDidDismiss().then((_) => {
      this.getIncomeList();
    });
    return await modal.present();
  }

  goToModeFunction(type) {
    if (type == "delete") {
      const filteredData = this.incomeList.filter(
        (data) => data.selected === false
      );
      this._gs.log("res", filteredData);
      const tempData = this._gs.userPfm.value;
      tempData.data.incomes = filteredData;
      this._gs.userPfm.next(tempData);
      this.getIncomeList();
      this.selectMode = false;
    }
  }

  onToggle(event) {
    this._gs.log("event?", event);
    this.selectMode = event;
    this.incomeList.forEach((element) => {
      element.selected = false;
    });
  }

  actionMode(idx) {
    this._gs.log("data selected?", idx);
    if (this.selectMode) {
      !this.incomeList[idx].selected
        ? (this.incomeList[idx].selected = true)
        : (this.incomeList[idx].selected = false);
      this._gs.log("new inclist", this.incomeList);
    } else {
      this._gs.log("data pas?", this.incomeList[idx]);
      const dataPass = {
        obj: this.incomeList[idx],
        index: idx,
      };
      this.openModalAdd(dataPass);
    }
  }

  sort(mode) {
    this.sortMode = mode;
    this.getIncomeList();
    switch (mode) {
      case "name":
        this.incomeList = _.sortBy(this.incomeList, [
          function (o) {
            return o.name;
          },
        ]);
        break;
      case "date":
        this.incomeList = _.sortBy(this.incomeList, [
          function (o) {
            return o.date;
          },
        ]);
        break;
      case "amount":
        this.incomeList = _.sortBy(this.incomeList, [
          function (o) {
            return o.amount;
          },
        ]);
        break;
      default:
        this.getIncomeList();
        break;
    }
  }
}
