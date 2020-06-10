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
export class hrmailverifier {
  constructor(
    private sdService: SDBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  //   service flows_hrmailverifier

  public async verifyEmail(email: any = undefined, jwtToken = '', ...others) {
    let bh = {
      input: { email: email, jwtToken: jwtToken },
      local: { apiURL: undefined, result: undefined, token_key: 'jwtToken' }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_wLTtgZk5nDHcudhs(bh);
      //appendnew_next_verifyEmail
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
      return await this.errorHandler(bh, e, 'sd_r7DmcKt0D0fvtAUr');
    }
  }
  //appendnew_flow_hrmailverifier_Start

  async sd_wLTtgZk5nDHcudhs(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/admin?email=${bh.input.email}`;

      bh.local.headers = {
        Authorization: bh.input.jwtToken
      };

      bh = await this.sd_i08KsUu1AjUUxyYK(bh);
      //appendnew_next_sd_wLTtgZk5nDHcudhs
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_wLTtgZk5nDHcudhs');
    }
  }
  async sd_i08KsUu1AjUUxyYK(bh) {
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
      this.sd_r7yd10rK3zR6QVqO(bh);
      //appendnew_next_sd_i08KsUu1AjUUxyYK
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_i08KsUu1AjUUxyYK');
    }
  }
  async sd_r7yd10rK3zR6QVqO(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh);

      //appendnew_next_sd_r7yd10rK3zR6QVqO
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_r7yd10rK3zR6QVqO');
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
  //appendnew_flow_hrmailverifier_Catch
}
