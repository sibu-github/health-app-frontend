/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, Inject } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { MAT_DIALOG_DATA } from "@angular/material";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-forceupdate",
  templateUrl: "./forceupdate.template.html",
})
export class forceupdateComponent extends NBaseComponent implements OnInit {
  version = "";
  appName = "";
  updates = [];
  appUrl = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.version = this.data.version;
    this.appName = this.data.appName;
    this.updates.push("New version available.");
    this.appUrl = this.data.appUrl;
  }

  updateApp() {
    if (this.appUrl) {
      window.open(this.appUrl, "_system");
    }
  }
}
