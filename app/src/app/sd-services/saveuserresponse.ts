/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
//CORE_REFERENCE_IMPORTS
import { SDBaseService } from '../../app/n-services/SDBaseService';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
//append_imports_start

//append_imports_end

declare const window: any;
declare const cordova: any;

@Injectable()
export class saveuserresponse {
  constructor(
    private sdService: SDBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  //   service flows_saveuserresponse

  public async saveUserData(formdata: any = undefined, ...others) {
    let bh = {
      input: { formdata: formdata },
      local: { result: undefined, apiUrl: '' }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_p4EvIXbAOEeVOVuZ(bh);
      //appendnew_next_saveUserData
      //Start formatting output variables
      let outputVariables = {
        input: {},
        local: {
          result: bh.local.result
        }
      };
      //End formatting output variables
      return outputVariables;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_kBgqCy1h0V1BXjSL');
    }
  }
  //appendnew_flow_saveuserresponse_Start

  async sd_p4EvIXbAOEeVOVuZ(bh) {
    try {
      bh.local.apiUrl = `${bh.system.environment.properties.ssdURL}}/api/userResponse`;
      bh = await this.sd_FcFvtFytCkN7uU9N(bh);
      //appendnew_next_sd_p4EvIXbAOEeVOVuZ
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_p4EvIXbAOEeVOVuZ');
    }
  }
  async sd_FcFvtFytCkN7uU9N(bh) {
    try {
      let requestOptions = {
        url: 'apiURL',
        method: 'get',
        responseType: 'json',
        reportProgress: undefined,
        headers: {},
        params: {},
        body: bh.input.formdata
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      //appendnew_next_sd_FcFvtFytCkN7uU9N
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_FcFvtFytCkN7uU9N');
    }
  }
  //appendnew_node

  async errorHandler(bh, e, src) {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;

    if (
      false
      /*appendnew_next_Catch*/
    ) {
      return bh;
    } else {
      throw e;
    }
  }
  //appendnew_flow_saveuserresponse_Catch
}
