import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
export class NLocaleResource {
//DEFAULT_LANGUAGE
    defaultLcid;
    locale = {};
    localeSubject = new Subject<any>();
    $localeSub;
    httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    constructor(
    ) {
        if (!this.defaultLcid) {
            this.defaultLcid = "en";
        }
        this.$localeSub = this.localeSubject.asObservable();
    }

    async getLang() {
        let result;
        result = await this.getlanguageResource(this.defaultLcid);
        return result;
    }

    /**
     * 
     * @param lcid 
     * Reads resource object based on lcid and  
     */
    private getlanguageResource(lcid) {
        return new Promise((resolve, reject) => {
            this.getLangResObj(lcid).then(resObj => {
                return resolve(this.constructBundle(resObj['properties']));
            }).catch(error => {
                return reject(error);
            });

        });
    }

    /**
     * 
     * @param lang 
     * @param key 
     * 
     * Returns value based on lcid and key
     */

    getVal(lcid, key) {
        return this.getLangResObj(lcid).then(resObj => {
            return (resObj[key]);
        });
    }

    /**
     * 
     * @param lcid 
     * @param callback 
     * 
     * Reads and returns the resource object based on the lcid 
     */
    private getLangResObj(lcid) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(`locales/locale_${lcid}.json`).subscribe(r => {
                resolve(r);   
            }, error => {
                if (error && error.status == 404) {
                    console.error(` locale file for language ${lcid} not found`);
                    } else {
                     console.error(error.error);
                    }
                    return reject(error);
            });
        });
    }

    /**
     * 
     * @param resourceObj object
     * Adds key and value pair into 'this'
     */
    private constructBundle(resourceObj) {
        var keys = Object.keys(resourceObj);
        for (let att = 0; att < keys.length; att++) {
            this.locale[keys[att]] = resourceObj[keys[att]]
        }
        this.localeSubject.next(this.locale);
        return this.locale;
    }

    /**
     * returns user selected language
     */
    get language() {
        return this.defaultLcid;
    }

    /**
     * set the user selected language and updates the resource object based on user selected language
     */
    set language(lcid) {
        this.getLocales().then(localesObj => {
            if (localesObj[lcid]) {
                this.defaultLcid = lcid;
                this.getlanguageResource(lcid);
            }
            else {
                this.locale = {};
                this.localeSubject.next();
                console.error(` locale ${lcid} is not valid`);
            }
        });
    }

    /**
     * return locales list created by developer
     */

    getLocales() {
        return new Promise((resolve, reject) => {
            return this.httpClient.get('locales/locales.json').subscribe( r => {
                return resolve(r);
            },
            error => {
                console.error(error.error);
              return reject(error);
            });

        });
    }

}
