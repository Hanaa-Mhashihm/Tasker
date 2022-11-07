import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { forexRateModel, invoiceproductModel, invoicetaxModel, productPricingModel } from '../suppinvoice.model';


@Injectable({
    providedIn: 'root'
})


export class SuppInvoiceEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'SuppInvoice/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'SuppInvoice/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'SuppInvoice/edituniv',arr);
        }

        child1Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'SuppInvoiceProduct/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }
        child2Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'SuppInvoiceTax/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

           getChild1byChild1(id: number): Observable<invoiceproductModel[]> {
            return this.httpClient.get<invoiceproductModel[]>(this._globals.baseAPIUrl + 'SuppInvoiceProduct/bysuppinvoice/' + id).pipe(
            map((result: invoiceproductModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           getChild2byChild2(id: number): Observable<invoicetaxModel[]> {
            return this.httpClient.get<invoicetaxModel[]>(this._globals.baseAPIUrl + 'SuppInvoiceTax/byinvoice/' + id).pipe(
            map((result: invoicetaxModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }


           getProductPricing(id: number): Observable<productPricingModel> {
            return this.httpClient.get<productPricingModel>(this._globals.baseAPIUrl + 'ProductPricing/productpricing/' + id).pipe(
            map((result: productPricingModel) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
           getProductPricing2(id: number, idC:number, idD:string): Observable<productPricingModel> {
            return this.httpClient.get<productPricingModel>(this._globals.baseAPIUrl + 'ProductPricing/productinvoicepricing/' + id +'/' + idC + '/' + idD).pipe(
            map((result: productPricingModel) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
           getForexRate(idC:number, idD:string): Observable<forexRateModel> {
            return this.httpClient.get<forexRateModel>(this._globals.baseAPIUrl + 'SuppForex/getforex/' + idC + '/' + idD).pipe(
            map((result: forexRateModel) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

}

