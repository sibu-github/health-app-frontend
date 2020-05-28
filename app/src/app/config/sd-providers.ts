import { SDBaseService } from 'app/n-services/SDBaseService';
//CORE_REFERENCE_IMPORTS
//CORE_REFERENCE_IMPORT-hrdashboard
import { hrdashboard } from '../sd-services/hrdashboard';
//CORE_REFERENCE_IMPORT-userdetails
import { userdetails } from '../sd-services/userdetails';
//CORE_REFERENCE_IMPORT-saveuserresponse
import { saveuserresponse } from '../sd-services/saveuserresponse';

export const sdProviders = [
  SDBaseService,
  //CORE_REFERENCE_PUSH_TO_SD_ARRAY
  //CORE_REFERENCE_PUSH_TO_SD_ARRAY-hrdashboard
  hrdashboard,
  //CORE_REFERENCE_PUSH_TO_SD_ARRAY-userdetails
  userdetails,
  //CORE_REFERENCE_PUSH_TO_SD_ARRAY-saveuserresponse
  saveuserresponse
];
