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
    }
    answer: string = '';
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
            localStorage.setItem('answer1', JSON.stringify({ "answer": this.masterdata.answer1, "questionId": this.masterdata.questionId }));
        }
        if (questionIndex == '2') {
            this.masterdata.answer2 = val;
            this.masterdata.questionId = questionIndex;
            localStorage.setItem('answer2', JSON.stringify({ "answer": this.masterdata.answer2, "questionId": this.masterdata.questionId }));
        }

    }
    onBack() {
        this.router.navigate(['/landingpage']);
    }
    onNext() {
        this.router.navigate(['/hinfonext']);
    }
}