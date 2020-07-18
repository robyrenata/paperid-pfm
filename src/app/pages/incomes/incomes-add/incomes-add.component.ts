import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/global.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { CacheService } from "src/app/shared/services/cache.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-incomes-add",
  templateUrl: "./incomes-add.component.html",
  styleUrls: ["./incomes-add.component.scss"],
})
export class IncomesAddComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  currDate = new Date();
  constructor(
    private fb: FormBuilder,
    private _gs: GlobalService,
    private _cache: CacheService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initFormIncome();
  }

  initFormIncome() {
    this._gs.validatorErrorMessage();
    this.fg = this.fb.group({
      date: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      name: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      amount: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(), RxwebValidators.numeric()],
        }),
      ],
    });
  }

  addIncome() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      this._gs.log("val?", this.fg.value);
      this._gs.log("pfm user?", this._gs.userPfm);
      const tempData = this._gs.userPfm.value;
      tempData.data.incomes.push(this.fg.value);
      this._gs.log("temp data?", tempData);
      this._gs.userPfm.next(tempData);
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
