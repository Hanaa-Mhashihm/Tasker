import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { CustomerAccountModel } from '../../GeneratedComponents01Apr/customer/customer.model';
import { SupplierAccountModel, SupplierModel } from '../supplier.model';


@Injectable({
    providedIn: 'root'
})


export class SupplierEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Supplier/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Supplier/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Supplier/edituniv',arr);
        }

        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'SupplierAccount/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getCustomerItembyCustomer(id: number): Observable<SupplierAccountModel[]> {
            return this.httpClient.get<SupplierAccountModel[]>(this._globals.baseAPIUrl + 'SupplierAccount/bysupplier/' + id).pipe(
            map((result: SupplierAccountModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        

}

