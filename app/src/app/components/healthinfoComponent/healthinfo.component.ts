/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { storageService } from "../../services/storage/storage.service";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/
import { datasharingService } from "app/services/datasharing/datasharing.service";

import { masterdataService } from "../../services/masterdata/masterdata.service";

@Component({
  selector: "bh-healthinfo",
  templateUrl: "./healthinfo.template.html",
})
export class healthinfoComponent extends NBaseComponent implements OnInit {
  localdata: any;
  // addlinfo= any;
  public selected1: string;
  public selected2: string;

  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private datasharingService: datasharingService,
    private localStorage: storageService
  ) {
    super();
    this.updateLocaleLanguage();
    this.getUserResponse();
  }

  async getUserResponse() {
    //saving user responses in local storage
    let uResp = await this.localStorage.getValue("userResponse");
    if (typeof uResp === "string") {
      this.localdata = JSON.parse(uResp);
    } else {
      this.localdata = uResp;
    }
  }

  // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  async updateLocaleLanguage() {
    let language = await this.localStorage.getValue("language");
    if (language) {
      this.localeService.language = language;
    }
  }

  answer: string = "";
  answer2: string = "";
  //answer3: string = '';
  shortTextOne = "had fever";
  shortTextTwo = "had Personal Contact";
  showError: Boolean = false;
  val1: any;
  val2: any;
  ngOnInit() {
    this.getVals();
  }

  async getVals() {
    //Getting the saved user responses and updating in the DOM
    let select1 = await this.localStorage.getValue("val1");
    let select2 = await this.localStorage.getValue("val2");
    if (select1) {
      this.selected1 = select1;
      this.selected2 = select2;
      this.val1 = select1;
      this.val2 = select2;
    }
  }

  async onChangeRadio(e, questionIndex) {
    this.val1 = e.value;
    this.answer = this.val1;

    if (questionIndex == "1") {
      this.masterdata.answer1 = this.val1;

      this.masterdata.questionId = questionIndex;
      this.masterdata.shortTextOne = this.shortTextOne;
      this.localStorage.setValue(
        "answer1",
        JSON.stringify({
          questionId: this.masterdata.questionId,
          answer: this.masterdata.answer1,
          shortText: this.shortTextOne,
        })
      );
    }
  }

  async onChangeRadioTwo(e, questionIndex) {
    this.val2 = e.value;
    this.answer = this.val2;
    if (questionIndex == "2") {
      this.masterdata.answer2 = this.val2;

      this.masterdata.questionId2 = questionIndex;
      this.masterdata.shortTextTwo = this.shortTextTwo;
      await this.localStorage.setValue(
        "answer2",
        JSON.stringify({
          questionId: this.masterdata.questionId2,
          answer: this.masterdata.answer2,
          shortText: this.shortTextTwo,
        })
      );
    }
  }

  onBack() {
    this.router.navigate(["/landingpage"]);
  }

  async onNext() {
    if (this.val1 && this.val2) {
      await this.localStorage.setValue("val1", this.val1);
      await this.localStorage.setValue("val2", this.val2);
      this.router.navigate(["/hinfonext"]);
    } else {
      this.datasharingService.openSnackBar("Please answer for questions", "X");
    }
  }
}
