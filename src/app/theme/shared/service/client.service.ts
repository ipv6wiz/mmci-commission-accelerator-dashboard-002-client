import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {ApiResponse} from "../dtos/api-response.dto";
import {lastValueFrom, Observable} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {SignupFormDataDto} from "../dtos/signup-form-data.dto";

@Injectable({ providedIn: 'root' })
export class ClientService {
    private apiUrl = environment.gcpCommAccApiUrl;

    constructor( private http: HttpClient, private logger: NGXLogger,) {}

    /**
     * Replace with API call to retrieve as if for Verify (Clean)
     * @param uid : string
     */
    getOne(uid: string): any {
        return lastValueFrom(this.getOneClient(uid), {defaultValue: {}})
            .then((response: any) => {
                if(response.statusCode === 200) {
                    return response.data.client;
                } else {
                    throw new Error(`Did not find client with id: ${uid}`);
                }
            }).catch((err) => {
                this.logger.log('Dash001 - Client Service - getOne- error: ', err.message);
                return null;
            })
    }

    getOneClient(clientId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/client/${clientId}`, {withCredentials: true});
    }

    async signUpClient(clientFormData: SignupFormDataDto): Promise<any> {
        try{
            const response: ApiResponse = await lastValueFrom(this.createClient(clientFormData));
            if(response.statusCode === 201) {
                return response.data; // {userRecord, firstName: userFormData.firstName, lastName: userFormData.lastName}
            } else if (response.statusCode === 400){
                throw new Error('The email address is already in use by another account. Check for a verification email.');
            } else {
                throw new Error(`Failed to create client`);
            }
        } catch (err: any) {
            this.logger.log('Dash001 - Client - create - error: ', err.message);
            throw new Error(err.message);
        }
    }

    createClient(clientFormData: SignupFormDataDto): Observable<ApiResponse> {
        return this.http.post<any>(`${this.apiUrl}/client/signup`, clientFormData);
    }

    /**
     * Calls API PUT client/:clientID
     * @param uid
     * @param data
     */
    async update(uid: string, data: any): Promise<any> {
        console.log(`ClientService - update - id: ${uid} data: `, data);
        return lastValueFrom(this.updateClient(uid, data))
            .then((response: any) => {
                if(response.statusCode === 200) {
                    return {clientId: uid}; // response should be true
                } else {
                    throw new Error(`Failed to update client with ID: ${uid}`);
                }
            }).catch((err) => {
                const msg: string = `Dash001 - Client - update - error: ${err.message}`;
                this.logger.log(msg);
                throw new Error(msg);
            })
    }

    updateClient(uid: string, data: any): Observable<any>{
        return this.http.put<any>(`${this.apiUrl}/client/${uid}`,data);
    }

    /**
     * Replace with call to API use Admin SDK to delete from Firebase User List
     *
     * @TODO: Soft delete in Comm-Acc to keep history
     * @TODO: Delete from Firebase User List to prevent login
     * @param id
     */
    async delete(id: string): Promise<void> {
        // return this.clientsRef.doc(id).delete();
        return;
    }
}
