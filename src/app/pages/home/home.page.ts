import { Component, OnInit } from "@angular/core";
import { CacheService } from "src/app/shared/services/cache.service";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  userData: any = null;
  constructor(private _cache: CacheService, private _gs: GlobalService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.processDashboard();
  }

  processDashboard() {
    this.userData = {
      name: this._gs.userPfm.value.user.name,
      total_income: this.calcTotal(this._gs.userPfm.value.data.incomes),
      total_expense: this.calcTotal(this._gs.userPfm.value.data.expenses),
      total_balance:
        this.calcTotal(this._gs.userPfm.value.data.incomes) -
        this.calcTotal(this._gs.userPfm.value.data.expenses),
    };
    this._gs.log("user data?", this.userData);
  }

  calcTotal(dataArr: any) {
    this._gs.log("dataarr", dataArr);
    let temp = [];
    dataArr.forEach((data) => {
      this._gs.log("data", data);
      temp.push(data.amount);
    });
    return temp.reduce(function (acc, val) {
      return acc + val;
    }, 0);
  }
}
