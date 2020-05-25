/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import {Router} from '@angular/router';
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
    selector: 'bh-landingpage',
    templateUrl: './landingpage.template.html'
})

export class landingpageComponent extends NBaseComponent implements OnInit{

    constructor(private router: Router) {
        super();
        let language = window.localStorage.getItem('language');
       
        this.localeService.language = language;
    }

    ngOnInit() {

    }
      languages: any[] = [
    {value: 'en', viewValue: 'English'},
    {value: 'es', viewValue: 'Spanish'},
    {value: 'pt', viewValue: 'Portuguese'},
    {value: 'ko', viewValue: 'Korean'},
    {value: 'th', viewValue: 'Thai'},
    {value: 'zh-CN', viewValue: 'CHINESE'}
    
    // {value: 'zh-TW', viewValue: 'CHINESE (TRADITIONAL)'}
  ];

doSomething(event){
  //console.log(event.value);
  window.localStorage.setItem('language', event.value);
  let language = window.localStorage.getItem('language');
  console.log(language);
  this.localeService.language = language;
  
 
}
letStart(){
    console.log('Lets Starts is working');
    this.router.navigate(['/login']);
    
}
    
 
}
