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
    localdata:any;
    // addlinfo= any;

    constructor(private router: Router, private masterdata: masterdataService) {
        super();
         let language = window.localStorage.getItem('language');
         this.localeService.language = language;
         console.log(language);
          // for prepopulating the data
        this.localdata = JSON.parse(localStorage.getItem('userResponse')); 
    }
    answer: string = '';
    answer2: string = '';
    //answer3: string = '';
    shortTextOne = "had fever";
    shortTextTwo = "had Personal Contact";
    ngOnInit() {
         if(this.localdata && this.localdata.response.length>0){
            this.answer = this.localdata.response[0].answer;
            this.answer2 = this.localdata.response[1].answer;
           // this.answer3 = this.localdata.response[2].answer;
            //this.addlinfo = this.localdata.response[2].addlnfo;

        } else {
             this.answer = 'false';
             this.answer2 = 'false';
           //  this.answer3 = 'false';
        }
     }

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
                })); 
        }

    }
    onBack() {
        this.router.navigate(['/landingpage']);
    }
    onNext() {
        console.log(this.answer, this.answer2);
        // if()
        this.router.navigate(['/hinfonext']);
    }
}