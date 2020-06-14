/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { saveuserresponse } from "app/sd-services/saveuserresponse";
import { NLocalStorageService } from "neutrinos-seed-services";
@Injectable()
export class masterdataService {
  public username: string;

  isHR = false;
  public password: string;
  public answer1: string;
  public answer2: string;
  public answer3: string;
  public questionId: string;
  public questionId2: string;
  public questionId3: string;
  public certifyInfoName: string;
  public certifyInfoChecked: string;
  public locationName: string;
  public phone: string;
  public shortTextOne: string;
  public shortTextTwo: string;
  public shortTextThree: string;
  public addlInfo: string;
  public firstName: string;
  public lastName: string;
  public locationNameTwo: string;
  public userType: string;
  public email: string;
  public company: string;
  public ingredionContact: string;
  public buildingNo: string;
  public floorNo: string;
  public sectionNo: string;
  public cubeNo: string;
  // creating serverurl variable we can define it env.json and access here

  constructor(
    private http: HttpClient,
    private saveuserService: saveuserresponse,
    private nLocalStorage: NLocalStorageService
  ) {}

  async userSubmit() {
    let answer1 = this.answer1;
    let answer2 = this.answer2;
    let answer3 = this.answer3;
    let UpdatedlocationName = this.locationName;
    let UcertifyInfoName = this.certifyInfoName;
    let UcertifyInfoCheck = this.certifyInfoChecked;

    try {
      let formdata = {
        type: this.userType,
        locationName: this.locationName,
        email: this.email || this.nLocalStorage.getValue('email'),
        phone: this.nLocalStorage.getValue("phone"),
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        ingredionContact: this.ingredionContact,
        certifyInfoName: this.certifyInfoName,
        certifyInfoChecked: this.certifyInfoChecked,
        buildingNo: this.buildingNo,
        floorNo: this.floorNo,
        cubeNo: this.cubeNo,
        response: [
          {
            questionId: this.questionId,
            answer: this.answer1,
            shortText: this.shortTextOne,
          },
          {
            questionId: this.questionId2,
            answer: this.answer2,
            shortText: this.shortTextTwo,
          },
          {
            questionId: this.questionId3,
            answer: this.answer3,
            shortText: this.shortTextThree,
            addlInfo: this.addlInfo,
          },
        ],
      };
      this.nLocalStorage.setValue("userResponse", JSON.stringify(formdata));
      var time = new Date().toLocaleDateString();
      this.nLocalStorage.setValue("lastResponse", time);
      let jwtToken = this.nLocalStorage.getValue('jwtToken')
      let bh = await this.saveuserService.saveUserData(formdata, jwtToken);
      return bh.local.result;
    } catch (err) {
      console.error(err);
    }
  }
}

