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
import {masterdataService} from '../../services/masterdata/masterdata.service';
@Component({
    selector: 'bh-login',
    templateUrl: './login.template.html'
})

export class loginComponent extends NBaseComponent implements OnInit {

    constructor(private router:Router, private masterdata : masterdataService) {
        super();
    }

    ngOnInit() {

    }
    login(form){
        console.log(form.value);
        this.masterdata.username = form.value.username;
        //this.masterdata.password = form.value.password;
        console.log(this.masterdata)
        this.router.navigate(['/healthinfo']);
    }
}
