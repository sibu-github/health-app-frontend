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
    selector: 'bh-login',
    templateUrl: './login.template.html'
})

export class loginComponent extends NBaseComponent implements OnInit {

    constructor(private router:Router) {
        super();
    }

    ngOnInit() {

    }
    login(form){
        console.log(form.value);
        this.router.navigate['/landingpage'];
    }
}
