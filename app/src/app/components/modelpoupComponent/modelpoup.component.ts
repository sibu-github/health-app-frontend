/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, Output, Inject } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'bh-modelpoup',
    templateUrl: './modelpoup.template.html'
})

export class modelpoupComponent extends NBaseComponent implements OnInit {
    versionData: any ={};

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

        super();
    }

    ngOnInit() {
        this.versionData = this.data.versionData;
        console.log("versionData in model popup--------",  this.versionData);
    }

}
