/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
interface Language {
  value: string;
  viewValue: string;
}
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-landingpage",
  templateUrl: "./landingpage.template.html",
})
export class landingpageComponent extends NBaseComponent implements OnInit {
  public href: string = "";
  defaultlang= 'English';
    languages: any[] = [
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Spanish" },
    { value: "de", viewValue: "German" },
    { value: "pt", viewValue: "Portuguese" },
    { value: "ko", viewValue: "Korean" },
    { value: "th", viewValue: "Thai" },
    { value: "zh-CN", viewValue: "Chinese (Mandarin)" },

    // {value: 'zh-TW', viewValue: 'CHINESE (TRADITIONAL)'}
  ];
  constructor(private router: Router) {
    super();
    // get the previously selected language from local storage
    // set the language if selected
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
     
    }
  }

  ngOnInit() {
  // this.defaultlang = this.languages[0].viewValue;
  // console.log(this.languages[0].viewValue, this.defaultlang);
  }


  doSomething(event) {
    //console.log(event.value);
    window.localStorage.setItem("language", event.value);
    let language = window.localStorage.getItem("language");
    console.log(language);
    this.localeService.language = language;
  }
  letStart() {
    console.log("Lets Starts is working");
    if (this.router.url == "/landingpage") {
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate(["/personalinfo"]);
    }
  }
}
