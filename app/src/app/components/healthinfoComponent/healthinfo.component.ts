/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/
import { masterdataService } from '../../services/masterdata/masterdata.service';

@Component({
    selector: 'bh-healthinfo',
    templateUrl: './healthinfo.template.html'
})

export class healthinfoComponent extends NBaseComponent implements OnInit {

    constructor(private router: Router, private masterdata: masterdataService) {
        super();
         let language = window.localStorage.getItem('language');
         this.localeService.language = language;
         console.log(language);
    }
    answer: string = '';
       shortTextOne = "had fever";
    shortTextTwo = "had Personal Contact";
    ngOnInit() { }

    onChangeRadio(e, questionIndex) {
        console.log('onChangeRadio called...')
        console.log("Question Index", questionIndex)
        let val = e.value
        this.answer = val
        console.log("ths.ans", val);
        if (questionIndex == '1') {
            this.masterdata.answer1 = val;
            this.masterdata.questionId = questionIndex;
            this.masterdata.shortTextOne = this.shortTextOne;
             localStorage.setItem('answer1', 
            JSON.stringify(
                { "questionId": this.masterdata.questionId,
                    "answer": this.masterdata.answer1, 
                    "shortText": this.shortTextOne
                }));
        }
        if (questionIndex == '2') {
            this.masterdata.answer2 = val;
            this.masterdata.questionId2 = questionIndex;
            this.masterdata.shortTextTwo = this.shortTextTwo;
               localStorage.setItem('answer2', 
               JSON.stringify(
                { "questionId": this.masterdata.questionId2,
                    "answer": this.masterdata.answer2, 
                    "shortText": this.shortTextTwo
                })); }

    }
    onBack() {
        this.router.navigate(['/landingpage']);
    }
    onNext() {
        this.router.navigate(['/hinfonext']);
    }
}