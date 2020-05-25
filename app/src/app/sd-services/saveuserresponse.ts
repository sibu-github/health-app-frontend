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

  public async getLocations(...others) {
    let bh = { input: {}, local: { result: undefined } };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_chnzbvsmBYvG8poP(bh);
      //appendnew_next_getLocations
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
      return await this.errorHandler(bh, e, 'sd_KvTvemnknfk5F5U8');
    }
  }
  //appendnew_flow_saveuserresponse_Start

  async sd_p4EvIXbAOEeVOVuZ(bh) {
    try {
      bh.local.apiUrl = `${bh.system.environment.properties.ssdURL}/api/userResponse`;
      bh = await this.sd_yHzOyr3hOiBVBVi3(bh);
      //appendnew_next_sd_p4EvIXbAOEeVOVuZ
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_p4EvIXbAOEeVOVuZ');
    }
  }
  async sd_yHzOyr3hOiBVBVi3(bh) {
    try {
      console.log('httpformdata', bh.input.formdata);
      bh = await this.sd_FcFvtFytCkN7uU9N(bh);
      //appendnew_next_sd_yHzOyr3hOiBVBVi3
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_yHzOyr3hOiBVBVi3');
    }
  }
  async sd_FcFvtFytCkN7uU9N(bh) {
    try {
      let requestOptions = {
        url: bh.local.apiUrl,
        method: 'post',
        responseType: 'json',
        reportProgress: undefined,
        headers: {},
        params: {},
        body: bh.input.formdata
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      this.sd_xpG8uIqE7dWEgS0F(bh);
      //appendnew_next_sd_FcFvtFytCkN7uU9N
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_FcFvtFytCkN7uU9N');
    }
  }
  async sd_xpG8uIqE7dWEgS0F(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh);

      //appendnew_next_sd_xpG8uIqE7dWEgS0F
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_xpG8uIqE7dWEgS0F');
    }
  }
  async sd_edbqgcUOheevvEDW(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.error);

      //appendnew_next_sd_edbqgcUOheevvEDW
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_edbqgcUOheevvEDW');
    }
  }
  async sd_pqpa2i6ZNAJjfwpC(bh) {
    try {
      this.matSnackBar.open('Error at Backend', '', {
        duration: 3000,
        direction: 'ltr',
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      //appendnew_next_sd_pqpa2i6ZNAJjfwpC
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_pqpa2i6ZNAJjfwpC');
    }
  }
  async sd_chnzbvsmBYvG8poP(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/getlocation`;
      bh = await this.sd_CrsIy7P6IOcKj3sX(bh);
      //appendnew_next_sd_chnzbvsmBYvG8poP
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_chnzbvsmBYvG8poP');
    }
  }
  async sd_CrsIy7P6IOcKj3sX(bh) {
    try {
      let requestOptions = {
        url: bh.local.apiURL,
        method: 'get',
        responseType: 'json',
        reportProgress: undefined,
        headers: {},
        params: {},
        body: undefined
      };
      bh.local.result = await this.sdService.nHttpRequest(requestOptions);
      this.sd_i2UZMf57vKvaRxeM(bh);
      //appendnew_next_sd_CrsIy7P6IOcKj3sX
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_CrsIy7P6IOcKj3sX');
    }
  }
  async sd_i2UZMf57vKvaRxeM(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_i2UZMf57vKvaRxeM
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_i2UZMf57vKvaRxeM');
    }
  }
  //appendnew_node

  async errorHandler(bh, e, src) {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;

    if (
      false ||
      (await this.sd_JvVnSwB12u0QvrzM(bh))
      /*appendnew_next_Catch*/
    ) {
      return bh;
    } else {
      throw e;
    }
  }

  async sd_JvVnSwB12u0QvrzM(bh) {
    this.sd_edbqgcUOheevvEDW(bh);
    bh = await this.sd_pqpa2i6ZNAJjfwpC(bh);
    //appendnew_next_sd_JvVnSwB12u0QvrzM
    return true;
  }

  //appendnew_flow_saveuserresponse_Catch
}
