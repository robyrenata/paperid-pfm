import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/global.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
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
  @Input() incomeData;
  constructor(
    private fb: FormBuilder,
    private _gs: GlobalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initFormIncome(this.incomeData);
  }

  initFormIncome(data) {
    this._gs.validatorErrorMessage();
    this.fg = this.fb.group({
      date: [
        data ? data.obj.date : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      name: [
        data ? data.obj.name : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      amount: [
        data ? data.obj.amount : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(), RxwebValidators.numeric()],
        }),
      ],
    });
  }

  submitIncome() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      if (!this.incomeData) {
        this._gs.log("val?", this.fg.value);
        this._gs.log("pfm user?", this._gs.userPfm);
        const tempData = this._gs.userPfm.value;
        tempData.data.incomes.push(this.fg.value);
        this._gs.log("temp data?", tempData);
        this._gs.userPfm.next(tempData);
        this.dismissModal();
      } else {
        this._gs.log("val new?", this.fg.value);
        const tempData = this._gs.userPfm.value;
        tempData.data.incomes[this.incomeData.index] = this.fg.value;
        this._gs.userPfm.next(tempData);
        this.dismissModal();
      }
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
