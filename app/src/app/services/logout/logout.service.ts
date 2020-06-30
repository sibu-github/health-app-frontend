/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NLocalStorageService } from "neutrinos-seed-services";
import {  MsalService } from "@azure/msal-angular";

@Injectable()
export class logoutService {
    constructor(private router: Router, private nLocalStorage: NLocalStorageService,private authService: MsalService,) { }

    logout() {
        this.authService.logout();
        this.nLocalStorage.clearLocalStorage();
        this.router.navigate(['/landingpage']);
    }
}
