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
export class hrdashboard {
  constructor(
    private sdService: SDBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  //   service flows_hrdashboard

  public async hrDashboard(body: any = undefined, jwtToken = '', ...others) {
    let bh = {
      input: { body: body, jwtToken: jwtToken },
      local: { result: undefined, apiURL: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_kamBbrZpnMvR8rdb(bh);
      //appendnew_next_hrDashboard
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
      return await this.errorHandler(bh, e, 'sd_Jztg3nB5PDL8fsTd');
    }
  }
  //appendnew_flow_hrdashboard_Start

  async sd_kamBbrZpnMvR8rdb(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/dashboard`;

      const jwtToken = bh.input.jwtToken;
      bh.local.headers = {
        Authorization: jwtToken
      };
      bh = await this.sd_WgjyYUaFO0rOcUFb(bh);
      //appendnew_next_sd_kamBbrZpnMvR8rdb
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_kamBbrZpnMvR8rdb');
    }
  }
  async sd_WgjyYUaFO0rOcUFb(bh) {
    try {
      let requestOptions = {
        url: bh.local.apiURL,
        method: 'post',
        responseType: 'json',
        reportProgress: undefined,
        headers: bh.local.headers,
        params: {},
        body: bh.input.body
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      //appendnew_next_sd_WgjyYUaFO0rOcUFb
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_WgjyYUaFO0rOcUFb');
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
  //appendnew_flow_hrdashboard_Catch
}
