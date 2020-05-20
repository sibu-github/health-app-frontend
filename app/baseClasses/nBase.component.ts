// Base component 
import { NDataModel } from './nDataModel.class';
import { NLocaleResource } from '../src/app/n-services/n-localeResources.service';
export class NBaseComponent {
    dm: NDataModel;
    localeService: NLocaleResource;
    locales :any = {};
    constructor() {
        this.dm = new NDataModel();
        this.localeService = new NLocaleResource ();
        this.localeService.$localeSub.subscribe(locales => {
            this.locales = locales;
        });
        this.localeService.getLang();
    }
}