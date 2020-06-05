/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";

import { datasharingService } from "../../services/datasharing/datasharing.service";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { masterdataService } from "../../services/masterdata/masterdata.service";
/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-pageinformation",
  templateUrl: "./pageinformation.template.html",
})
export class pageinformationComponent extends NBaseComponent implements OnInit {
  validclick: Boolean;
  defaultLocationName = "India";
  phone;
  updatelocations: any;
  totallocations: any;
  locationName: any;
  firstName: any; // kept for build error
  lastName: any; // kept for build error
  firstname: any; // data binding
  lastname: any; // data binding
  usertypes: any; // list of user types data
//   localdata: any;
  type: any;
  constructor(
    private router: Router,
    private datash: datasharingService,
    private getlocation: saveuserresponse,
    private masterdata: masterdataService
  ) {
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
  languages: any[] = [
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Spanish" },
    { value: "pt", viewValue: "Portuguese" },
    { value: "ko", viewValue: "Korean" },
    { value: "th", viewValue: "Thai" },
    { value: "zh-CN", viewValue: "Chinese (Mandarian)" },
    // {value: 'zh-TW', viewValue: 'CHINESE (TRADITIONAL)'}
  ];

  doSomething(event) {
    //console.log(event.value);
    window.localStorage.setItem("language", event.value);
    let language = window.localStorage.getItem("language");
    console.log(language);
    this.localeService.language = language;
  }
  async ngOnInit() {
    // if (this.localdata && this.localdata.firstName) {
    //   this.firstname = this.localdata.firstName;
    //   this.lastname = this.localdata.lastName;
    //   this.locationName = this.localdata.locationName;
    //   this.type = this.localdata.type.charAt(0).toUpperCase() + this.localdata.type.slice(1)
    // } else {
    //   this.firstname = "";
    //   this.lastname = "";
    //   this.locationName = "";
    //   this.type = "";
    // }
    try {
      this.usertypes = this.datash.getusertypes();
      console.log("uts", this.usertypes);
      let bh = await this.getlocation.getLocations();
      console.log(bh);
      console.log(bh.local.result);
      this.updatelocations = bh.local.result;
      this.totallocations = this.updatelocations;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Function name: personalInfoSubmit
   * @Input: JSON data
   * @Output:JSON data { response 201 / error}
   * @Desc: This function collects the data from user and posts into Information Collection db
   * @error: 500 Internal server error / 404 - method not found
   */

  personalInfoSubmit(data) {
    this.validclick = true;
    console.log(data.value);
    console.log(this.defaultLocationName, data.value.locationName);
    this.masterdata.firstName = data.value.firstname;
    this.masterdata.lastName = data.value.lastname;
    this.masterdata.locationName = data.value.locationName;
    this.masterdata.userType = data.value.type.toLowerCase();
    if (data.valid === true) {
      for (let i = 0; i <= this.totallocations.length; i++) {
        if (
          (this.totallocations[i] &&
            this.totallocations[i].locationName === this.locationName) ||
          this.defaultLocationName === data.value.locationName
        ) {
          console.log("valid success");
          this.router.navigate(["/contactinfo"]);
          break;
        } else {
            this.datash.openSnackBar('Please provide Exact location / select appropriate one', "X");

            //break;
        }
      }
      this.validclick = false;
      // this.router.navigate(['/thankyou']);
    }
    else {
    this.datash.openSnackBar('Please select appropriate classify user', "X");
  }
  }
  locationFilter() {
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values) {
    return values.filter((location) =>
      location.locationName.includes(this.locationName)
    );
  }

  selectUser(event) {
    //console.log(event.value);
    window.localStorage.setItem("usertype", event.value);
    let usertype = window.localStorage.getItem("usertype");
    console.log(usertype);
  }
}
