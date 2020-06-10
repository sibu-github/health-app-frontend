/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { NLocalStorageService } from 'neutrinos-seed-services';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';

*/
import { saveuserresponse } from "app/sd-services/saveuserresponse";
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
  name = "Angular";
  locationname: any;
  q1postive: number;
  q1negative: number;
  q2postive: number;
  q2negative: number;
  q3postive: number;
  q3negative: number;
  location: any[];
  fromDate: any;
  toDate: any;
  newarr = [];
  updatelocations: any;
  totallocations: any;
  locationName: any;
  date: any;

  myControl: FormControl;

  filteredOptions: Observable<string[]>;

  constructor(
    private hrdashboard: hrdashboard,
    private getlocation: saveuserresponse,
    private nLocalStorage: NLocalStorageService
  ) {
    super();
    this.localeService.language = "en";
  }

  async ngOnInit() {
    try {
      let jwtToken = this.nLocalStorage.getValue('jwtToken');
      let dashboard = await this.hrdashboard.hrDashboard(null, jwtToken);
      this.q2postive = dashboard.local.result.q2Positive;
      this.q2negative = dashboard.local.result.q2Negative;

      //  //q2
      this.q3postive = dashboard.local.result.q3Positive;
      this.q3negative = dashboard.local.result.q3Negative;

      //  //q3
      this.q1postive = dashboard.local.result.q3Positive;
      this.q1negative = dashboard.local.result.q3Negative;
        let locale = this.nLocalStorage.getValue("language") || 'en';
      let bh = await this.getlocation.getLocations(locale, jwtToken);
      this.locationname = bh.local.result;
      this.location = this.newarr;
      this.updatelocations = bh.local.result;
      this.totallocations = this.updatelocations;
    } catch (err) {
      console.error(err);
    }
  }
  locationFilter() {
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values) {
    return values.filter((location) =>
      location.locationName.includes(this.locationName)
    );
  }
  //when location and fron & to date is selected will call for backend and only location filter as well
  async selected(data) {
    let jwtToken = this.nLocalStorage.getValue('jwtToken');
    if (data.option.value) {
      if (this.fromDate && this.toDate) {
        let dashboard = await this.hrdashboard.hrDashboard({
          locationName: data.option.value,
          fromDate: this.fromDate,
          toDate: this.toDate,
        }, jwtToken);
        this.fromDate = "";
        this.toDate = "";
        this.q3postive = dashboard.local.result.q2Positive;
        this.q3negative = dashboard.local.result.q2Negative;

        //  //q2
        this.q2postive = dashboard.local.result.q1Positive;
        this.q2negative = dashboard.local.result.q1Negative;

        //  //q3
        this.q1postive = dashboard.local.result.q3Positive;
        this.q1negative = dashboard.local.result.q3Negative;
      } else {
        let jwtToken = this.nLocalStorage.getValue('jwtToken');
        let dashboard = await this.hrdashboard.hrDashboard({
          locationName: data.option.value,
        }, jwtToken);
        this.q3postive = dashboard.local.result.q2Positive;
        this.q3negative = dashboard.local.result.q2Negative;

        //  //q2
        this.q2postive = dashboard.local.result.q1Positive;
        this.q2negative = dashboard.local.result.q1Negative;

        //  //q3
        this.q1postive = dashboard.local.result.q3Positive;
        this.q1negative = dashboard.local.result.q3Negative;
      }
    } else {
    }
  }
  //When both fromDate and todate is selected it will call backend and update front end
  async dateselected(datedata) {
    this.fromDate = datedata.value.toISOString().substring(0, 10);

  }
  async toDateSelected(datedata) {
    this.toDate = datedata.value.toISOString().substring(0, 10);
    if (this.fromDate) {
      let jwtToken = this.nLocalStorage.getValue('jwtToken');
      let dashboard = await this.hrdashboard.hrDashboard({
        toDate: this.toDate,
        fromDate: this.fromDate,
      }, jwtToken);
      this.q3postive = dashboard.local.result.q2Positive;
      this.q3negative = dashboard.local.result.q2Negative;

      //  //q2
      this.q2postive = dashboard.local.result.q1Positive;
      this.q2negative = dashboard.local.result.q1Negative;

      //  //q3
      this.q1postive = dashboard.local.result.q3Positive;
      this.q1negative = dashboard.local.result.q3Negative;

      //  let bh = await this.getlocation.getLocations()
    } else {
    }
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.newarr.filter(option => option.toLowerCase().includes(filterValue));
  // }
}
