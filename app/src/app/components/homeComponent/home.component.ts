/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';

import { saveuserresponse } from 'app/sd-services/saveuserresponse';
import { hrmailverifier } from "app/sd-services/hrmailverifier";

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-home',
    templateUrl: './home.template.html'
})

export class homeComponent extends NBaseComponent implements OnInit {

    showSplash: boolean = true;
    showThankYou: boolean = false;


    constructor(private userService: saveuserresponse,private hrmailService:hrmailverifier, private router: Router) {
        super();
    }

    ngOnInit() {
        this.callAPI()
    }

    // call API
    async callAPI() {
        try {
            await this.getJWT();
            await this.fetchUserResponse();
        } catch (err) {
            console.error(err)
        }
    }


    // get JWT token to make API call
    async getJWT() {
        try {
            const bh = await this.userService.getJWT()
            if (bh && bh.local && bh.local.result) {
                const jwtToken = bh.local.result.token;

                // set the jwtToken in the localStorage so that can be used throughout the application
                if (jwtToken) {
                    window.localStorage.setItem('jwtToken', `Bearer ${jwtToken}`)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    // check if the user has submitted response for the day
    // if user has submitted already then we set showThankYou = true
    // otherwise showLanding = true
    async fetchUserResponse() {
        console.log('fetchUserResponse called')
        try {
            const username = localStorage.getItem('username');
            console.log(username);

            // if the username is not stored in the localstorage
            // we show landingpage
            if (!username || username === 'undefined') {
                this.router.navigate(['/landingpage']);
                return
            }

            // check if the user is an HR Admin
            // if user is HR Admin then we move to optionpage
            let dt = await this.hrmailService.verifyEmail(username);
            if(dt && dt.local && dt.local.result && dt.local.result.Authorized == 'true'){
                this.router.navigate(['/optionpage']);
                return
            }

            // check if user has submitted data for the day 
            const bh = await this.userService.getIfUserSubmitted(username);
            console.log(bh);

            let hasSubmitted = "no";
            let colorCode = "green";
            if (bh.local && bh.local.result) {
                hasSubmitted = bh.local.result.updated;
                colorCode = bh.local.result.colorCode;
            }

            // save the colorCode in localStorage
            window.localStorage.setItem('colorCode', colorCode);

            // hide splash screen
            this.showSplash = false;
            // when user already submitted show Thank You screen 
            if (hasSubmitted === "yes" || hasSubmitted === "Yes") {
               this.router.navigate(['/thankyou'])
                return;
            }
            // otherwise show landing page 
            this.router.navigate(['/landingpage']);
        } catch (err) {
            console.error(err)
        }
    }

}
