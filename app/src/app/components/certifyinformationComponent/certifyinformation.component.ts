/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';


import { datasharingService } from 'app/services/datasharing/datasharing.service';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

import {masterdataService} from '../../services/masterdata/masterdata.service';
import { saveuserresponse } from 'app/sd-services/saveuserresponse';
@Component({
    selector: 'bh-certifyinformation',
    templateUrl: './certifyinformation.template.html'
})

export class certifyinformationComponent extends NBaseComponent implements OnInit {
 validclick:Boolean; // For Form validaton
 signature:any; // kept for build error
 accept:any; // kept for build error
    constructor( private router: Router,private masterdata : masterdataService,private saveuserService:saveuserresponse,private datasharingService:datasharingService) {
        super();
        
        // get the previously selected language from local storage
        // set the language if selected
        let language = window.localStorage.getItem('language');
        if(language){
            this.localeService.language = language;
        }
    }

    ngOnInit() {}
    
    /**
     * Function name: signSubmit
     * @Input: JSON data {signature and Acceptance }
     * @Output:JSON data { response 201 / error}
     * @Desc: This function collects the data from user and posts into Information Collection db
     * @error: 500 Internal server error / 404 - method not found
     */

    signSubmit(data){
        this.validclick=true;
        console.log(data.value);
          if(data.valid === true){
                this.validclick = false;

                let certifyInfoName =data.value.signature;
                let certifyInfoChecked = data.value.accept;
                this.masterdata.certifyInfoName = data.value.signature;
                 this.masterdata.certifyInfoChecked = data.value.accept;
                localStorage.setItem('certifyInfoName', data.value.signature);
                localStorage.setItem('certifyInfoChecked', data.value.accept);

                this.masterdata.userSubmit().then((resp)=>{
                    console.log('certt resp', resp);
                    this.router.navigate(['/thankyou']);
                }).catch((err)=>{
                    console.log('cert err',err);
                });


        }  else {
            if(this.accept == undefined) {
                this.datasharingService.openSnackBar('Please select Terms and Conditions', "X");
            } else{
                this.datasharingService.openSnackBar('Please provide required information', "X");
            }
        }
    }
    onBack(){
    this.router.navigate(['/hinfonext']);
    }
    navigatePrev() {
        alert('I am navigating to previous page');
    }
}
