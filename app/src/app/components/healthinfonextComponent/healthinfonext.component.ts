/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import {Router} from '@angular/router';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

import {masterdataService} from '../../services/masterdata/masterdata.service';
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
    constructor(private router: Router,private masterdata : masterdataService) {
        super();
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
        console.log({val});
         if(questionIndex == '3'){
            this.masterdata.answer3 = val;
             this.masterdata.questionId =questionIndex;
             
             localStorage.setItem('answer3',JSON.stringify({"answer":this.masterdata.answer3,"questionId":this.masterdata.questionId}));
        }
}
    onBack(){
        this.router.navigate(['/healthinfo']);
    }
    onNext(){
        this.router.navigate(['/certifyinfo']);
    }
}
