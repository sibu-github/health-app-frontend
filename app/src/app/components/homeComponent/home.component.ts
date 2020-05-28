/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import {Router} from '@angular/router';

import {saveuserresponse} from 'app/sd-services/saveuserresponse';

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

    showSplash:boolean = true;
    showThankYou:boolean = false;


    constructor(private userService: saveuserresponse, private router: Router) {
        super();
    }

    ngOnInit() {
        this.fetchUserResponse()
    }

    // check if the user has submitted response for the day
    // if user has submitted already then we set showThankYou = true
    // otherwise showLanding = true
    async fetchUserResponse(){
        try {
            const username = localStorage.getItem('username')
            console.log({username})
            const bh = await this.userService.getIfUserSubmitted(username);
            console.log(bh);

            let hasSubmitted = "no";
            let colorCode = "green";
            if(bh.local && bh.local.result){
                hasSubmitted = bh.local.result.updated;
                colorCode = bh.local.result.colorCode;
            }
            
            // save the colorCode in localStorage
            window.localStorage.setItem('colorCode', colorCode);


            // hide splash screen
            this.showSplash = false;
            // when user already submitted show Thank You screen 
            if(hasSubmitted === "yes"){
                this.showThankYou = true;
                return;
            }
            
            // otherwise show landing page 
            this.router.navigate(['/landingpage']);

        } catch(err){
            console.error(err)
        }
    }




}
