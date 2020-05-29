/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';

*/
import { hrdashboard } from "app/sd-services/hrdashboard";
/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-hrdashboard",
  templateUrl: "./hrdashboard.template.html",
})
export class hrdashboardComponent extends NBaseComponent implements OnInit {
  dashboard: any;
  dashboarddata:any;
  name = "Angular";
  q1postive: number;
  q1negative: number;
  q2postive: number;
  q2negative: number;
  q3postive: number;
  q3negative: number;
  constructor(private hrdashboard: hrdashboard) {
    super();
    let language = window.localStorage.getItem("language");

    if (language) {
      this.localeService.language = language;
    }
  }

  async ngOnInit() {
    try {
      let dashboard = await this.hrdashboard.hrDashboard();
      this.q2postive = dashboard.local.result.q1_count.postive[0].postive.toString();
      this.q2negative = dashboard.local.result.q1_count.negative[0].negative;

      //q2
      this.q3postive = dashboard.local.result.q2_count.positive[0].postive;
      this.q3negative = dashboard.local.result.q2_count.negative[0].negative;

      //q3
      this.q1postive = dashboard.local.result.q3_count.positive[0].postive;
      this.q1negative = dashboard.local.result.q3_count.negative[0].negative;
    } catch (err) {
      console.error(err);
    }
  }

  foods: any[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
}
