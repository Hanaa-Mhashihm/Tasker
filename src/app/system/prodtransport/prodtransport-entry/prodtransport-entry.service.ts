import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { ProdTransProdModel } from '../prodtransport.model';
import { productPricingModel } from '../../suppinvoice/suppinvoice.model';


@Injectable({
    providedIn: 'root'
})


export class ProdTransportEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ProdTransport/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ProdTransport/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ProdTransport/edituniv',arr);
        }
        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ProdTransProd/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild1ItembyChild1(id: number): Observable<ProdTransProdModel[]> {
            return this.httpClient.get<ProdTransProdModel[]>(this._globals.baseAPIUrl + 'ProdTransProd/byprodtransport/' + id).pipe(
            map((result: ProdTransProdModel[]) => {
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

