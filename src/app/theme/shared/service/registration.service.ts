import { Injectable } from '@angular/core';
import {Registrant} from "../dtos/registrant.dto";
import {lastValueFrom, Observable} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
    private apiUrl = environment.gcpCommAccApiUrl;

    constructor(
      private logger: NGXLogger,
      private http: HttpClient
    ) {}

    async getOne(uid: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.getOneViaApi(uid), {defaultValue: {}});
            if(response.statusCode === 200) {
                return response.data.registrant;
            } else {
                throw new Error(`Did not find client registration with id: ${uid}`);
            }
        } catch (err: any) {
            const msg = `Dash001 - Registration Service - getOne- error: ${err.message}`;
            this.logger.log(msg);
            throw new Error(msg);
        }

    }

    getOneViaApi(uid: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/register/register/${uid}`);
    }

    async saveRegForm(registrant: Registrant): Promise<boolean> {
        console.log('-------> RegistrationService - create - registrant: ', registrant);
        try {
            const response = await lastValueFrom(this.saveRegFormViaApi(registrant), {defaultValue: {}});
            if(response.statusCode === 201){
                return true;
            } else {
                throw new Error(`Create Registration doc for ${registrant.uid} failed.`)
            }
        } catch (err: any) {
            const msg = `Dash001 - Registration Service - create - error: ${err.message}`;
            this.logger.log(msg);
            throw new Error(msg);
        }
    }

    saveRegFormViaApi(registrant: Registrant): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/register/reg-form`, registrant);
    }

    async update(id: string, data: any): Promise<boolean> {
        // console.log('RegistrationService - update - id: ', id);
        // return this.regRef.doc(id).set(data, {merge: true});
        return false;
    }

    /**
     * @TODO: Soft delete in Comm-Acc to keep history
     * @TODO: Delete from Firebase User List to prevent login
     * @param id
     */
    async delete(id: string): Promise<void> {
        // return this.regRef.doc(id).delete();
    }
}
