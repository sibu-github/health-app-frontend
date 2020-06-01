/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";

import { Router } from "@angular/router";

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
  defaultLocationName = "Westchester";
  phone;
  updatelocations: any;
  totallocations: any;
  locationName: any;
  type: any;
  buildingNo: string;
  floorNo: string;
  sectionNo: string;
  cubeNo: string;
  localdata: any;
  constructor(
    private router: Router,
    private userdataservice: userdetails,
    private getlocation: saveuserresponse,
    private datash: datasharingService,
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
    // // for prepopulating the data
    // let uResp = localStorage.getItem("userResponse");
    // if (uResp) {
    //   this.localdata = JSON.parse(uResp);
    // }
    // console.log(this.localdata);
  }

  async ngOnInit() {
    // if (this.localdata && this.localdata.locationName) {
    //   this.locationName = this.localdata.locationName;
    //   this.phone = this.localdata.phone;
    //   this.buildingNo = this.localdata.buildingNo;
    //   this.sectionNo = this.localdata.sectionNo;
    //   this.floorNo = this.localdata.floorNo;
    //   this.cubeNo = this.localdata.cubeNo;
    // } else {
    //   this.locationName = this.defaultLocationName.slice(0);
    //   this.phone = "";
    // }

    // this.updatelocations = this.datash.getlocationdata();

    // console.log(this.totallocations);
    try {
      let bh = await this.getlocation.getLocations();
      console.log(bh);
      console.log(bh.local.result);
      this.updatelocations = bh.local.result;
      this.totallocations = this.updatelocations;
      // console.log(this.totallocations)
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Function name: onSubmit
   * @Input: JSON data {locationName, phone}
   * @Output:JSON data { response 201 / error}
   * @Desc: This function collects the locationname and phonenumber from user and posts into db
   * @error: 500 Internal server error / 404 - method not found
   */
  onSubmit(data) {
    this.validclick = true;
    console.log(data.value);
    console.log(this.defaultLocationName, data.value.locationName);
    if (data.valid === true) {
      for (let i = 0; i <= this.totallocations.length; i++) {
        if (
          (this.totallocations[i] &&
            this.totallocations[i].locationName === this.locationName) ||
          this.defaultLocationName === data.value.locationName
        ) {
          console.log("valid success");

          this.masterdata.locationName = data.value.locationName;
          this.masterdata.phone = data.value.phone;
          this.masterdata.locationNameTwo = data.value.locationName;
          this.masterdata.userType = data.value.type;
          this.masterdata.buildingNo = data.value.buildingNo;
          this.masterdata.floorNo = data.value.floorNo;
          this.masterdata.sectionNo = data.value.sectionNo;
          this.masterdata.cubeNo = data.value.cubeNo;
          console.log(
            this.masterdata.buildingNo,
            this.masterdata.floorNo,
            this.masterdata.sectionNo,
            this.masterdata.cubeNo
          );
          let confirmdetailsObj = {
            email: localStorage.getItem('username'),
            locationName: this.masterdata.locationName,
            phone: this.masterdata.phone,
            buildingNo: this.masterdata.buildingNo,
            floorNo: this.masterdata.floorNo,
            sectionNo: this.masterdata.sectionNo,
            cubeNo: this.masterdata.cubeNo
          };

          //calling confirm details api
          this.userdataservice
            .userDetails(confirmdetailsObj)
            .then((result) => {
              console.log(result);
              this.router.navigate(["/healthinfo"]);
            })
            .catch((err) => {
              console.log("error", err);
            });

          localStorage.setItem("locationName", confirmdetailsObj.locationName);
          localStorage.setItem("phone", confirmdetailsObj.phone);

          break;
        }
      }
      this.validclick = false;
    }
  }

  locationFilter() {
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values) {
    // console.log(values);
    return values.filter((location) =>
      location.locationName.includes(this.locationName)
    );
  }
}
