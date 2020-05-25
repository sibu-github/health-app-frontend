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
import { saveuserresponse } from 'app/sd-services/saveuserresponse';

// we can encrypt password using bcrypt and cryptojs also , for testing i am using cryptojs
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'bh-login',
    templateUrl: './login.template.html'
})

export class loginComponent extends NBaseComponent implements OnInit {

    constructor(private router: Router, private masterdata: masterdataService, private saveuserService: saveuserresponse) {
        super();
        let language = window.localStorage.getItem('language');
       
        this.localeService.language = language;
    }

    ngOnInit() {
        

    }
   async login(form) {
        console.log(form.value);
        this.masterdata.username = form.value.username;
        this.masterdata.password = await this.encrypt(form.value.password);
        console.log(this.masterdata);
        let formdata = {
               username: form.value.username,
               password: form.value.password
        }
        localStorage.setItem('username', this.masterdata.username);
        localStorage.setItem('password', this.masterdata.password);

        this.saveuserService.saveUserData(this.masterdata).then((Response) => {
            if (Response) {
                console.log('Response ', Response);
                // this.router.navigate(['dashboard']);
            }
        }).catch((error) => {
            console.log(error);
        });

        this.router.navigate(['/confirmdetails']);
    }

    encrypt(password) {
        // password will encrypt with AES/RSA algorithm and make some salt
        // The best way is to encrypt password in backend.
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(password), '12345').toString();
        } catch (e) {
            console.log(e);
        }

    }
}
