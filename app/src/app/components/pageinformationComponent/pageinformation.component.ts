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
  firstName: any; // kept for build error
  lastName: any; // kept for build error
  firstname: any; // data binding
  lastname: any; // data binding
  usertypes: any; // list of user types data
//   localdata: any;

    // holds the display value
    locationVal:string;
    // holds the actual value
    locationName:string;
    // holds the list to be displayed
    updatelocations: any;
    // holds the list of all locations
    totallocations: any;

showme:Boolean;
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
    //   this.usertypes = this.datash.getusertypes();
    //   console.log("uts", this.usertypes);

    const allUserTypes = {
        en: [
            {type: "vendor", viewValue: "Vendor"},
            {type: "customer", viewValue: "Customer"},
            {type: "visitor", viewValue: "Visitor"},
            {type: "employee", viewValue: "Employee"}
        ],
        es: [
            {type: "vendor", viewValue: "Vendedor"},
            {type: "customer", viewValue: "Cliente"},
            {type: "visitor", viewValue: "Visitante"},
            {type: "employee", viewValue: "Empleado"}
        ],
        pt: [
            {type: "vendor", viewValue: "Fornecedor"},
            {type: "customer", viewValue: "Cliente"},
            {type: "visitor", viewValue: "Visitante"},
            {type: "employee", viewValue: "Empregado"}
        ],
        de: [
            {type: "vendor", viewValue: "Verkäufer"},
            {type: "customer", viewValue: "Kunde"},
            {type: "visitor", viewValue: "Besucher"},
            {type: "employee", viewValue: "Mitarbeiter"}
        ],
        ko: [
            {type: "vendor", viewValue: "공급 업체"},
            {type: "customer", viewValue: "고객"},
            {type: "visitor", viewValue: "방문객"},
            {type: "employee", viewValue: "종업원"}
        ],
        th: [
            {type: "vendor", viewValue: "ผู้ขาย"},
            {type: "customer", viewValue: "ลูกค้า"},
            {type: "visitor", viewValue: "ผู้มาเยือน"},
            {type: "employee", viewValue: "ลูกจ้าง"}
        ],
        "zh-CN": [
            {type: "vendor", viewValue: "供应商"},
            {type: "customer", viewValue: "顾客"},
            {type: "visitor", viewValue: "游客"},
            {type: "employee", viewValue: "雇员"}
        ]
    }

    let language = window.localStorage.getItem("language") || 'en';
    this.usertypes = allUserTypes[language];

        

      this.getAllLocations();   
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

  async personalInfoSubmit(data) {
    this.validclick = true;
    this.showme = false;
    console.log(data.value);
    console.log(this.defaultLocationName, data.value.locationName);
    this.masterdata.firstName = data.value.firstname;
    this.masterdata.lastName = data.value.lastname;
    this.masterdata.locationName = this.locationName;
    this.masterdata.userType = data.value.type.toLowerCase(); 
   console.log(this.masterdata);
    if(!data.valid){
        return;
    }

    if(!this.locationName){
        this.datash.openSnackBar('Please select location', "X");
        return;
    }

    this.router.navigate(["/contactinfo"]);  
  }

  checkLocation(locname){
     
      var locmatch:any;
       for (let i = 0; i < this.totallocations.length; i++) {
        if (
          (this.totallocations[i] &&
            this.totallocations[i].locationName == locname)) {
          console.log("valid success");
          locmatch=this.totallocations[i];
          break;
        } 
      }
      return locmatch;
  }


  selectUser(event) {
    //console.log(event.value);
    window.localStorage.setItem("usertype", event.value);
    let usertype = window.localStorage.getItem("usertype");
    console.log(usertype);
  }

    async getAllLocations(){
        try{
            let language = window.localStorage.getItem("language") || 'en';
            let bh = await this.getlocation.getLocations(language);
            if(bh && bh.local && bh.local.result){
               this.updatelocations = bh.local.result;
               this.totallocations = this.updatelocations; 
               this.setLocationVal()
            }
        } catch(err){
            console.error(err)
        }
    }

    setLocationVal(){
        if(!this.locationName){
            return
        }
        let filtered = this.totallocations.filter(loc => loc.locationName === this.locationName)
        this.locationVal = filtered.length > 0 ? filtered[0].locationVal : this.locationVal;
    }

  locationFilter() {
    // clear up this.locationName because user is changing value and 
    // this.locationName still holds the old value
    this.locationName = '';
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values) {
    return values.filter((location) =>
      location.locationName.toLowerCase().includes(this.locationVal.toLowerCase())
    );
  }

    optionSelected(e){
        const value = e.option.value;
        this.locationName = value;
        this.setLocationVal();
    }



}
