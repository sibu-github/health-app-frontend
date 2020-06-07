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

  public async getIfUserSubmitted(email = '', apiURL = '', ...others) {
    let bh = {
      input: { email: email, apiURL: apiURL },
      local: { result: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_Og123zKXVRzX2ldq(bh);
      //appendnew_next_getIfUserSubmitted
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
      return await this.errorHandler(bh, e, 'sd_UT6P090uRaDXp7Bs');
    }
  }

  public async getTokenFromCode(authCode = '', apiURL = '', ...others) {
    let bh = {
      input: { authCode: authCode, apiURL: apiURL },
      local: { result: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_dSeRMJ9WXtUgRhgs(bh);
      //appendnew_next_getTokenFromCode
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
      return await this.errorHandler(bh, e, 'sd_qCRbvPMFiNOH7zzr');
    }
  }

  public async getNewTokens(refreshToken = '', apiURL = '', ...others) {
    let bh = {
      input: { refreshToken: refreshToken, apiURL: apiURL },
      local: { result: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_5g1JuQUdOxhsYmxt(bh);
      //appendnew_next_getNewTokens
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
      return await this.errorHandler(bh, e, 'sd_T99l5q5gM9f8vrCK');
    }
  }

  public async getJWT(...others) {
    let bh = { input: {}, local: { apiURL: '', result: undefined } };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_rSSMnXmptoPq7M9Q(bh);
      //appendnew_next_getJWT
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
      return await this.errorHandler(bh, e, 'sd_hZ7kAZFKxtbPLYxS');
    }
  }

  public async getLangLocations(language: any = undefined, ...others) {
    let bh = {
      input: { language: language },
      local: { apiURL: undefined, result: undefined }
    };
    try {
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_noG5IjP85Vi32fjp(bh);
      //appendnew_next_getLangLocations
      //Start formatting output variables
      let outputVariables = {
        input: {},
        local: {
          apiURL: bh.local.apiURL,
          result: bh.local.result
        }
      };
      //End formatting output variables
      return outputVariables;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_qpGUjxSgRbcsTNJB');
    }
  }
  //appendnew_flow_saveuserresponse_Start

  async sd_p4EvIXbAOEeVOVuZ(bh) {
    try {
      bh.local.apiUrl = `${bh.system.environment.properties.ssdURL}/api/userResponse`;

      const jwtToken = window.localStorage.getItem('jwtToken');
      bh.local.headers = {
        Authorization: jwtToken
      };
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
        headers: bh.local.headers,
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
  async sd_chnzbvsmBYvG8poP(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/getlocation`;

      const jwtToken = window.localStorage.getItem('jwtToken');
      bh.local.headers = {
        Authorization: jwtToken
      };
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
        headers: bh.local.headers,
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
  async sd_Og123zKXVRzX2ldq(bh) {
    try {
      const email = bh.input.email;
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/userflag?email=${email}`;

      const jwtToken = window.localStorage.getItem('jwtToken');
      console.log('apiURL is ', bh.local.apiURL);
      console.log('token is ', jwtToken);

      bh.local.headers = {
        Authorization: jwtToken
      };
      bh = await this.sd_DIoisxysFNjLhDvY(bh);
      //appendnew_next_sd_Og123zKXVRzX2ldq
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_Og123zKXVRzX2ldq');
    }
  }
  async sd_DIoisxysFNjLhDvY(bh) {
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
      this.sd_OhLN2vw7EWihaLcR(bh);
      //appendnew_next_sd_DIoisxysFNjLhDvY
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_DIoisxysFNjLhDvY');
    }
  }
  async sd_OhLN2vw7EWihaLcR(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_OhLN2vw7EWihaLcR
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_OhLN2vw7EWihaLcR');
    }
  }
  async sd_dSeRMJ9WXtUgRhgs(bh) {
    try {
      const code = bh.input.authCode;
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/getToken?code=${code}`;
      bh = await this.sd_2UzkbppxpPiv9cll(bh);
      //appendnew_next_sd_dSeRMJ9WXtUgRhgs
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_dSeRMJ9WXtUgRhgs');
    }
  }
  async sd_2UzkbppxpPiv9cll(bh) {
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
      this.sd_jChj41xC9Yu5CC1V(bh);
      //appendnew_next_sd_2UzkbppxpPiv9cll
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_2UzkbppxpPiv9cll');
    }
  }
  async sd_jChj41xC9Yu5CC1V(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_jChj41xC9Yu5CC1V
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_jChj41xC9Yu5CC1V');
    }
  }
  async sd_5g1JuQUdOxhsYmxt(bh) {
    try {
      const refreshToken = bh.input.refreshToken;
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/getNewTokens?refreshToken=${refreshToken}`;

      bh = await this.sd_87BdheXEiwUyIEnE(bh);
      //appendnew_next_sd_5g1JuQUdOxhsYmxt
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_5g1JuQUdOxhsYmxt');
    }
  }
  async sd_87BdheXEiwUyIEnE(bh) {
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
      this.sd_YvPDbvTSCW4vRzYR(bh);
      //appendnew_next_sd_87BdheXEiwUyIEnE
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_87BdheXEiwUyIEnE');
    }
  }
  async sd_YvPDbvTSCW4vRzYR(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_YvPDbvTSCW4vRzYR
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_YvPDbvTSCW4vRzYR');
    }
  }
  async sd_rSSMnXmptoPq7M9Q(bh) {
    try {
      const refreshToken = bh.input.refreshToken;
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/generateJwtToken`;
      bh = await this.sd_fHgOvd8rOGF2t5Sc(bh);
      //appendnew_next_sd_rSSMnXmptoPq7M9Q
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_rSSMnXmptoPq7M9Q');
    }
  }
  async sd_fHgOvd8rOGF2t5Sc(bh) {
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
      this.sd_tQgpJA9E5zmnKKbI(bh);
      //appendnew_next_sd_fHgOvd8rOGF2t5Sc
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_fHgOvd8rOGF2t5Sc');
    }
  }
  async sd_tQgpJA9E5zmnKKbI(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_tQgpJA9E5zmnKKbI
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_tQgpJA9E5zmnKKbI');
    }
  }
  async sd_noG5IjP85Vi32fjp(bh) {
    try {
      bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/getlocation?languageKey=${bh.input.language}`;

      const jwtToken = window.localStorage.getItem('jwtToken');
      console.log('apiURL is ', bh.local.apiURL);
      console.log('token is ', jwtToken);
      bh.local.headers = {
        Authorization: jwtToken
      };

      // const email = bh.input.email
      // bh.local.apiURL = `${bh.system.environment.properties.ssdURL}/api/userflag?email=${email}`;

      // const jwtToken = window.localStorage.getItem('jwtToken')
      // console.log('apiURL is ', bh.local.apiURL)
      // console.log('token is ', jwtToken)

      // bh.local.headers = {
      //     Authorization: jwtToken
      // }
      bh = await this.sd_COZRHjE5lyeKw4j8(bh);
      //appendnew_next_sd_noG5IjP85Vi32fjp
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_noG5IjP85Vi32fjp');
    }
  }
  async sd_COZRHjE5lyeKw4j8(bh) {
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
      this.sd_kqtEUQ9XRAsHJAc2(bh);
      //appendnew_next_sd_COZRHjE5lyeKw4j8
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_COZRHjE5lyeKw4j8');
    }
  }
  async sd_kqtEUQ9XRAsHJAc2(bh) {
    try {
      console.log(new Date().toLocaleTimeString(), bh.local.result);

      //appendnew_next_sd_kqtEUQ9XRAsHJAc2
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_kqtEUQ9XRAsHJAc2');
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
    //appendnew_next_sd_JvVnSwB12u0QvrzM
    return true;
  }

  //appendnew_flow_saveuserresponse_Catch
}
