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
    selector: 'bh-healthinfonext',
    templateUrl: './healthinfonext.template.html'
})

export class healthinfonextComponent extends NBaseComponent implements OnInit {
answer:string ='';
    constructor(private router: Router) {
        super();
         let language = window.localStorage.getItem('language');
       
        this.localeService.language = language;
    }

    ngOnInit() {

    }

    //question :boolean = false;
    onChangeRadio(e, questionIndex){
        console.log('onChangeRadio called...')
        console.log("Question Index", questionIndex)
        let val = e.value
        this.answer = val
        // if(this.answer == YES){
        //     this.question = true;
        // }
        console.log({val})
}
    onBack(){
        this.router.navigate(['/healthinfo']);
    }
    onNext(){
        this.router.navigate(['/certifyinfo']);
    }
}
