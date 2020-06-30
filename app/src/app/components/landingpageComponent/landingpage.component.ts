/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, AfterViewInit, NgZone } from "@angular/core";
import { NBaseComponent } from "../../../../../app/baseClasses/nBase.component";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NSystemService } from "neutrinos-seed-services";
import { masterdataService } from "../../services/masterdata/masterdata.service";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { hrmailverifier } from "app/sd-services/hrmailverifier";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { MatDialog } from "@angular/material/dialog";
import { NLocalStorageService } from "neutrinos-seed-services";
import { MatSnackBar } from "@angular/material";

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
  public defaultlang: string = "en";
  public showSpinner: boolean = false;
  public isMobileApp: boolean = false;
  public isEmpLoggedIn: boolean = false;

  // list all languages to be shown in the language selection drop down
  languages: any[] = [
    { value: "en", viewValue: "English" },
    { value: "es", viewValue: "Español" },
    { value: "de", viewValue: "Deutsche" },
    { value: "pt", viewValue: "Português" },
    { value: "ko", viewValue: "한국어" },
    { value: "th", viewValue: "ไทย" },
    { value: "zh-CN", viewValue: "中文（普通话)" },
    {value:"ur",viewValue:"اردو"}
  ];
  selectedObjects: any[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private masterdata: masterdataService,
    private userService: saveuserresponse,
    private hrmailService: hrmailverifier,
    private snackBar: MatSnackBar,
    private _zone: NgZone,
    private http: HttpClient,
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private nLocalStorage: NLocalStorageService
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
    let language = this.nLocalStorage.getValue("language");
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
          this.nLocalStorage.setValue("jwtToken", `Bearer ${jwtToken}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  //when user selects language, goes into below fun
  languageSelect({ value }) {
    this.nLocalStorage.setValue("language", value);
    this.localeService.language = value;
  }

  //when user selects lets starts button
  async letStart() {
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
    let accessToken = this.nLocalStorage.getValue("accessToken");
    let refreshToken = this.nLocalStorage.getValue("refreshToken");
    this.showSpinner = true;

    // if accessToken and refreshToken already present in the localstorage
    // that means user has logged in before
    // we will call Azure API and get new tokens using the old ones
    // if the tokens are still valid then we will get new pair of tokens
    // otherwise we will show the login screen again
    if (accessToken && refreshToken) {
      try {
        const bh = await this.userService.getNewTokens(refreshToken);
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
    this.inAppBrowserRef.addEventListener(
      "loadstart",
      this.onLoadStartCallback
    );
  }

  // callback for loadstart event inappbrowser
  onLoadStartCallback({ url }) {
    const REDIRECT_URL = this.systemService.getVal("redirectURL");
    if (url.indexOf(REDIRECT_URL) === 0) {
      const search = url.substring(REDIRECT_URL.length);
      const urlParams = new URLSearchParams(search);
      const code = urlParams.get("code");
      this.inAppBrowserRef.close();
      this.onSuccess(code);
    }
  }

  // on successful login
  async onSuccess(code) {
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
    // call service to check if the user is a hradmin or not
    // if HRAdmin then we move to the optionpage
    let email = this.nLocalStorage.getValue("email");
    let jwtToken = this.nLocalStorage.getValue("jwtToken");
    let bh = await this.hrmailService.verifyEmail(email, jwtToken);
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
    // ------------------- FIX: 4261 ------------------
    // check if user has submitted data for the day
    // Note: for employee we check if the user has submitted data for the day already
    // if yes we redirect to thank you page, otherwise redirect to landingpage
    let email = this.nLocalStorage.getValue("email");
    let jwtToken = this.nLocalStorage.getValue("jwtToken");
    let bh = await this.userService.getIfUserSubmitted(email, jwtToken);
    let hasSubmitted = "no";
    let colorCode = "green";
    if (bh.local && bh.local.result) {
      hasSubmitted = bh.local.result.updated;
      colorCode = bh.local.result.colorCode;
    }
    // save the colorCode in localStorage
    this.nLocalStorage.setValue("colorCode", colorCode);
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
    if (bh.local && bh.local.result) {
      this.nLocalStorage.setValue("accessToken", bh.local.result.accessToken);
      this.nLocalStorage.setValue("refreshToken", bh.local.result.refreshToken);
      this.nLocalStorage.setValue("email", bh.local.result.user.email);
      this.nLocalStorage.setValue("username", bh.local.result.user.email);
      this.nLocalStorage.setValue("firstName", bh.local.result.user.firstName);
      this.nLocalStorage.setValue("lastName", bh.local.result.user.lastName);
      this.nLocalStorage.setValue("location", bh.local.result.user.location);
      this.nLocalStorage.setValue(
        "phone",
        bh.local.result.user.phone.replace(" ", "")
      ); // phone number received from AD contains space
      this.masterdata.email = bh.local.result.user.email;
    }
  }

  // subscribe to msal broadcast event
  subscribeToMsal() {
    // if it is mobile app then we don't subscribe
    if (this.isMobileApp) {
      return;
    }
    this.broadcastService.subscribe("msal:loginSuccess", this.onLoginSuccess);
    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      this.showSpinner = false;
      if (payload["_error"]) {
        this.snackBar.open(this.locales["closeError"], "Ok");
      }
    });
  }

  async onLoginSuccess(payload) {
    this.masterdata.isHR = true;
    await this.getProfile();
    await this.checkIfHRAdmn();
  }

  async checkAccount() {
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
    this.authService.loginPopup();
  }

  async getProfile() {
    const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";
    const tokenResponse = await this.authService.acquireTokenSilent({
      scopes: ["user.read"],
    });
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenResponse.accessToken,
    });

    const profile: any = await this.http
      .get(graphMeEndpoint, { headers })
      .toPromise();

    this.nLocalStorage.setValue("email", profile.mail);
    this.nLocalStorage.setValue("username", profile.mail);
    this.nLocalStorage.setValue("username", profile.mail);
    this.nLocalStorage.setValue("firstName", profile.givenName);
    this.nLocalStorage.setValue("lastName", profile.surname);
    this.nLocalStorage.setValue("location", profile.officeLocation);
    this.nLocalStorage.setValue("phone", profile.mobilePhone.replace(" ", "")); // phone number received from AD contains space
    this.masterdata.email = profile.mail;
  }
}
