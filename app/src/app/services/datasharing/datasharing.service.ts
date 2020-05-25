/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class datasharingService {
locations:any;

    constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

       getlocationdata() {     
        // sample json data
        return this.locations = [
                    {
                    name:  "Tokyo12",
                    },
                    {
                    name: "Westchester",
                    },
                    {
                    name: "West Lane",
                    }
                ];
                console.log("location name", this.locations[0].name);
        }

    openSnackBar(message: string, action: string){
        this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['bar-color'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
        });
    }
}
