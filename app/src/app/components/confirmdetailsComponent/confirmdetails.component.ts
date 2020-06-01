/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';

import { Router } from '@angular/router';

import { datasharingService } from 'app/services/datasharing/datasharing.service';
import {userdetails} from 'app/sd-services/userdetails';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/
import {saveuserresponse} from 'app/sd-services/saveuserresponse';


/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/
import { masterdataService } from '../../services/masterdata/masterdata.service';

@Component({
    selector: 'bh-confirmdetails',
    templateUrl: './confirmdetails.template.html'
})

export class confirmdetailsComponent extends NBaseComponent implements OnInit {

    validclick: Boolean;
    defaultLocationName = 'Westchester';
    phone;
    updatelocations: any;
    totallocations: any;
    locationName: any;

    constructor(private router: Router,private userdataservice: userdetails, private getlocation: saveuserresponse, private datash: datasharingService, private masterdata: masterdataService,private datasharingService:datasharingService) {
        super();
         let language = window.localStorage.getItem('language');
       
        this.localeService.language = language;
    }

    async ngOnInit() {
        this.locationName = this.defaultLocationName.slice(0);
        this.phone = '817930010987';
        //this.updatelocations = this.datash.getlocationdata();
       
       // console.log(this.totallocations);
        try {
            let bh = await this.getlocation.getLocations()
            console.log(bh)
            console.log(bh.local.result);
             this.updatelocations = bh.local.result;
             this.totallocations = this.updatelocations;
            console.log(this.totallocations)
        }catch(err) {
            console.error(err);
        }
    }

    /**
     * Function name: onSubmit
     * @Input: JSON data {locationName, phone}
     * @Output:JSON data { response 201 / error}
     * @Desc: This function collects the locationname and phonenumber from user and posts into db
     * @error: 500 Internal server error / 404 - method not found
     */
    onSubmit(data) {
        this.validclick = true;
        console.log(data.value);
        console.log(this.defaultLocationName, data.value.locationName);
        if (data.valid === true) {
            for (let i = 0; i <= this.totallocations.length; i++) {
                if ((this.totallocations[i] && this.totallocations[i].locationName === this.locationName) || this.defaultLocationName === data.value.locationName) {
                    console.log('valid success');

                    this.masterdata.locationName = data.value.locationName;
                    this.masterdata.phone = data.value.phone;
                     this.masterdata.locationNameTwo = data.value.locationName;
                    this.masterdata.userType = data.value.type;
                    let confirmdetailsObj = {
                        email:'bhsarat@gmail.com',
                        locationName: this.masterdata.locationName,
                        phone: this.masterdata.phone
                    };

                    //calling confirm details api
                this.userdataservice.userDetails(confirmdetailsObj).then((result)=>{
                    console.log(result);
                    this.router.navigate(['/healthinfo']);
                }).catch((err)=> {
                    console.log('error', err);
                })
                 
                    localStorage.setItem('locationName', confirmdetailsObj.locationName);
                    localStorage.setItem('phone', confirmdetailsObj.phone);
                    
                    break;
                } else {
                    this.datasharingService.openSnackBar('Invalid Location Input', "X");
                }
            }
            this.validclick = false;
        }
    }

    locationFilter() {
        this.updatelocations = this.filter(this.totallocations);
    }

    filter(values) {
       console.log(values);
        return values.filter(location => location.locationName.includes(this.locationName))
    }
}
