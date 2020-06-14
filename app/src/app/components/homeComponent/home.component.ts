/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, Input, Inject } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { NLocalStorageService } from "neutrinos-seed-services";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { hrmailverifier } from "app/sd-services/hrmailverifier";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { modelpoupComponent } from '../modelpoupComponent/modelpoup.component';
import { forceupdateComponent } from '../forceupdateComponent/forceupdate.component';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { NSystemService } from 'neutrinos-seed-services';
import { environment } from '../../../environments/environment'
import { database } from 'firebase';


/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/
declare let cordova: any;
@Component({
  selector: "bh-home",
  templateUrl: "./home.template.html",
})
export class homeComponent extends NBaseComponent implements OnInit {
  showSplash: boolean = true;
  showThankYou: boolean = false;

  private isVersionOutdated:boolean = false;
  private systemService = NSystemService.getInstance();


  constructor(
    private userService: saveuserresponse,
    private hrmailService: hrmailverifier,
    private router: Router,
    private nLocalStorage: NLocalStorageService,
    public dialog: MatDialog,
    private http: HttpClient,

  ) {
    super();
  }

  async ngOnInit() {
    // when opened from the browser we show the landingpage straightway
    if(this.systemService.deviceType === 'browser'){
      this.router.navigate(["/landingpage"]);
      return
    }
   
    // for mobile app
    if(this.systemService.isAndroid() || this.systemService.isIOS()){
      await this.versionCheck()
      if(!this.isVersionOutdated){
        await this.callAPI()
      }
    }
  }

  // version check api call implemented by dinesh kumar
  async versionCheck() {
    if(this.systemService.isAndroid()){
      return this.checkVersionAndroid()
    }

    if(this.systemService.isIOS()){
      return this.checkIOSVersion()
    }
   
  }

  async checkVersionAndroid(){
    try {
      const currentAppVersion = await cordova.getAppVersion.getVersionNumber()
      const appName = await cordova.getAppVersion.getAppName()
      let packageName = await cordova.getAppVersion.getPackageName()
      const url:string = `${environment.properties.ssdURL}/api/getAndroidVersion`
      const payload:object = {appId: packageName}
      const res:any = await (this.http.post(url, payload).toPromise())
      let data = {
        appName,
        version: res.data .version,
        appUrl: res.data.url
      }
      if(data.version > currentAppVersion){
        this.openVersionAlert(data)
      }
      return true
    } catch(err){
      console.error(err)
      return false;
    }
  }

  async checkIOSVersion(){
    try{
      const currentAppVersion = await cordova.getAppVersion.getVersionNumber()
      const appName = await cordova.getAppVersion.getAppName()
      let packageName = await cordova.getAppVersion.getPackageName()
      const iTuneURL:string = `https://itunes.apple.com/lookup?bundleId=${packageName}`
      const res:any = await this.http.get(iTuneURL).toPromise()
      if(!res || !res.results || res.results.length < 1){
        return false
      }
      if(res.results[0].version > currentAppVersion){
        let data = {
          appName,
          version: res.results[0].version,
          appUrl: res.results[0].trackViewUrl
        }
        this.openVersionAlert(data)
      }
    }catch(err){
      console.error(err)
      return false
    }
  }


  openVersionAlert(data){
    this.isVersionOutdated = true
    const dialogRef = this.dialog.open(forceupdateComponent, { data });
    dialogRef.disableClose = true;
  }



  async callAPI() {
    try {
      await this.getJWT();
      await this.fetchUserResponse();
    } catch (err) {
      console.error(err);
    }
  }

  // get JWT token to make API call
  async getJWT() {
    try {
      const bh = await this.userService.getJWT();
      if (bh && bh.local && bh.local.result) {
        const jwtToken = bh.local.result.token;

        // set the jwtToken in the localStorage so that can be used throughout the application
        if (jwtToken) {
          this.nLocalStorage.setValue("jwtToken", `Bearer ${jwtToken}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  // check if the user has submitted response for the day
  // if user has submitted already then we set showThankYou = true
  // otherwise showLanding = true
  async fetchUserResponse() {
    try {
      const username = this.nLocalStorage.getValue("username");
      const jwtToken = this.nLocalStorage.getValue("jwtToken");

      // if the username is not stored in the localstorage
      // we show landingpage
      // NOTE:username not stored in localstorage means user has never logged into the app
      // or cleared the cache, or uninstalled and install the app
      // in all cases we show the login page to the user again
      if (!username || username === "undefined") {
        this.router.navigate(["/landingpage"]);
        return;
      }

      // check if the user is an HR Admin
      // if user is HR Admin then we move to optionpage
      // NOTE: If the user is HR Admin we show the option page first.
      // If user chooses to conitune as employee thats when we check if he has
      // submitted data for the day already. The optionpage will also include the
      // logic for checking if the user has already submitted data for the day.
      let dt = await this.hrmailService.verifyEmail(username, jwtToken);
      if (
        dt &&
        dt.local &&
        dt.local.result &&
        dt.local.result.Authorized == "true"
      ) {
        this.router.navigate(["/optionpage"]);
        return;
      }

      // check if user has submitted data for the day
      // Note: for employee we check if the user has submitted data for the day already
      // if yes we redirect to thank you page, otherwise redirect to landingpage
      const bh = await this.userService.getIfUserSubmitted(username, jwtToken);

      let hasSubmitted = "no";
      let colorCode = "green";
      if (bh.local && bh.local.result) {
        hasSubmitted = bh.local.result.updated;
        colorCode = bh.local.result.colorCode;
      }

      // save the colorCode in localStorage
      this.nLocalStorage.setValue("colorCode", colorCode);

      // hide splash screen
      this.showSplash = false;
      // when user already submitted show Thank You screen
      if (hasSubmitted === "yes" || hasSubmitted === "Yes") {
        this.router.navigate(["/thankyou"]);
        return;
      }
      // otherwise show landing page
      this.router.navigate(["/landingpage"]);
    } catch (err) {
      console.error(err);
    }
  }
}


