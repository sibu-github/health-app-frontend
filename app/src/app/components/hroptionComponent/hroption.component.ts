/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import {storageService} from '../../services/storage/storage.service'

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-hroption",
  templateUrl: "./hroption.template.html",
})
export class hroptionComponent extends NBaseComponent implements OnInit {
  constructor(
    private userService: saveuserresponse,
    private router: Router,
    private localStorage:storageService
  ) {
    super();
  }

  ngOnInit() {}

  async navigateToEmp() {
    const newusername = await this.localStorage.getValue("username");
    const jwtToken = await this.localStorage.getValue("jwtToken");
    this.userService
      .getIfUserSubmitted(newusername, jwtToken)
      .then(async (resp) => {
        let hasSubmitted = "no";
        let colorCode = "green";

        if (resp.local && resp.local.result) {
          hasSubmitted = resp.local.result.updated;
          colorCode = resp.local.result.colorCode;
        }

        // save the colorCode in localStorage
        await this.localStorage.setValue("colorCode", colorCode);

        // when user already submitted show Thank You screen
        if (hasSubmitted === "yes") {
          this.router.navigate(["/thankyou"]);
          return;
        }
        this.router.navigate(["/confirmdetails"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  navigateToHR() {
    this.router.navigate(["/hrdashboard"]);
  }
}
