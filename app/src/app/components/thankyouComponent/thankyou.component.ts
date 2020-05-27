/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-thankyou',
    templateUrl: './thankyou.template.html'
})

export class thankyouComponent extends NBaseComponent implements OnInit {

    // this property determine the background color of the tick mark icon circle
    // when this property is set to true
    // the backround color of the circle will change to amber otherwise green
    isAmber:boolean = false


    constructor() {
        super();

        // set selected language in locale
        let language = window.localStorage.getItem('language');
        this.localeService.language = language;

        // get the color code from localstorage
        let color = window.localStorage.getItem('colorCode');
        this.isAmber = color === 'AMBER';
    }

    ngOnInit() {

    }
}
