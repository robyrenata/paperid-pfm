import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { IncomesAddComponent } from "./incomes-add/incomes-add.component";

@Component({
  selector: "app-incomes",
  templateUrl: "./incomes.page.html",
  styleUrls: ["./incomes.page.scss"],
})
export class IncomesPage implements OnInit {
  incomeList = [];

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
    this._gs.log("income list", this.incomeList);
  }

  async openModalAdd() {
    const modal = await this.modalController.create({
      component: IncomesAddComponent,
    });

    modal.onDidDismiss().then((_) => {
      this.getIncomeList();
    });
    return await modal.present();
  }
}
