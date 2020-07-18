import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CacheService } from "src/app/shared/services/cache.service";
import { GlobalService } from "src/app/shared/services/global.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { IonInput } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-boarding",
  templateUrl: "./boarding.page.html",
  styleUrls: ["./boarding.page.scss"],
})
export class BoardingPage implements OnInit {
  fg: FormGroup;
  submitted = false;
  @ViewChild("focus") el: IonInput;
  constructor(
    private fb: FormBuilder,
    private _cache: CacheService,
    private _gs: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this._gs.validatorErrorMessage();
    this.fg = this.fb.group({
      name: [
        null,
        RxwebValidators.compose({
          validators: [
            RxwebValidators.required(),
            RxwebValidators.pattern({
              expression: { alphanumspace: /^[a-zA-Z0-9\-\s]+$/ },
              message: "Only alphanumeric and space are allowed",
            }),
          ],
        }),
      ],
      email: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(), RxwebValidators.email()],
        }),
      ],
    });
    setTimeout(() => {
      this.el.setFocus();
    }, 200);
  }

  submitUser() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      this._gs.log("val?", this.fg.value);
      const obj = {
        user: this.fg.value,
        data: {
          incomes: [],
          expenses: [],
        },
      };
      this._gs.log("obj?", JSON.stringify(obj));
      this._cache.setStorage("pfm-user", obj);
      this.router.navigate(["/tabs/home"]);
    }
  }
}
