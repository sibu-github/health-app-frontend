/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { NLocalStorageService } from "neutrinos-seed-services";

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
    private nLocalStorage: NLocalStorageService
  ) {
    super();

    this.updateLocaleLanguage();
  }

  // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  updateLocaleLanguage() {
    let language = this.nLocalStorage.getValue('language')
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

  signSubmit(data) {
    this.validclick = true;
    if (data.valid === true) {
      this.validclick = false;
      this.accept = "true";
      let certifyInfoName = data.value.signature;
      let certifyInfoChecked = this.accept;
      this.masterdata.certifyInfoName = data.value.signature;
      this.masterdata.certifyInfoChecked = this.accept;
      this.nLocalStorage.setValue("certifyInfoName", data.value.signature)
      this.nLocalStorage.setValue("certifyInfoChecked", data.value.accept);
      //Clearing user response in local storage once user
      this.nLocalStorage.remove("val1")
      this.nLocalStorage.remove("val2")
      this.nLocalStorage.remove("val3")
      this.nLocalStorage.remove("addlinfo")
      this.masterdata
        .userSubmit()
        .then((resp) => {
          // get the color code for thank you page
          let isGreen = true;
          if (resp && resp.response) {
            isGreen = resp.response.every((v) => v.answer === false);
          }
          if (isGreen) {
            this.nLocalStorage.setValue("colorCode", "green");
          } else {
            this.nLocalStorage.setValue("colorCode", "amber");
          }
          // navigate to the thankyou page
          this.router.navigate(["/thankyou"]);
        })
        .catch((err) => {
          console.log("cert err", err);
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
