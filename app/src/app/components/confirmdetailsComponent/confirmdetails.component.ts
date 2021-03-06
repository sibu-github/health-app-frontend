/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";

import { Router } from "@angular/router";
import { NLocalStorageService } from "neutrinos-seed-services";
import { datasharingService } from "app/services/datasharing/datasharing.service";
import { userdetails } from "app/sd-services/userdetails";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/
import { saveuserresponse } from "app/sd-services/saveuserresponse";

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/
import { masterdataService } from "../../services/masterdata/masterdata.service";

@Component({
  selector: "bh-confirmdetails",
  templateUrl: "./confirmdetails.template.html",
})
export class confirmdetailsComponent extends NBaseComponent implements OnInit {
  validclick: Boolean;
  defaultLocationName;
  phone;

  type: any;
  buildingNo: string;
  floorNo: string;
  sectionNo: string;
  cubeNo: string;
  localdata: any;

  // holds the display value
  locationVal: string;
  // holds the actual value
  locationName: string;
  // holds the list to be displayed
  updatelocations: any;
  // holds the list of all locations
  totallocations: any;

  constructor(
    private router: Router,
    private userdataservice: userdetails,
    private getlocation: saveuserresponse,
    private datash: datasharingService,
    private masterdata: masterdataService,
    private datasharingService: datasharingService,
    private nLocalStorage: NLocalStorageService
  ) {
    super();
    this.updateLocaleLanguage();
    this.setPhone();
    this.setLocation();
  }

  // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  updateLocaleLanguage() {
    let language = this.nLocalStorage.getValue("language");
    if (language) {
      this.localeService.language = language;
    }
  }

  // set the previously selected location from localstorage
  setLocation() {
    // first we check if user has made any selection when opened the app previously
    // user selected location value will be stored in localstorage
    // if found then we ignore the value coming from azure ad
    let location = this.nLocalStorage.getValue("selectedLocation");
    if (location) {
      this.locationName = location;
      return;
    }

    // get the location coming from azure ad
    // azure ad location is set in the local storage
    location = this.nLocalStorage.getValue("location");
    if (location) {
      this.locationName = location;
    }
  }

  // set the previously selected location from localstorage
  setPhone() {
    // first we check if user has made any selection when opened the app previously
    // user selected phone value will be stored in localstorage
    // if found then we ignore the value coming from azure ad
    let phone = this.nLocalStorage.getValue("selectedPhone");
    if (phone) {
      this.phone = phone;
      return;
    }

    // get the phone coming from azure ad
    // azure ad location is set in the local storage
    phone = this.nLocalStorage.getValue("phone");
    if (phone) {
      this.phone = phone;
    }
  }

  async ngOnInit() {
    this.getAllLocations();
    this.getUserDetails();
  }

  async getUserDetails() {
    try {
      let email = this.nLocalStorage.getValue("email");
      if (!email) {
        return;
      }
      let jwtToken = this.nLocalStorage.getValue("jwtToken");
      let bh = await this.userdataservice.getUserDetails(email, jwtToken);
      if (bh && bh.local && bh.local.result) {
        // the response type is array and contains multiple objects
        // there might be some issues with the user details saving API
        // it is inserting data every time into the user details collection
        // instead of updating????
        let { userdetails } = bh.local.result;
        if (Array.isArray(userdetails) && userdetails.length > 0) {
          const user = userdetails[userdetails.length - 1];
          this.locationName = user.locationName;
          this.phone = user.phone;
          this.buildingNo = user.buildingNo;
          this.sectionNo = user.sectionNo;
          this.floorNo = user.floorNo;
          this.cubeNo = user.cubeNo;
          this.setLocationVal();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getAllLocations() {
    try {
      let language = this.nLocalStorage.getValue("language") || "en";
      let jwtToken = this.nLocalStorage.getValue("jwtToken");
      let bh = await this.getlocation.getLocations(language, jwtToken);
      if (bh && bh.local && bh.local.result) {
        this.updatelocations = bh.local.result;
        this.totallocations = this.updatelocations;
        this.setLocationVal();
      }
    } catch (err) {
      console.error(err);
    }
  }

  setLocationVal() {
    if (!this.locationName) {
      return;
    }
    if (this.totallocations && this.totallocations.length > 0) {
      let filtered = this.totallocations.filter(
        (loc) => loc.locationName === this.locationName
      );
      this.locationVal =
        filtered.length > 0 ? filtered[0].locationVal : this.locationVal;
    }
  }

  checkLocation(locname) {
    var locmatch: any;
    for (let i = 0; i < this.totallocations.length; i++) {
      if (
        this.totallocations[i] &&
        this.totallocations[i].locationName == locname
      ) {
        locmatch = this.totallocations[i];

        break;
      }
    }
    return locmatch;
  }

  locationFilter() {
    // clear up this.locationName because user is changing value and
    // this.locationName still holds the old value
    this.locationName = "";
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values) {
    return values.filter((location) =>
      location.locationName
        .toLowerCase()
        .includes(this.locationVal.toLowerCase())
    );
  }

  optionSelected(e) {
    const value = e.option.value;
    this.locationName = value;
    this.setLocationVal();
  }

  populateLocationName() {
    // if value is not entered in the input box then exit
    if (!this.locationVal) {
      return;
    }

    let match = this.totallocations.filter(
      (loc) =>
        loc.locationVal.toLowerCase() === this.locationVal.toLocaleLowerCase()
    );
    this.locationName =
      match.length > 0 ? match[0].locationName : this.locationName;
  }

  /**
   * Function name: onSubmit
   * @Input: JSON data {locationName, phone}
   * @Output:JSON data { response 201 / error}
   * @Desc: This function collects the locationname and phonenumber from user and posts into db
   * @error: 500 Internal server error / 404 - method not found
   */
  async onSubmit(data) {
    this.validclick = true;

    // when one or more fields have error, then exit
    if (!data.valid) {
      return;
    }

    // if user has typed the location
    if (this.locationVal && !this.locationName) {
      this.populateLocationName();
    }

    // check if location is selected
    if (!this.locationName) {
      this.datash.openSnackBar("Please select a valid location", "X");
      return;
    }

    // otherwise save data
    this.masterdata.locationName = this.locationName;
    this.masterdata.phone = data.value.phone;
    this.masterdata.locationNameTwo = this.locationName;
    this.masterdata.userType = data.value.type;
    this.masterdata.buildingNo = data.value.buildingNo;
    this.masterdata.floorNo = data.value.floorNo;
    this.masterdata.sectionNo = data.value.sectionNo;
    this.masterdata.cubeNo = data.value.cubeNo;

    this.nLocalStorage.setValue("selectedLocation", this.locationName);
    this.nLocalStorage.setValue("selectedPhone", this.masterdata.phone);
    this.validclick = false;

    try {
      let confirmdetailsObj = {
        email: this.nLocalStorage.getValue("username"),
        locationName: this.masterdata.locationName,
        phone: this.masterdata.phone,
        buildingNo: this.masterdata.buildingNo,
        floorNo: this.masterdata.floorNo,
        sectionNo: this.masterdata.sectionNo,
        cubeNo: this.masterdata.cubeNo,
      };
      //calling confirm details api
      let jwtToken = this.nLocalStorage.getValue("jwtToken");
      await this.userdataservice.userDetails(confirmdetailsObj, jwtToken);
      this.router.navigate(["/healthinfo"]);
    } catch (err) {
      console.error(err);
    }
  }
}
