/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { NLocalStorageService } from "neutrinos-seed-services";

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
      public defaultlang: string = "en";

  constructor(
    private userService: saveuserresponse,
    private router: Router,
    private nLocalStorage: NLocalStorageService
  ) {
    super();
    this.updateLocaleLanguage()
  }

  ngOnInit() {}

  navigateToEmp() {
    const newusername = this.nLocalStorage.getValue("username");
    const jwtToken = this.nLocalStorage.getValue("jwtToken");
    this.userService
      .getIfUserSubmitted(newusername, jwtToken)
      .then((resp) => {
        let hasSubmitted = "no";
        let colorCode = "green";

        if (resp.local && resp.local.result) {
          hasSubmitted = resp.local.result.updated;
          colorCode = resp.local.result.colorCode;
        }

        // save the colorCode in localStorage
        this.nLocalStorage.setValue("colorCode", colorCode);

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

   // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  updateLocaleLanguage() {
    let language = this.nLocalStorage.getValue("language");
    if (language) {
      this.localeService.language = language;
      this.defaultlang = language;
      return;
    }
    // set default language to english
    this.defaultlang = "en";
  }
}
