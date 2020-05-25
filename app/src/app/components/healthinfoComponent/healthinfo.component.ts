/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
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
    selector: 'bh-healthinfo',
    templateUrl: './healthinfo.template.html'
})

export class healthinfoComponent extends NBaseComponent implements OnInit {

    constructor(private router: Router) {
        super();
         let language = window.localStorage.getItem('language');
         this.localeService.language = language;
         console.log(language);
    }
answer:string ='';
    ngOnInit() {

    }
    onChangeRadio(e, questionIndex){
        console.log('onChangeRadio called...')
        console.log("Question Index", questionIndex)
        let val = e.value
        this.answer = val
        console.log({val})
}
onBack(){
    this.router.navigate(['/landingpage']);
}
onNext(){
    this.router.navigate(['/hinfonext']);
    }
}