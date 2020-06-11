/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { storageService } from "../../services/storage/storage.service";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

import { masterdataService } from "../../services/masterdata/masterdata.service";
import { datasharingService } from "app/services/datasharing/datasharing.service";

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-healthinfonext",
  templateUrl: "./healthinfonext.template.html",
})
export class healthinfonextComponent extends NBaseComponent implements OnInit {
  answer: string = "";
  addlinfo: any;
  shortTextThree = "Travelled Outside Country";
  enableTextArea: Boolean = false;
  val3: any;
  public selected3: string;
  localdata: any;
  name = "";
  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private datasharingService: datasharingService,
    private localStorage: storageService
  ) {
    super();

    this.getSavedUserResponse();
    this.updateLocaleLanguage();
    this.getUserResponse();
  }

  //Getting the saved user responses and updating in the DOM
  async getSavedUserResponse() {
    let select3 = await this.localStorage.getValue("val3");
    let addlinformation = await this.localStorage.getValue("addlinfo");
    if (select3) {
      this.selected3 = select3;
      this.val3 = select3;
      if (this.val3 == "true") {
        this.enableTextArea = true;
        this.name = addlinformation;
      } else {
        this.enableTextArea = false;
      }
    }
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

  ngOnInit() {
    if (this.localdata && this.localdata.response.length > 0) {
      this.answer = this.localdata.response[2].answer;
      this.addlinfo = this.localdata.response[2].addlnfo;
    } else {
      this.answer = "false";
      this.addlinfo = "";
    }
  }

  //question :boolean = false;
  async onChangeRadio(e, questionIndex) {
    this.val3 = e.value;
    this.answer = this.val3;
    if (questionIndex == "3") {
      if (e.value == "true") {
        this.enableTextArea = true;
      } else {
        this.enableTextArea = false;
      }
      this.masterdata.answer3 = this.val3;
      this.masterdata.questionId3 = questionIndex;
      this.masterdata.shortTextThree = this.shortTextThree;

      await this.localStorage.setValue(
        "answer3",
        JSON.stringify({
          questionId: this.masterdata.questionId3,
          answer: this.masterdata.answer1,
          shortText: this.shortTextThree,
          addlInfo: this.masterdata.addlInfo,
        })
      );
    }
  }
  onBack() {
    this.router.navigate(["/healthinfo"]);
  }
  async onNext(form) {
    this.masterdata.addlInfo = form.value.addlinfo;

    if (this.val3 != undefined && (this.val3 || !this.val3)) {
      await this.localStorage.setValue("val3", this.val3);
      if (this.val3 == "true") {
        if (this.val3 == "true" && form.value.addlinfo != undefined) {
          //storing the addinfo in local storage
          await this.localStorage.setValue("addlinfo", form.value.addlinfo);
          this.router.navigate(["/certifyinfo"]);
        } else if (form.value.addlinfo == undefined) {
          this.datasharingService.openSnackBar("Please answer locations", "X");
        }
      } else {
        this.router.navigate(["/certifyinfo"]);
      }
    } else {
      this.datasharingService.openSnackBar("Please select option ", "X");
    }
  }
}
