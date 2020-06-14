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
    selector: 'bh-forceupdate',
    templateUrl: './forceupdate.template.html'
})

export class forceupdateComponent extends NBaseComponent implements OnInit {
    version = 1.12;
    updates = ["Bug fixes","New fixes","Server update"]
    constructor() {
        super();
    }

    ngOnInit() {

    }
}
