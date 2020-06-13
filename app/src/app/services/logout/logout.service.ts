/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class logoutService {
    constructor(private router: Router) { }

    logout() {
        console.log('called');
        this.router.navigate(['/landpage']);
    }
}
