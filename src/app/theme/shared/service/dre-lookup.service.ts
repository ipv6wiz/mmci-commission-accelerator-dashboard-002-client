import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {DOMParser} from "@xmldom/xmldom";
import {environment} from '../../../../environments/environment';
import {NGXLogger} from "ngx-logger";

@Injectable({ providedIn: 'root'})
export class DreLookupService {
    private apiUrl = environment.gcpCommAccApiUrl;
    constructor(
        private logger: NGXLogger,
        private http: HttpClient
    ) {}

    async checkDreLicense(dreNumber: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.getLicenseViaApi(dreNumber));
            if(response.statusCode === 200) {
                return response.data['dreRecord'];
            } else if(response.statusCode === 404){
                throw new Error(response.msg);
            }
        } catch (err: any) {
            const msg: string = `Dash001 - DRE Lookup - error - msg: ${err.message}`;
            this.logger.log(msg);
            throw new Error(msg);
        }
    }

    getLicenseViaApi(dreNumber: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/dre/${dreNumber}`, {withCredentials: true});
    }
}
