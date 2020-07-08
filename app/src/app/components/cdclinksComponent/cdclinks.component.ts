/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { NSystemService } from "neutrinos-seed-services";
import { NLocalStorageService } from "neutrinos-seed-services";

/*
Client Service import Example:
import { servicename } from 'app/sd-services/servicename';
*/

/*
Legacy Service import Example :
import { HeroService } from '../../services/hero/hero.service';
*/

@Component({
    selector: 'bh-cdclinks',
    templateUrl: './cdclinks.template.html'
})

export class cdclinksComponent extends NBaseComponent implements OnInit {
    public isMobile:boolean = false;
    private systemService = NSystemService.getInstance();

    constructor(private nLocalStorage: NLocalStorageService) {
        super();

        this.updateLocaleLanguage()
        if (this.systemService.isAndroid() || this.systemService.isIOS()){
            this.isMobile = true;
        }
    }

  // get the previously selected language from local storage
  // set the language if selected,
  // by default set the language to English
  updateLocaleLanguage() {
    let language = this.nLocalStorage.getValue("language");
    if (language) {
      this.localeService.language = language;
    }
  }

  onChangeLanguage(language){
    if(language){
      this.localeService.language = language;
    }
  }



    ngOnInit() {

    }
}
