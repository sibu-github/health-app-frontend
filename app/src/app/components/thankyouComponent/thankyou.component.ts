/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import {Router} from '@angular/router';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-thankyou",
  templateUrl: "./thankyou.template.html",
})
export class thankyouComponent extends NBaseComponent implements OnInit {
  // this property determine the background color of the tick mark icon circle
  // when this property is set to true
  // the backround color of the circle will change to amber otherwise green
  isAmber: boolean = false;
  today: string = "";

  // returns today's date in DD-MMM-YYYY format
  // which can be shown in the UI
  getDay() {
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const dateStr = date < 10 ? "0" + date : date + "";
    const monthStr =
      month === 0
        ? "JAN"
        : month === 1
        ? "FEB"
        : month === 2
        ? "MAR"
        : month === 3
        ? "APR"
        : month === 4
        ? "MAY"
        : month === 5
        ? "JUN"
        : month === 6
        ? "JUL"
        : month === 7
        ? "AUG"
        : month === 8
        ? "SEP"
        : month === 9
        ? "OCT"
        : month === 10
        ? "NOV"
        : month === 11
        ? "DEC"
        : "";
    const dayStr = dateStr + "-" + monthStr + "-" + year;
    return dayStr;
  }

  constructor(location: PlatformLocation, private router: Router) {
    super();
    //disbale back button
    location.onPopState(() => {
    console.log('pressed back button');

//this.router.navigateByUrl(‘/multicomponent’);
//history.forward();
});
    // get the previously selected language from local storage
    // set the language if selected
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
    }

    // get the color code from localstorage
    let color = window.localStorage.getItem("colorCode");
    this.isAmber = color === "amber";
  }

  ngOnInit() {
    // set today
    this.today = this.getDay();
    console.log(this.today);
  }
    //press backbutton to exit app
//     document.addEventListener('deviceready', function() {

//     document.addEventListener("backbutton", ShowExitDialog, false);

// }, false);
// function ShowExitDialog() {
//         navigator.notification.confirm(
//                 ("Do you want to Exit?"), // message
//                 alertexit, // callback
//                 'My APp', // title
//                 'YES,NO' // buttonName
//         );

//     }
}
