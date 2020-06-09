/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { NLocalStorageService } from 'neutrinos-seed-services';
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
  name = '';
  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private datasharingService: datasharingService,
    private nLocalStorage: NLocalStorageService
  ) {
    super();
    console.log('Health next || new page fix');
    //Getting the saved user responses and updating in the DOM
      let select3 = this.nLocalStorage.getValue("val3");
      let addlinformation = this.nLocalStorage.getValue("addlinfo");
    if (select3) {
      console.log('select3',select3);
      this.selected3 = select3;
      this.val3= select3;
      if (this.val3 == "true") {
        this.enableTextArea = true;
        console.log('addlinfo',addlinformation);
        this.name = addlinformation;
        
      } else {
        this.enableTextArea = false;
      }
      
    }
    // get the previously selected language from local storage
    // set the language if selected
    let language = this.nLocalStorage.getValue("language");
    if (language) {
      this.localeService.language = language;
    }

    let uResp = this.nLocalStorage.getValue("userResponse");
    if (uResp) {
      this.localdata = JSON.parse(uResp);
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
  onChangeRadio(e, questionIndex) {
    console.log("onChangeRadio called...");
    console.log("Question Index", questionIndex);
    this.val3 = e.value;
    this.answer = this.val3;
    // if(this.answer == YES){
    //     this.question = true;
    // }
    console.log(this.val3);
    if (questionIndex == "3") {
      if (e.value == "true") {
        this.enableTextArea = true;
      } else {
        this.enableTextArea = false;
      }
      this.masterdata.answer3 = this.val3;
      this.masterdata.questionId3 = questionIndex;
      this.masterdata.shortTextThree = this.shortTextThree;

      this.nLocalStorage.setValue(
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
  onNext(form) {
    console.log(this.val3);
    this.masterdata.addlInfo = form.value.addlinfo;

    if (this.val3 != undefined && (this.val3 || !this.val3)) {
      console.log(this.val3);
      this.nLocalStorage.setValue("val3",this.val3);
      if (this.val3 == "true") {
        console.log(form.value.addlinfo, typeof(this.val3));
        if (this.val3 == "true" && form.value.addlinfo != undefined) {
            //storing the addinfo in local storage
          this.nLocalStorage.setValue("addlinfo",form.value.addlinfo);
          this.router.navigate(["/certifyinfo"]);
        } else if (form.value.addlinfo == undefined) {
          this.datasharingService.openSnackBar("Please answer locations", "X");
        }
      } else {
        console.log("im here ");
        this.router.navigate(["/certifyinfo"]);
      }
    } else {
      this.datasharingService.openSnackBar("Please select option ", "X");
    }
  }
}
