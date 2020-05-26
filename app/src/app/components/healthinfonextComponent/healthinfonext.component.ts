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
shortTextThree ="Travelled Outside Country";
enableTextArea:Boolean = false;
    constructor(private router: Router,private masterdata : masterdataService) {
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
        console.log({val});
         if(questionIndex == '3'){
             if(e.value == 'true') {
                 this.enableTextArea = true;
             }else {
                 this.enableTextArea=false;
             }
             this.masterdata.answer3 = val;
             this.masterdata.questionId3 =questionIndex;
            this.masterdata.shortTextThree = this.shortTextThree;
             
              localStorage.setItem('answer3', 
            JSON.stringify(
                { "questionId": this.masterdata.questionId3,
                    "answer": this.masterdata.answer1, 
                    "shortText": this.shortTextThree,
                    "addlInfo": this.masterdata.addlInfo
                }));}
}
    onBack(){
        this.router.navigate(['/healthinfo']);
    }
    onNext(form){
        console.log("addlinfo",form.value);
        this.masterdata.addlInfo = form.value.addlinfo;
        this.router.navigate(['/certifyinfo']);
    }
}
