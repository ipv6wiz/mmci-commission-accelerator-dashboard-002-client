import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {NavigationItem} from "../entities/navigation-item.interface";
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) {}

  async getAllFilteredByRole(userRoles: string[]) {
    console.log('NavigationService - userRoles: ', userRoles);
    return lastValueFrom(this.getAllByRole(userRoles), {defaultValue: []})
      .then((response: any) => {
        if(response.statusCode === 200) {
          return response.data.items;
        } else {
          throw new Error(`Did not find navigation`);
        }
      }).catch((err) => {
        console.log('Dash002 - Navigation Service - getAllFilteredByRole- error: ', err.message);
        return null;
      })
  }

  getAllByRole(roles: string[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/navigation/client`, {roles});
  }


}
