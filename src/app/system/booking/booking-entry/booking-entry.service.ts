import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { productPricingModel } from '../../suppinvoice/suppinvoice.model';
import { BookContModel } from '../booking.model';


@Injectable({
    providedIn: 'root'
})


export class BookingEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Booking/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Booking/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Booking/edituniv',arr);
        }

        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'BookCont/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        child2ItemControllers(model: Send) {
            // the url
            return this.http.post(this._globals.baseAPIUrl + 'Bookcont/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild1ItembyChild1(id: number): Observable<BookContModel[]> {
            return this.httpClient.get<BookContModel[]>(this._globals.baseAPIUrl + 'BookCont/bybooking/' + id).pipe(
            map((result: BookContModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
           getChild2byChild2(id: number): Observable<BookContModel[]> {
            return this.httpClient.get<BookContModel[]>(this._globals.baseAPIUrl + 'InvoiceTax/byinvoice/' + id).pipe(
            map((result: BookContModel[]) => {
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
}

