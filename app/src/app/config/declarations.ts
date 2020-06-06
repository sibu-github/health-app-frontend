import { NeutrinosAuthGuardService } from "neutrinos-oauth-client";
import { PageNotFoundComponent } from "../not-found.component";
import { LayoutComponent } from "../layout/layout.component";
import { ImgSrcDirective } from "../directives/imgSrc.directive";
import { APP_INITIALIZER } from "@angular/core";
import { NDataSourceService } from "../n-services/n-dataSorce.service";
import { environment } from "../../environments/environment";
import { NMapComponent } from "../n-components/nMapComponent/n-map.component";
import { NLocaleResource } from "../n-services/n-localeResources.service";
import { NAuthGuardService } from "neutrinos-seed-services";
import { ArtImgSrcDirective } from "../directives/artImgSrc.directive";

/**
 * for azure ad integration for login functionality
 */
import { MsalInterceptor } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

window["neutrinos"] = {
  environments: environment,
};

//CORE_REFERENCE_IMPORTS
//CORE_REFERENCE_IMPORT-testComponent
import { testComponent } from "../components/testComponent/test.component";
//CORE_REFERENCE_IMPORT-hroptionComponent
import { hroptionComponent } from "../components/hroptionComponent/hroption.component";
//CORE_REFERENCE_IMPORT-logoComponent
import { logoComponent } from "../components/logoComponent/logo.component";
//CORE_REFERENCE_IMPORT-masterdataService
import { masterdataService } from "../services/masterdata/masterdata.service";
//CORE_REFERENCE_IMPORT-healthinfonextComponent
import { healthinfonextComponent } from "../components/healthinfonextComponent/healthinfonext.component";
//CORE_REFERENCE_IMPORT-contactinformationComponent
import { contactinformationComponent } from "../components/contactinformationComponent/contactinformation.component";
//CORE_REFERENCE_IMPORT-confirmdetailsComponent
import { confirmdetailsComponent } from "../components/confirmdetailsComponent/confirmdetails.component";
//CORE_REFERENCE_IMPORT-certifyinformationComponent
import { certifyinformationComponent } from "../components/certifyinformationComponent/certifyinformation.component";
//CORE_REFERENCE_IMPORT-datasharingService
import { datasharingService } from "../services/datasharing/datasharing.service";
//CORE_REFERENCE_IMPORT-pageinformationComponent
import { pageinformationComponent } from "../components/pageinformationComponent/pageinformation.component";
//CORE_REFERENCE_IMPORT-languageService
import { languageService } from "../services/language/language.service";
//CORE_REFERENCE_IMPORT-splashComponent
import { splashComponent } from "../components/splashComponent/splash.component";
//CORE_REFERENCE_IMPORT-loginComponent
import { loginComponent } from "../components/loginComponent/login.component";
//CORE_REFERENCE_IMPORT-thankyouComponent
import { thankyouComponent } from "../components/thankyouComponent/thankyou.component";
//CORE_REFERENCE_IMPORT-healthinfoComponent
import { healthinfoComponent } from "../components/healthinfoComponent/healthinfo.component";
//CORE_REFERENCE_IMPORT-landingpageComponent
import { landingpageComponent } from "../components/landingpageComponent/landingpage.component";
//CORE_REFERENCE_IMPORT-hrdashboardComponent
import { hrdashboardComponent } from "../components/hrdashboardComponent/hrdashboard.component";
//CORE_REFERENCE_IMPORT-hrloginComponent
import { hrloginComponent } from "../components/hrloginComponent/hrlogin.component";
//CORE_REFERENCE_IMPORT-homeComponent
import { homeComponent } from "../components/homeComponent/home.component";

/**
 * Reads datasource object and injects the datasource object into window object
 * Injects the imported environment object into the window object
 *
 */
export function startupServiceFactory(startupService: NDataSourceService) {
  return () => startupService.getDataSource();
}

/**
 *bootstrap for @NgModule
 */
export const appBootstrap: any = [LayoutComponent];

/**
 *Entry Components for @NgModule
 */
export const appEntryComponents: any = [
  //CORE_REFERENCE_PUSH_TO_ENTRY_ARRAY
];

/**
 *declarations for @NgModule
 */
export const appDeclarations = [
  ImgSrcDirective,
  LayoutComponent,
  PageNotFoundComponent,
  NMapComponent,
  ArtImgSrcDirective,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-testComponent
  testComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-hroptionComponent
  hroptionComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-logoComponent
  logoComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-healthinfonextComponent
  healthinfonextComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-contactinformationComponent
  contactinformationComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-confirmdetailsComponent
  confirmdetailsComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-certifyinformationComponent
  certifyinformationComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-pageinformationComponent
  pageinformationComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-splashComponent
  splashComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-loginComponent
  loginComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-thankyouComponent
  thankyouComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-healthinfoComponent
  healthinfoComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-landingpageComponent
  landingpageComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-hrdashboardComponent
  hrdashboardComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-hrloginComponent
  hrloginComponent,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY-homeComponent
  homeComponent,
];

/**
 * provider for @NgModuke
 */
export const appProviders = [
  NDataSourceService,
  NLocaleResource,
  {
    // Provider for APP_INITIALIZER
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [NDataSourceService],
    multi: true,
  },
  NAuthGuardService,
  //CORE_REFERENCE_PUSH_TO_PRO_ARRAY
  //CORE_REFERENCE_PUSH_TO_PRO_ARRAY-masterdataService
  masterdataService,
  //CORE_REFERENCE_PUSH_TO_PRO_ARRAY-datasharingService
  datasharingService,
  //CORE_REFERENCE_PUSH_TO_PRO_ARRAY-languageService
  languageService,
  // for azure ad integration for login functionality
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: MsalInterceptor,
  //   multi: true,
  // },
];

/**
 * Routes available for bApp
 */

// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_START
export const appRoutes = [
  { path: "home", component: homeComponent },
  { path: "hrlogin", component: hrloginComponent },
  { path: "hrdashboard", component: hrdashboardComponent },
  { path: "landingpage", component: landingpageComponent },
  { path: "healthinfo", component: healthinfoComponent },
  { path: "thankyou", component: thankyouComponent },
  { path: "login", component: loginComponent },
  { path: "splash", component: splashComponent },
  { path: "personalinfo", component: pageinformationComponent },
  { path: "contactinfo", component: contactinformationComponent },
  { path: "certifyinfo", component: certifyinformationComponent },
  { path: "confirmdetails", component: confirmdetailsComponent },
  { path: "hinfonext", component: healthinfonextComponent, children: [] },
  { path: "landpage", component: landingpageComponent },
  { path: "optionpage", component: hroptionComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];
// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_END
