/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveuserresponse } from 'app/sd-services/saveuserresponse';
@Injectable()
export class masterdataService {
public username:string
public password:string
public answer1:string
public answer2:string
public answer3:string
public questionId:string
public certifyInfoName: string
public certifyInfoChecked:string
public locationName:string;
public phone:string;

// creating serverurl variable we can define it env.json and access here
serverurl = 'http://localhost:8081';


constructor(private http: HttpClient,private saveuserService:saveuserresponse) {}


async userSubmit(){
    console.log(JSON.parse(localStorage.getItem('answer1')));
    let answer1  = JSON.parse(localStorage.getItem('answer1'));
    let answer2  = JSON.parse(localStorage.getItem('answer2'));
    let answer3  = JSON.parse(localStorage.getItem('answer3'));
    let UpdatedlocationName = localStorage.getItem('locationName');
    let UcertifyInfoName = localStorage.getItem('certifyInfoName');
    let UcertifyInfoCheck = localStorage.getItem('certifyInfoChecked')
    try {

          let formdata = {
                type:"employee",
                locationName: UpdatedlocationName,
                email:"bharat@gmail.com",
                phone:localStorage.getItem('phone'),
                firstName:"st peter",
                lastName:"henry",
                company:"blucocondigital",
                ingredionContact:"none",
                certifyInfoName:UcertifyInfoName,
                certifyInfoChecked:UcertifyInfoCheck,
                  response:[{
                            'answer':answer1
                        },{
                            'answer':answer2
                        },{
                            'answer':answer3
                        }
                    ],
            };

        console.log(formdata);
        let bh = this.saveuserService.saveUserData(formdata).then((Response) => {
                    if(Response) {
                        console.log('Response ',Response , Response.local);
                        localStorage.setItem('USER_RESPONSE', JSON.stringify(Response.local))
                    }
                }).catch((error) => {
                    console.log(error);
                });
        
         return bh;

    } catch(err){
        // this.isLoading = false
        console.log(err)
    }
}
}
 console.log(localStorage.getItem('answer1'),localStorage.getItem('answer2'),localStorage.getItem('answer3'));
 var confirmdetailsObj = JSON.parse(localStorage.getItem('confirmdetails'));



    

