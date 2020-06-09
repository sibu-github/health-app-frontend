/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, AfterViewInit, NgZone } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NSystemService } from 'neutrinos-seed-services';
import { masterdataService } from "../../services/masterdata/masterdata.service";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { hrmailverifier } from "app/sd-services/hrmailverifier";
import { BroadcastService, MsalService } from "@azure/msal-angular";

declare var cordova: any;
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
  // get the instance of the SystemService to read environment variables
  private systemService: NSystemService = NSystemService.getInstance();
  public href: string = "";
  public inAppBrowserRef: any;
  public defaultlang:string = 'en';
  public showSpinner:boolean = false;
  public isMobileApp: boolean = false;
  private isEmpLoggedIn: boolean = false;
  
  // list all languages to be shown in the language selection drop down
  languages: any[] = [
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Español" },
    { value: "de", viewValue: "Deutsche" },
    { value: "pt", viewValue: "Português" },
    { value: "ko", viewValue: "한국어" },
    { value: "th", viewValue: "ไทย" },
    { value: "zh-CN", viewValue: "中文（普通话)" },
  ];
  selectedObjects : any[];

  constructor(
    private router: Router, 
    private masterdata: masterdataService,
    private userService: saveuserresponse, 
    private hrmailService:hrmailverifier,
    private _zone: NgZone,
    private http: HttpClient,
    private broadcastService: BroadcastService,
    private authService: MsalService
  ) {
    super();
    // bind callback function
    this.onLoadStartCallback = this.onLoadStartCallback.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.updateLocaleLanguage();
    this.setIfMobileApp();
    this.checkAccount();
    this.subscribeToMsal();
  }

  ngOnInit() { 
    // call API to generate and new token and set in the localstorage
    // Note: In case of non employee flow we are directly landing on this page
    this.getJWT();
  }

  // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  updateLocaleLanguage() {
    let language = window.localStorage.getItem("language");
    if (language) {
      this.localeService.language = language;
      this.defaultlang = language;
      return;
    } 
    // set default language to english
    this.defaultlang = "en";
  }

  // check if opened from mobile app or from browser
  setIfMobileApp() {
    if (window["cordova"]) {
      console.log('mobile app detected')
      this.isMobileApp = true;
    }
  }


  // get JWT token to make API call
  // in the non employee flow this is the starting page
  async getJWT() {
    try {
      const bh = await this.userService.getJWT();
      if (bh && bh.local && bh.local.result) {
        const jwtToken = bh.local.result.token;
        // set the jwtToken in the localStorage so that can be used throughout the application
        if (jwtToken) {
          window.localStorage.setItem("jwtToken", `Bearer ${jwtToken}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }


  //when user selects language, goes into below fun
  languageSelect({value}) {
    window.localStorage.setItem("language", value);
    this.localeService.language = value;
  }

  //when user selects lets starts button
  async letStart() {
    console.log("Lets Starts is working");

    console.log("showSpinner", this.showSpinner);
    console.log("isMobileApp", this.isMobileApp);
    console.log("isEmpLoggedIn", this.isEmpLoggedIn);

    // when opened from browser
    // for non employee flow the url contains the string /landpage
    // route to personalinfo in that case
    if (document.URL.indexOf("/landpage") > 0) {
      this.router.navigate(["/personalinfo"]);
      return;
    }

    this.showSpinner = true;
    if (this.isMobileApp) {
      this.letsStartMobile();
      return;
    }

    // when opened from browser check if already logged in
    // otherwise show login page
    if (this.isEmpLoggedIn) {
      this.checkIfHRAdmn();
      return;
    } 
    // otherwise show login window
    this.loginEmp();
  }

  // let's start for Mobile App
  // we show inappbrowser here
  async letsStartMobile() {
    console.log("Lets Starts Mobile");

    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    this.showSpinner = true;
    console.log({ accessToken, refreshToken });

    // if accessToken and refreshToken already present in the localstorage
    // that means user has logged in before
    // we will call Azure API and get new tokens using the old ones
    // if the tokens are still valid then we will get new pair of tokens
    // otherwise we will show the login screen again
    if (accessToken && refreshToken) {
      try {
        console.log("trying to call refreshToken", refreshToken);
        const bh = await this.userService.getNewTokens(refreshToken);
        console.log('getNewTokens', bh);
        // if we received new tokens then we auto login and directly
        // redirect to confirmDetails page
        if (bh && bh.local && bh.local.result && bh.local.result.accessToken) {
          this.setTokensNUserLocalStorage(bh);
          this.checkIfHRAdmn();
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // otherwise we show login screen for user to login
    this.openInAppBrowser();
  }

  // open inappbrowser to show the login winoow
  openInAppBrowser() {
    /**
     * ===================================================================
     * NOTE TO SELF: There are two sets client id and redirect url defined 
     * in the environment. When we are launching login screen from mobile 
     * app, we will use the client id pointing to the UAT environment.
     * When we are launching the login screen from web browser we will
     * use the client ID pointing to Prod env. 
     * =================================================================
     */
    const CLIENT_ID = this.systemService.getVal("azureClientID");
    const AUTH_URL = this.systemService.getVal("azureAuthURL");
    const REDIRECT_URL = this.systemService.getVal("redirectURL");
    const SCOPE = this.systemService.getVal("azureScopes");
    const RESPONSE_TYPE = this.systemService.getVal("azureResponseType");
    const loginUrl = `${AUTH_URL}?redirect_uri=${REDIRECT_URL}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}`;

    // keep the reference of this so that can be used from the event listener callback
    const options = "location=no,clearcache=yes,cleardata=yes";
    const target = "_blank";
    this.inAppBrowserRef = cordova.InAppBrowser.open(loginUrl, target, options);

    // register the loadstart event listener
    this.inAppBrowserRef.addEventListener("loadstart", this.onLoadStartCallback);
  }


  // callback for loadstart event inappbrowser
  onLoadStartCallback({ url }) {
    const REDIRECT_URL = this.systemService.getVal('redirectURL');
    console.log("InAppBrowser load started...", url);
    if (url.indexOf(REDIRECT_URL) === 0) {
      console.log("loading recirect url");
      const search = url.substring(REDIRECT_URL.length);
      const urlParams = new URLSearchParams(search);
      const code = urlParams.get("code");
      this.inAppBrowserRef.close();
      this.onSuccess(code);
    }
  }

  // on successful login
  async onSuccess(code) {
    console.log("onSuccess called, code is: ", code);
    try {
      // if code is blank then exit
      if (!code) {
        return;
      }

      // call service to get accessToken, refreshToken and user details   
      // set in the locastorage
      let bh = await this.userService.getTokenFromCode(code);
      this.setTokensNUserLocalStorage(bh);
      this.checkIfHRAdmn();
    } catch (err) {
      console.error(err);
    }
  }

  async checkIfHRAdmn() {
    console.log('checkIfHRAdmn')
    // call service to check if the user is a hradmin or not
    // if HRAdmin then we move to the optionpage
    let email = window.localStorage.getItem("email");
    let bh = await this.hrmailService.verifyEmail(email);
    if (
      bh &&
      bh.local &&
      bh.local.result &&
      bh.local.result.Authorized == "true"
    ) {
      this._zone.run(() => {
        this.router.navigate(["/optionpage"]);
      });
      return;
    }
    // if the user is not HR Admin then check for employee
    this.checkIfUserSubmittedData();
  }


  async checkIfUserSubmittedData() {
    console.log('checkIfUserSubmittedData')
    // ------------------- FIX: 4261 ------------------
    // check if user has submitted data for the day
    // Note: for employee we check if the user has submitted data for the day already
    // if yes we redirect to thank you page, otherwise redirect to landingpage
    let email = window.localStorage.getItem("email");
    let bh = await this.userService.getIfUserSubmitted(email);
    console.log(bh);
    let hasSubmitted = "no";
    let colorCode = "green";
    if (bh.local && bh.local.result) {
      hasSubmitted = bh.local.result.updated;
      colorCode = bh.local.result.colorCode;
    }
    // save the colorCode in localStorage
    window.localStorage.setItem("colorCode", colorCode);
    if (hasSubmitted === "yes" || hasSubmitted === "Yes") {
      this._zone.run(() => {
        this.router.navigate(["/thankyou"]);
      });
      return;
    }

    //If none of the above condition is true then we
    // redirect to confirmDetails page as usual
    this._zone.run(() => {
      this.router.navigate(["/confirmdetails"]);
    });
  }


  // set user details and tokens in localstorage
  setTokensNUserLocalStorage(bh) {
    console.log('setTokensNUserLocalStorage')
    if (bh.local && bh.local.result) {
      console.log(bh.local.result);
      window.localStorage.setItem("accessToken", bh.local.result.accessToken);
      window.localStorage.setItem("refreshToken", bh.local.result.refreshToken);
      window.localStorage.setItem("email", bh.local.result.user.email);
      window.localStorage.setItem("username", bh.local.result.user.email);
      window.localStorage.setItem("firstName", bh.local.result.user.firstName);
      window.localStorage.setItem("lastName", bh.local.result.user.lastName);
      window.localStorage.setItem("location", bh.local.result.user.location);
      window.localStorage.setItem("phone", bh.local.result.user.phone.replace(' ', '')); // phone number received from AD contains space
      this.masterdata.email = bh.local.result.user.email;
    }
  }

  // subscribe to msal broadcast event
  subscribeToMsal() {
    // if it is mobile app then we don't subscribe
    if(this.isMobileApp){
      return;
    }
    console.log('subscribeToMsal')
    this.broadcastService.subscribe("msal:loginSuccess", this.onLoginSuccess);
  }

  async onLoginSuccess(payload){
    console.log("login success");
    console.log(payload);
    await this.getProfile();
    await this.checkIfHRAdmn();
  }



  async checkAccount() {
    console.log("check Account");
    if (this.isMobileApp) {
      return;
    }

    // when opened from browser
    // for non employee flow the url contains the string /landpage
    if (document.URL.indexOf("/landpage") > 0) {
      return;
    }

    this.isEmpLoggedIn = !!this.authService.getAccount();
  }

  loginEmp() {
    console.log("loginEmp");
    this.authService.loginPopup();
  }


  async getProfile() {
    console.log("getProfile");
    const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";
    const tokenResponse = await this.authService.acquireTokenSilent({
      scopes: ["user.read"],
    });
    console.log(tokenResponse);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenResponse.accessToken,
    });

    const profile: any = await this.http
      .get(graphMeEndpoint, { headers })
      .toPromise();

    console.log(profile);

    window.localStorage.setItem("email", profile.mail);
    window.localStorage.setItem("username", profile.mail);
    window.localStorage.setItem("username", profile.mail);
    window.localStorage.setItem("firstName", profile.givenName);
    window.localStorage.setItem("lastName", profile.surname);
    window.localStorage.setItem("location", profile.officeLocation);
    window.localStorage.setItem("phone", profile.mobilePhone.replace(" ", "")); // phone number received from AD contains space
    this.masterdata.email = profile.mail;
  }  

}





    // //when user selects lets starts button
    // async letStart() {
    //   console.log("Lets Starts is working");
    //   let accessToken = window.localStorage.getItem("accessToken");
    //   let refreshToken = window.localStorage.getItem("refreshToken");
  
    //   this.showSpinner = true;
  
    //   console.log({ accessToken, refreshToken });
  
    //   // if accessToken and refreshToken already present in the localstorage
    //   // that means user has logged in before
    //   // we will call Azure API and get new tokens using the old ones
    //   // if the tokens are still valid then we will get new pair of tokens
    //   // otherwise we will show the login screen again
    //   if (accessToken && refreshToken) {
    //     try {
    //       console.log("trying to call refreshToken", refreshToken);
    //       const bh = await this.userService.getNewTokens(refreshToken);
    //       console.log(bh);
    //       // if we received new tokens then we auto login and directly
    //       // redirect to confirmDetails page
    //       if (bh && bh.local && bh.local.result && bh.local.result.accessToken) {
    //         this.setTokensNUserLocalStorage(bh);
            
    //       // call service to check if the user is a hradmin or not
    //           let email = bh.local.result.user.email
    //           console.log({email})
    //           let dt = await this.hrmailService.verifyEmail(email)
    //           let pagename = '/confirmdetails'
    //           if(dt && dt.local && dt.local.result && dt.local.result.Authorized == 'true'){
    //               pagename = "/optionpage";
    //           }
    //           this.router.navigate([pagename]);
    //         return;
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
  
    //   // otherwise we show login screen for user to login
    //   this.showLoginScreen();
    // }


  //     // show the microsoft login window
  // showLoginScreen() {
  //   const CLIENT_ID = this.systemService.getVal('azureClientID');
  //   const AUTH_URL = this.systemService.getVal('azureAuthURL');
  //   const REDIRECT_URL = this.systemService.getVal('redirectURL');
  //   const SCOPE = this.systemService.getVal('azureScopes');
  //   const RESPONSE_TYPE = this.systemService.getVal('azureResponseType');
  //   const loginUrl = `${AUTH_URL}?redirect_uri=${REDIRECT_URL}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}`;

  //   // if document URL is starting with http then it is opened from browser
  //   // otherwise from mobile
  //   if (document.URL.indexOf("http") === 0) {
  //     console.log("From browser");
  //     // for non employee flow the url contains the string /landpage
  //     // route to personalinfo in that case
  //     if (document.URL.indexOf("/landpage") > 0) {
  //       this.router.navigate(["/personalinfo"]);
  //     } 
  //   } else {
  //     console.log("From mobile");
  //     // keep the reference of this so that can be used from the event listener callback
  //     const options = "location=no,clearcache=yes,cleardata=yes";
  //     const target = "_blank";
  //     this.inAppBrowserRef = cordova.InAppBrowser.open(
  //       loginUrl,
  //       target,
  //       options
  //     );

  //     // register the loadstart event listener
  //     this.inAppBrowserRef.addEventListener(
  //       "loadstart",
  //       this.onLoadStartCallback
  //     );
  //   }
  // }