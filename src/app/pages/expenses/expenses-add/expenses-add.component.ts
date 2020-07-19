import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-expenses-add",
  templateUrl: "./expenses-add.component.html",
  styleUrls: ["./expenses-add.component.scss"],
})
export class ExpensesAddComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  currDate = new Date();
  @Input() expenseData = null;

  constructor(
    private fb: FormBuilder,
    private _gs: GlobalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initFormExpense(this.expenseData);
  }

  initFormExpense(data) {
    this._gs.validatorErrorMessage();
    this.fg = this.fb.group({
      date: [
        data.obj ? data.obj.date : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      name: [
        data.obj ? data.obj.name : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      amount: [
        data.obj ? data.obj.amount : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(), RxwebValidators.numeric()],
        }),
      ],
    });
  }

  submitExpense() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      if (!this.expenseData) {
        const tempData = this._gs.userPfm.value;
        tempData.data.expenses.push(this.fg.value);
        this._gs.userPfm.next(tempData);
        this.dismissModal();
      } else {
        const tempData = this._gs.userPfm.value;
        tempData.data.expenses[this.expenseData.index] = this.fg.value;
        this._gs.userPfm.next(tempData);
        this.dismissModal();
      }
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
