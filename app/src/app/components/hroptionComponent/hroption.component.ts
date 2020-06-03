/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from "@angular/router";
import { saveuserresponse } from 'app/sd-services/saveuserresponse';

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-hroption',
    templateUrl: './hroption.template.html'
})

export class hroptionComponent extends NBaseComponent implements OnInit {

    constructor(private userService: saveuserresponse,private router: Router) {
        super();
    }

    ngOnInit() {

    }

    navigateToEmp(){
        const newusername = localStorage.getItem('username');
        console.log(newusername);
        this.userService.getIfUserSubmitted(newusername).then((resp)=>{
        console.log("newbh",resp);
        let hasSubmitted = "no";
        let colorCode = "green";

           if (resp.local && resp.local.result) {
                        hasSubmitted = resp.local.result.updated;
                        console.log('hassum', hasSubmitted);
                        colorCode = resp.local.result.colorCode;
                }
    
                // save the colorCode in localStorage
                window.localStorage.setItem('colorCode', colorCode);

                // when user already submitted show Thank You screen 
                if (hasSubmitted === "yes") {
                    this.router.navigate(['/thankyou']);
                    return;
                }     
                 this.router.navigate(["/confirmdetails"]);  
        }).catch((err)=>{
            console.log(err);
        });
       
        
    }

    navigateToHR(){
        this.router.navigate(["/hrdashboard"]);
    }
}
