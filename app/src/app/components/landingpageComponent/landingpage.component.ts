/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import {saveuserresponse} from 'app/sd-services/saveuserresponse';
interface Language {
  value: string;
  viewValue: string;
}

declare var cordova:any;
/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
  selector: "bh-landingpage",
  templateUrl: "./landingpage.template.html",
})
export class landingpageComponent extends NBaseComponent implements OnInit {
  public href: string = "";
  public inAppBrowserRef:any;




  constructor(private router: Router, private userService: saveuserresponse) {
    super();

    this.onLoadStartCallback = this.onLoadStartCallback.bind(this);

    // get the previously selected language from local storage
    // set the language if selected
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
    }
  }

  ngOnInit() {
    //   const clientId = this.getVal('azureClientID')
    //   const authURL = this.getVal('azureAuthURL')
    //   const redirectURL = this.getVal('redirectURL')
    //   const scopes = this.getVal('azureScopes')
    //   const responseType = this.getVal('azureResponseType')
    //   console.log({clientId, authURL, redirectURL, scopes, responseType})
  }

  languages: any[] = [
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Spanish" },
    { value: "de", viewValue: "German" },
    { value: "pt", viewValue: "Portuguese" },
    { value: "ko", viewValue: "Korean" },
    { value: "th", viewValue: "Thai" },
    { value: "zh-CN", viewValue: "Chinese (Mandarin)" },

    // {value: 'zh-TW', viewValue: 'CHINESE (TRADITIONAL)'}
  ];

  doSomething(event) {
    //console.log(event.value);
    window.localStorage.setItem("language", event.value);
    let language = window.localStorage.getItem("language");
    console.log(language);
    this.localeService.language = language;
  }


  async letStart() {
    console.log("Lets Starts is working");
    let accessToken = window.localStorage.getItem('accessToken');
    let refreshToken = window.localStorage.getItem('refreshToken');

    console.log({accessToken, refreshToken});

    // if accessToken and refreshToken already present in the localstorage
    // that means user has logged in before
    // we will call Azure API and get new tokens using the old ones
    // if the tokens are still valid then we will get new pair of tokens
    // otherwise we will show the login screen again
    if(accessToken && refreshToken){
        try {
            console.log('trying to call refreshToken', refreshToken)
            const bh = await this.userService.getNewTokens(refreshToken);
            console.log(bh);
            // if we received new tokens then we auto login and directly 
            // redirect to confirmDetails page
            if(bh && bh.local && bh.local.result && bh.local.result.accessToken){
                this.setTokensNUserLocalStorage(bh)
                this.router.navigate(["/confirmdetails"]);
                return
            }
        } catch(err){
            console.error(err)
        }
    }

    // otherwise we show login screen for user to login
    this.showLoginScreen()

  }

    // callback for loadstart event inappbrowser
    onLoadStartCallback({url}){
        const REDIRECT_URL = 'http://localhost:3000/authorize';
        console.log('InAppBrowser load started...', url);
        if(url.indexOf(REDIRECT_URL) === 0){
            console.log('loading recirect url')
            const search = url.substring(REDIRECT_URL.length);
            const urlParams = new URLSearchParams(search);
            const code = urlParams.get('code');
            this.inAppBrowserRef.close();
            this.onSuccess(code);
        }
    }



    // show the microsoft login window 
    showLoginScreen(){
        const CLIENT_ID = '18a118d6-dbdb-40e7-8f77-3fe294c27ead';
        const AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
        const REDIRECT_URL = 'http://localhost:3000/authorize';
        const SCOPE = 'openid profile offline_access';
        const RESPONSE_TYPE = 'code';
        const loginUrl = `${AUTH_URL}?redirect_uri=${REDIRECT_URL}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}`;
        console.log({loginUrl})

        // if document URL is starting with http then it is opened from browser
        // otherwise from mobile
        if(document.URL.indexOf('http') === 0){
            console.log('From browser')
            // for non employee flow the url contains the string /landpage
            // route to personalinfo in that case
            if(document.URL.indexOf('/landpage') > 0){
                this.router.navigate(["/personalinfo"])
            } 
        } else {
            console.log('From mobile')
            // keep the reference of this so that can be used from the event listener callback
            const options = 'location=no,clearcache=yes,cleardata=yes';
            const target = '_blank';
            this.inAppBrowserRef = cordova.InAppBrowser.open(loginUrl, target, options);

            // register the loadstart event listener
            this.inAppBrowserRef.addEventListener('loadstart', this.onLoadStartCallback);  
        }
    }

    // on successful login
    async onSuccess(code){
        console.log('onSuccess called, code is: ', code);
        try {
            // if code is blank then exit
            if(!code){
                return
            }

            const bh = await this.userService.getTokenFromCode(code);
            this.setTokensNUserLocalStorage(bh);
            this.router.navigate(["/confirmdetails"]);
            
        } catch(err){
            console.error(err)
        }
    }


    // set user details and tokens in localstorage
    setTokensNUserLocalStorage(bh){
        if(bh.local && bh.local.result){
                console.log(bh.local.result);
                window.localStorage.setItem('accessToken', bh.local.result.accessToken);
                window.localStorage.setItem('refreshToken', bh.local.result.refreshToken);
                window.localStorage.setItem('email', bh.local.result.email);
                window.localStorage.setItem('username', bh.local.result.email);
                window.localStorage.setItem('firstName', bh.local.result.user.firstName);
                window.localStorage.setItem('lastName', bh.local.result.user.lastName);
                window.localStorage.setItem('location', bh.local.result.user.location);
                window.localStorage.setItem('phone', bh.local.result.user.phone);
        }
    }

}
