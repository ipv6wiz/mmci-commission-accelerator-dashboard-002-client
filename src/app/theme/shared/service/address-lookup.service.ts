import {Injectable} from "@angular/core";
import {environment} from '../../../../environments/environment'
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../entities/address.interface";
@Injectable({providedIn: 'root'})
export class AddressLookupService {
    private verifyAddressUrl = environment.verifyStreetAddressUrl;
    constructor(private http:HttpClient) {}

    verifyStreetAddress(street: string): Observable<any> {
        return this.http.get(`${this.verifyAddressUrl}?addr=${street}`);
    }

    extractStreetData(data:any) {
        const rawData = JSON.parse(data);
        const streetData = rawData[0];
        const addr: Address = {
            Address1: streetData.delivery_line_1,
            City: streetData.components.city_name,
            State: streetData.components.state_abbreviation,
            Zip5: streetData.components.zipcode
        }
        return addr;
    }
}
