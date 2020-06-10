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
export class userdetails {
  constructor(
    private sdService: SDBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  //   service flows_userdetails

  public async userDetails(data: any = undefined, jwtToken = '', ...others) {
    let bh = {
      input: { data: data, jwtToken: jwtToken },
      local: { result: undefined, apiURL: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_9sGvXKpcJuz4o6iA(bh);
      //appendnew_next_userDetails
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
      return await this.errorHandler(bh, e, 'sd_jATRPplELulU1IJj');
    }
  }

  public async getUserDetails(email = '', jwtToken = '', ...others) {
    let bh = {
      input: { email: email, jwtToken: jwtToken },
      local: { result: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_QkvuJtnZXL26ylEC(bh);
      //appendnew_next_getUserDetails
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
      return await this.errorHandler(bh, e, 'sd_F8kXV1H5BklAjGJT');
    }
  }
  //appendnew_flow_userdetails_Start

  async sd_9sGvXKpcJuz4o6iA(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/userinfo`;

      const jwtToken = bh.input.jwtToken;
      bh.local.headers = {
        Authorization: jwtToken
      };
      bh = await this.sd_b3dGX6U7nArDuByi(bh);
      //appendnew_next_sd_9sGvXKpcJuz4o6iA
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_9sGvXKpcJuz4o6iA');
    }
  }
  async sd_b3dGX6U7nArDuByi(bh) {
    try {
      let requestOptions = {
        url: bh.local.apiURL,
        method: 'post',
        responseType: 'json',
        reportProgress: undefined,
        headers: bh.local.headers,
        params: {},
        body: bh.input.data
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      this.sd_K3ODbZQfLJ4SsrAR(bh);
      //appendnew_next_sd_b3dGX6U7nArDuByi
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_b3dGX6U7nArDuByi');
    }
  }
  async sd_K3ODbZQfLJ4SsrAR(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh);

      //appendnew_next_sd_K3ODbZQfLJ4SsrAR
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_K3ODbZQfLJ4SsrAR');
    }
  }
  async sd_9bNLEihqbGQ8hBkz(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh);

      //appendnew_next_sd_9bNLEihqbGQ8hBkz
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_9bNLEihqbGQ8hBkz');
    }
  }
  async sd_QkvuJtnZXL26ylEC(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/userdetails?email=${bh.input.email}`;

      const jwtToken = bh.input.jwtToken;
      bh.local.headers = {
        Authorization: jwtToken
      };
      bh = await this.sd_W26Tgn4BzcQPGS3m(bh);
      //appendnew_next_sd_QkvuJtnZXL26ylEC
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_QkvuJtnZXL26ylEC');
    }
  }
  async sd_W26Tgn4BzcQPGS3m(bh) {
    try {
      let requestOptions = {
        url: bh.local.apiURL,
        method: 'get',
        responseType: 'json',
        reportProgress: undefined,
        headers: bh.local.headers,
        params: {},
        body: undefined
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      //appendnew_next_sd_W26Tgn4BzcQPGS3m
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_W26Tgn4BzcQPGS3m');
    }
  }
  //appendnew_node

  async errorHandler(bh, e, src) {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;

    if (
      false ||
      (await this.sd_fppaVeWTVfJkSBcU(bh))
      /*appendnew_next_Catch*/
    ) {
      return bh;
    } else {
      throw e;
    }
  }

  async sd_fppaVeWTVfJkSBcU(bh) {
    this.sd_9bNLEihqbGQ8hBkz(bh);
    //appendnew_next_sd_fppaVeWTVfJkSBcU
    return true;
  }

  //appendnew_flow_userdetails_Catch
}
