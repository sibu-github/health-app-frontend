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

@Component({
  selector: "bh-login",
  templateUrl: "./login.template.html",
})
export class loginComponent extends NBaseComponent implements OnInit {
  constructor(
    private router: Router,
    private masterdata: masterdataService,
    private saveuserService: saveuserresponse
  ) {
    super();
    let language = window.localStorage.getItem("language");

    if (language) {
      this.localeService.language = language;
    }
  }

  ngOnInit() {}
  async login(form) {
    console.log(form.value);
    this.masterdata.email = form.value.email;
    this.masterdata.password = form.value.password;
    console.log(this.masterdata);
    let formdata = {
      username: form.value.email,
      password: form.value.password,
    };
    localStorage.setItem("username", this.masterdata.email);
    localStorage.setItem("password", this.masterdata.password);
    console.log(form.email);
    if (form.value.email == "craig.shirley@ingredion.com") {
      this.router.navigate(["/hrdashboard"]);
      console.log("craig");
    } else {
      this.router.navigate(["/confirmdetails"]);
    }
  }
}
