/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NLocalStorageService } from "neutrinos-seed-services";


@Injectable()
export class logoutService {
    constructor(private router: Router, public nLocalStorage: NLocalStorageService) { }

    logout() {
    this.nLocalStorage.clearLocalStorage();
    this.router.navigate(['/landingpage']);
    } 
}
