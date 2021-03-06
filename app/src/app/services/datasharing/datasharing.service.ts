/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class datasharingService {
  usertypes: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getusertypes() {
    // sample json data
    return (this.usertypes = [
      {
        type: "Vendor",
      },
      {
        type: "Customer",
      },
      {
        type: "Visitor",
      },
      {
        type: "Employee",
      },
    ]);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ["bar-color"],
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
