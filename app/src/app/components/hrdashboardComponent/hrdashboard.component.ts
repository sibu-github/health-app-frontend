/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';

*/
import {saveuserresponse} from 'app/sd-services/saveuserresponse';
import {hrdashboard} from 'app/sd-services/hrdashboard';
/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-hrdashboard',
    templateUrl: './hrdashboard.template.html'
})

export class hrdashboardComponent extends NBaseComponent implements OnInit {
dashboard:any
 name = 'Angular';
 locationname :any
q1postive:number 
q1negative:number
q2postive:number
q2negative:number
q3postive:number 
q3negative:number
location:any[];
fromDate:any;
toDate:any;
newarr=[];
updatelocations: any;
totallocations: any;
locationName: any;
date:any;


 myControl:FormControl;
  
  filteredOptions: Observable<string[]>;

  constructor(private hrdashboard: hrdashboard, private getlocation: saveuserresponse) {
         super();
    //      let language = window.localStorage.getItem('language');
    //  if(language){

    //         this.localeService.language = language;

    //     }
   this.localeService.language = 'en';
        
    }
  

    async ngOnInit() {
        // console.log(date);
    //   this.myControl = new FormControl();
    //   console.log(this.myControl.valueChanges);
    //   this.filteredOptions = this.myControl.valueChanges
      
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
        try{
        let dashboard = await this.hrdashboard.hrDashboard()
        console.log(dashboard.local.result.q1Positive);
      this.q2postive = dashboard.local.result.q2Positive;
      this.q2negative = dashboard.local.result.q2Negative;

    //  //q2
        this.q3postive = dashboard.local.result.q3Positive;
        this.q3negative = dashboard.local.result.q3Negative;
     
    //  //q3
     this.q1postive = dashboard.local.result.q3Positive;
     this.q1negative = dashboard.local.result.q3Negative;

     let bh = await this.getlocation.getLocations()
            console.log(bh)
            this.locationname = bh.local.result;         
            // console.log(bh.local.result.length);
         console.log('locationlist',this.locationname);
         
         
        // for(let i = 0; i < this.locationname.length; i++){
        //  console.log('forloop',this.locationname[i].locationName);
//  }
        // this.locationname.forEach((item)=>{
        //   //console.log(item);
        //   this.newarr.push(item.locationName);
        //    })
        this.location = this.newarr
        this.updatelocations = bh.local.result;
        this.totallocations = this.updatelocations;
       console.log('locationinput', this.locationName);
        }
        catch(err){
            console.error(err)
        }
      

  }
 locationFilter() {
        this.updatelocations = this.filter(this.totallocations);
    }

    filter(values) {
        console.log(this.locationName);
        return values.filter(location => location.locationName.includes(this.locationName))
    }
async selected(data){
if(data.option.value){
    if(this.fromDate && this.toDate){
        console.log('with from & to Date');
    let dashboard = await this.hrdashboard.hrDashboard({locationName: data.option.value, fromDate: this.fromDate, toDate: this.toDate})
        console.log(dashboard.local.result.q1Positive);
         this.q3postive = dashboard.local.result.q2Positive;
         this.q3negative = dashboard.local.result.q2Negative;

    //  //q2
        this.q2postive = dashboard.local.result.q1Positive;
        this.q2negative = dashboard.local.result.q1Negative;
     
    //  //q3
     this.q1postive = dashboard.local.result.q3Positive;
     this.q1negative = dashboard.local.result.q3Negative;
    }else{

    let dashboard = await this.hrdashboard.hrDashboard({locationName: data.option.value})
        console.log(dashboard.local.result.q1Positive);
      this.q3postive = dashboard.local.result.q2Positive;
      this.q3negative = dashboard.local.result.q2Negative;

    //  //q2
        this.q2postive = dashboard.local.result.q1Positive;
        this.q2negative = dashboard.local.result.q1Negative;
     
    //  //q3
     this.q1postive = dashboard.local.result.q3Positive;
     this.q1negative = dashboard.local.result.q3Negative;
}
}
else{
    console.log('No Location is Selected ')
}
    }
    async dateselected(datedata){
    this.fromDate = datedata.value.toISOString().substring(0,10);

    console.log(this.fromDate);
    
   
}
async toDateSelected(datedata){
    this.toDate = datedata.value.toISOString().substring(0,10);

    console.log(this.toDate);
    if(this.fromDate){
    let dashboard = await this.hrdashboard.hrDashboard({toDate: this.toDate,fromDate: this.fromDate })
        console.log(dashboard.local.result.q1Positive);
      this.q3postive = dashboard.local.result.q2Positive;
      this.q3negative = dashboard.local.result.q2Negative;

    //  //q2
        this.q2postive = dashboard.local.result.q1Positive;
        this.q2negative = dashboard.local.result.q1Negative;
     
    //  //q3
     this.q1postive = dashboard.local.result.q3Positive;
     this.q1negative = dashboard.local.result.q3Negative;

    //  let bh = await this.getlocation.getLocations()
   
    }
    else{
        console.log('No From Date');
    }
}
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.newarr.filter(option => option.toLowerCase().includes(filterValue));
  // } 
   
}
