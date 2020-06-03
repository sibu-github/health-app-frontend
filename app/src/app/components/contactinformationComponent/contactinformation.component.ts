/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";

import { Router } from "@angular/router";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/
import { masterdataService } from "../../services/masterdata/masterdata.service";

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-contactinformation",
  templateUrl: "./contactinformation.template.html",
})
export class contactinformationComponent extends NBaseComponent
  implements OnInit {
  validclick: Boolean; // For Form validaton
  emailvalidation: Boolean; // For Email validation
  email: any; // kept for build error
  change: any; // kept for build error
  phone: any; // kept for build error
  company: any; // kept for build error
  ingredioncontact: any; // kept for build error
  localdata: any;
  constructor(private router: Router, private masterdata: masterdataService) {
    super();

    // get the previously selected language from local storage
    // set the language if selected
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
    }

    // let uResp = localStorage.getItem("userResponse");
    // if (uResp) {
    //   this.localdata = JSON.parse(uResp);
    // }
  }

  ngOnInit() {
    // if (this.localdata && this.localdata.firstName) {
    //   this.email = this.localdata.email;
    //   this.phone = this.localdata.phone;
    //   this.company = this.localdata.company;
    //   this.ingredioncontact = this.localdata.ingredionContact;
    // } else {
    //   this.email = "";
    //   this.phone = "";
    //   this.company = "";
    //   this.ingredioncontact = "";
    // }
  }

  /**
   * Function Name: onBlurEmail
   * Input: Email
   * Output: Boolean true or false
   *
   */
  onBlurEmail(email) {
    if (email) {
      var EmailId = email.toString().toLowerCase();
    }
    this.emailvalidation = false; // default we keep as false once the email is found in database records we make it to true
    var regexp = new RegExp(
      "([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+.)+[a-z]{2,})"
    );
    if (regexp.test(EmailId)) {
      console.log(EmailId);
    }
  }

  /**
   * Function name: contactSubmit
   * @Input: JSON data {Email, phone,Companyname,IngredIon Contact }
   * @Output:JSON data { response 201 / error}
   * @Desc: This function collects the data from user and posts into Information Collection db
   * @error: 500 Internal server error / 404 - method not found
   */
  contactSubmit(data) {
    this.validclick = true;
    console.log(data.value);
    if (data.valid === true) {
      this.masterdata.email = data.value.email;
      this.masterdata.phone = data.value.phone;
      this.masterdata.company = data.value.company;
      this.masterdata.ingredionContact = data.value.ingredioncontact;
      this.router.navigate(["/healthinfo"]);
      this.validclick = false;
    }
  }

  navigatePrev() {
    this.router.navigate(["/personalinfo"]);
  }
}
