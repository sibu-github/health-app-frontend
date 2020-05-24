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
    selector: 'bh-confirmdetails',
    templateUrl: './confirmdetails.template.html'
})

export class confirmdetailsComponent extends NBaseComponent implements OnInit {

validclick:Boolean;
defaultLocationName='India';
phone;
updatelocations:any;
totallocations:any;
locationName: any;

    constructor(private router:Router, private datash:datasharingService) {
        super();
    }

    ngOnInit() {
        this.locationName=this.defaultLocationName.slice(0);
        this.phone='817930010987';
        this.updatelocations= this.datash.getlocationdata();
        this.totallocations=this.updatelocations;
        console.log(this.totallocations);
    }
    
    /**
     * Function name: onSubmit
     * @Input: JSON data {locationName, phone}
     * @Output:JSON data { response 201 / error}
     * @Desc: This function collects the locationname and phonenumber from user and posts into db
     * @error: 500 Internal server error / 404 - method not found
     */
    onSubmit(data){
            this.validclick=true;
        console.log(data.value);
        console.log(this.defaultLocationName, data.value.locationName);
          if(data.valid === true){
              for(let i=0;i<=this.totallocations.length;i++){

                if((this.totallocations[i] && this.totallocations[i].name.toLowerCase() === this.locationName.toLowerCase()) || this.defaultLocationName.toLowerCase() === data.value.locationName.toLowerCase()){
                    console.log('valid success');
                     this.router.navigate(['/healthinfo'])
                    break;
                }
              }
            //   this.totallocations.forEach(element => {
            //     if(element.name.includes(this.locationName) || this.locationName == data.value.locationName){
            //         console.log('valid success');
            //         // this.router.navigate(['/'])
            //     }
            //   });
                this.validclick = false;
        }
    }

   locationFilter(){
    this.updatelocations = this.filter(this.totallocations);
  }

  filter(values){
  console.log(values);
  return values.filter(location => location.name.toLowerCase().includes(this.locationName))
}
}
