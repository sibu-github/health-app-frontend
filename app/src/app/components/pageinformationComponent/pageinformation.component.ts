/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';

import { datasharingService } from '../../services/datasharing/datasharing.service';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-pageinformation',
    templateUrl: './pageinformation.template.html'
})

export class pageinformationComponent extends NBaseComponent implements OnInit {
validclick:Boolean;
defaultLocationName='India';
phone;
updatelocations:any;
totallocations:any;
locationName: any;
firstName:any; // kept for build error
lastname:any; // kept for build error
    constructor(private router:Router, private datash:datasharingService) {
        super();
        
        // get the previously selected language from local storage
        // set the language if selected
        let language = window.localStorage.getItem('language');
        if(language){
            this.localeService.language = language;
        }
    }

    ngOnInit() {
        this.updatelocations= this.datash.getlocationdata();
        this.totallocations=this.updatelocations;
        console.log(this.totallocations);
    }

    /**
     * Function name: personalInfoSubmit
     * @Input: JSON data 
     * @Output:JSON data { response 201 / error}
     * @Desc: This function collects the data from user and posts into Information Collection db
     * @error: 500 Internal server error / 404 - method not found
     */

    personalInfoSubmit(data){
        this.validclick=true;
        console.log(data.value);
        console.log(this.defaultLocationName, data.value.locationName);
          if(data.valid === true){
              for(let i=0;i<=this.totallocations.length;i++){
                if((this.totallocations[i] && this.totallocations[i].name.toLowerCase() ===  data.value.locationName.toLowerCase())) {
                    console.log('valid success');
                     this.router.navigate(['/contactinfo']);
                    break;
                }
              }
                this.validclick = false;
               // this.router.navigate(['/thankyou']);
        } 
    }

   locationFilter(){
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values){
  console.log(values);
  return values.filter(location => location.name.toLowerCase())
}

}
