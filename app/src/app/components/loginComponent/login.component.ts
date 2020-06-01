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
import { masterdataService } from "../../services/masterdata/masterdata.service";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { hrmailverifier } from "app/sd-services/hrmailverifier";
@Component({
  selector: "bh-login",
  templateUrl: "./login.template.html",
})
export class loginComponent extends NBaseComponent implements OnInit {
  validclick: Boolean; // For Form validaton
  emailvalidation: Boolean; // For Email validation
  email: any; // kept for build error
  change: any; // kept for build error
  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private saveuserService: saveuserresponse,
    private hrmailService:hrmailverifier
  ) {
    super();
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
    }
  }

    showInAppBrowser(){
        
    }




  ngOnInit() {}


   login(form) {
    this.validclick = true;
    console.log(form.value.email);
     if (form.valid === true) {
         this.masterdata.email = form.value.email;
         this.masterdata.password = form.value.password;
            let formdata = {
                username: form.value.email,
                password: form.value.password,
            };
            this.hrmailService.verifyEmail(form.value.email).then((result) =>{
                console.log("result",result, result.local.result.Authorized);
                let response  = result;
                if(response.local.result.Authorized == 'true') {
                    this.router.navigate(["/optionpage"]);
                } else {
                    this.router.navigate(["/confirmdetails"]);
                }
            }).catch((err)=>{
                console.log('errr');
            })
            localStorage.setItem("username", this.masterdata.email);
            localStorage.setItem("password", this.masterdata.password);
            this.validclick = false;
     } else{
         console.log('nvald')
     }
    
    // console.log(this.masterdata);
   
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
}
