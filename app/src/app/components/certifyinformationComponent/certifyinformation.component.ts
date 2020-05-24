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

@Component({
    selector: 'bh-certifyinformation',
    templateUrl: './certifyinformation.template.html'
})

export class certifyinformationComponent extends NBaseComponent implements OnInit {
 validclick:Boolean; // For Form validaton
    constructor( private router: Router,private datasharingService:datasharingService) {
        super();
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
                console.log('i am success');
               this.router.navigate(['/thankyou']);
        } else {
            this.datasharingService.openSnackBar('Please select Terms and Conditions', "X");
        }
    }
    onBack(){
    this.router.navigate(['/hinfonext']);
    }
    navigatePrev() {
        alert('I am navigating to previous page');
    }
}
