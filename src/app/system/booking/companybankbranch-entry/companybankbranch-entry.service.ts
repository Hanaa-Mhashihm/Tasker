import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


// import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Send } from 'src/app/send.model';


@Injectable({
    providedIn: 'root'
})
export class CompanyBankBranchEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'BookExp/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'BookExp/createuniv',arr);
        }

        EntryA2(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'BookExpList/create',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'BookExp/edituniv',arr);
        }

        getData(id:number){
            return this.httpClient.get(this._globals.baseAPIUrl + 'BookExpList/bybooking/' + id)
        }
        
        getAEDVal(id:number){
            return this.httpClient.get(this._globals.baseAPIUrl + 'Booking/getaedvalue/' + id)
        }

        getSDGVal(id:number){
            return this.httpClient.get(this._globals.baseAPIUrl + 'Booking/geteurovalue/' + id)
        }

        getUSDVal(id:number){
            return this.httpClient.get(this._globals.baseAPIUrl + 'Booking/getusdvalue/' + id)
        }


        



//Bank


}
