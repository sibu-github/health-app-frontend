/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
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
    private datasharingService: datasharingService
  ) {
    super();

    // get the previously selected language from local storage
    // set the language if selected
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
    }
    //saving user responses in local storage
    let uResp = localStorage.getItem("userResponse");
    if (uResp) {
        console.log('userResponse', );
      this.localdata = JSON.parse(uResp);
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
      //Getting the saved user responses and updating in the DOM
      let select1 = window.localStorage.getItem("val1");
      let select2 = window.localStorage.getItem("val2");
    if (select1) {
        console.log('select1',select1);
     this.selected1 = select1;
      this.selected2 = select2;
      this.val1= select1;
      this.val2= select2;
    }
      console.log('ngonit selected print', this.selected1);
    // if (this.localdata && this.localdata.response.length > 0) {
    //   this.answer = this.localdata.response[0].answer;
    //   this.answer2 = this.localdata.response[1].answer;
      // this.answer3 = this.localdata.response[2].answer;
      //this.addlinfo = this.localdata.response[2].addlnfo;
    // } else {
    //   this.answer = "false";
    //   this.answer2 = "false";
      //  this.answer3 = 'false';
    // }
  }

  onChangeRadio(e, questionIndex) {
    console.log("onChangeRadio called...");
    console.log("Question Index", questionIndex);
    this.val1 = e.value;
    this.answer = this.val1;
    
    console.log("ths.ans", this.val1);
    if (questionIndex == "1") {
      this.masterdata.answer1 = this.val1;
      
      this.masterdata.questionId = questionIndex;
      this.masterdata.shortTextOne = this.shortTextOne;
      localStorage.setItem(
        "answer1",
        JSON.stringify({
          questionId: this.masterdata.questionId,
          answer: this.masterdata.answer1,
          shortText: this.shortTextOne,
        })
      );
    }
  }
  onChangeRadioTwo(e, questionIndex) {
    console.log("onChangeRadio2 called...");
    console.log("Question Index", questionIndex);
    this.val2 = e.value;
    this.answer = this.val2;
    console.log("ths.ans", this.val2);

    if (questionIndex == "2") {
      this.masterdata.answer2 = this.val2;
      
      this.masterdata.questionId2 = questionIndex;
      this.masterdata.shortTextTwo = this.shortTextTwo;
      localStorage.setItem(
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
  onNext() {
    console.log("val1", this.val1, "val2", this.val2);
    if (this.val1 && this.val2) {
        window.localStorage.setItem("val1",this.val1);
         window.localStorage.setItem("val2",this.val2);
      console.log(this.selected2);
      this.router.navigate(["/hinfonext"]);
    } else {
      this.datasharingService.openSnackBar("Please answer for questions", "X");
    }
  }
}
