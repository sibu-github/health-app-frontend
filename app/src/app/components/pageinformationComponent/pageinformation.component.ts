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
import { commonService } from 'app/services/common/common.service';
import { NLocalStorageService } from 'neutrinos-seed-services';
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
    private common: commonService,
    private router: Router,
    private datash: datasharingService,
    private getlocation: saveuserresponse,
    private masterdata: masterdataService,
    private nLocalStorage: NLocalStorageService
  ) {
    super();
    // get the previously selected language from local storage
    // set the language if selected
    let language = this.nLocalStorage.getValue("language");
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
    this.nLocalStorage.setValue("language", event.value);
    let language = this.nLocalStorage.getValue("language");
    this.localeService.language = language;
  }
  async ngOnInit() {
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

    let language = this.nLocalStorage.getValue("language") || 'en';
    this.usertypes = allUserTypes[language];

        

      this.getAllLocations();   
    } catch (err) {
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
    this.masterdata.firstName = data.value.firstname;
    this.masterdata.lastName = data.value.lastname;
    this.masterdata.locationName = this.locationName;
    this.masterdata.userType = data.value.type.toLowerCase(); 
//    console.log(this.masterdata);
    if(!data.valid){
        return;
    }

    if(!this.locationName){
        this.datash.openSnackBar('Please select location', "X");
        return;
    }

    if (this.common.selectionType == 'employee') {
          this.common.name = this.masterdata.firstName + ' ' + this.masterdata.lastName;
          console.log(this.common.name)
        }

    this.router.navigate(["/contactinfo"]);  
  }

  checkLocation(locname) {

    var locmatch: any;
    for (let i = 0; i < this.totallocations.length; i++) {
      if (
        (this.totallocations[i] &&
          this.totallocations[i].locationName == locname)) {
        locmatch = this.totallocations[i];
        break;
      }
    }
    return locmatch;
  }


  selectUser(event) {
    //console.log(event.value);
    
    this.nLocalStorage.setValue("usertype", event.value);
    // console.log(event.value)
    let usertype = this.nLocalStorage.getValue("usertype");
    this.common.selectionType = usertype;
    console.log(this.common.selectionType,'post cahnge' );
    // console.log(usertype);
  }

    async getAllLocations(){
        try{
            let language = this.nLocalStorage.getValue("language") || 'en';
            let jwtToken = this.nLocalStorage.getValue('jwtToken')
            let bh = await this.getlocation.getLocations(language, jwtToken);
            if(bh && bh.local && bh.local.result){
               this.updatelocations = bh.local.result;
               console.log(this.updatelocations)
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
      location.locationVal.toLowerCase().includes(this.locationVal.toLowerCase())
    );
  }

    optionSelected(e){
        const value = e.option.value;
        console.log('optionSelected', value)
        this.locationName = value;
        this.setLocationVal();
    }



}
