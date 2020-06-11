/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { storageService } from "../../services/storage/storage.service";

import { datasharingService } from "app/services/datasharing/datasharing.service";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

import { masterdataService } from "../../services/masterdata/masterdata.service";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
@Component({
  selector: "bh-certifyinformation",
  templateUrl: "./certifyinformation.template.html",
})
export class certifyinformationComponent extends NBaseComponent
  implements OnInit {
  validclick: Boolean; // For Form validaton
  signature: any; // kept for build error
  accept: any; // kept for build error
  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private saveuserService: saveuserresponse,
    private datasharingService: datasharingService,
    private localStorage: storageService
  ) {
    super();

    this.updateLocaleLanguage();
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

  ngOnInit() {}

  /**
   * Function name: signSubmit
   * @Input: JSON data {signature and Acceptance }
   * @Output:JSON data { response 201 / error}
   * @Desc: This function collects the data from user and posts into Information Collection db
   * @error: 500 Internal server error / 404 - method not found
   */

  async signSubmit(data) {
    this.validclick = true;
    if (data.valid === true) {
      this.validclick = false;
      this.accept = "true";
      let certifyInfoName = data.value.signature;
      let certifyInfoChecked = this.accept;
      this.masterdata.certifyInfoName = data.value.signature;
      this.masterdata.certifyInfoChecked = this.accept;
      await this.localStorage.setValue("certifyInfoName", data.value.signature);
      await this.localStorage.setValue("certifyInfoChecked", data.value.accept);
      //Clearing user response in local storage once user

      /**
       * Need to refactor this code to remove all values at once
       */
      await this.localStorage.remove("val1");
      await this.localStorage.remove("val2");
      await this.localStorage.remove("val3");
      await this.localStorage.remove("addlinfo");
      this.masterdata
        .userSubmit()
        .then(async (resp) => {
          // get the color code for thank you page
          let isGreen = true;
          if (resp && resp.response) {
            isGreen = resp.response.every((v) => v.answer === false);
          }
          if (isGreen) {
            await this.localStorage.setValue("colorCode", "green");
          } else {
            await this.localStorage.setValue("colorCode", "amber");
          }
          // navigate to the thankyou page
          this.router.navigate(["/thankyou"]);
        })
        .catch((err) => {
          console.error("cert err", err);
        });
    } else {
      if (this.accept == undefined) {
        this.datasharingService.openSnackBar(
          "Please select Terms and Conditions",
          "X"
        );
      } else {
        this.datasharingService.openSnackBar(
          "Please provide required information",
          "X"
        );
      }
    }
  }
  onBack() {
    this.router.navigate(["/hinfonext"]);
  }
  navigatePrev() {
    alert("I am navigating to previous page");
  }
}
