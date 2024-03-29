import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AdvanceCreateDto } from '../dtos/advance-create.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { AdvanceUpdateDto } from '../dtos/advance-update.dto';
import { HttpClient } from '@angular/common/http';
import { ListWithCountDto } from '../dtos/list-with-count.dto';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async loadAllItemsForClient(clientId: string, sortBy: string = ''): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAll(clientId, sortBy), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async loadAllItemsForClientFiltered(clientId: string, sortBy: string = '', filter: string = ''): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAllFiltered(clientId, filter, sortBy), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async updateItem(uid: string, data: AdvanceUpdateDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.update(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async createItem(data: AdvanceCreateDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.create(data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }


  getAll(clientId: string, sortBy: string): Observable<ApiResponse> {
    if(sortBy !== '') {
      return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}?sortBy=${sortBy}`);
    } else {
      return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}`);
    }
  }

  getAllFiltered(clientId: string, filter: string, sortBy: string): Observable<ApiResponse> {
    if(sortBy !== ''){
      return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}?filter=${filter}&sortBy=${sortBy}`);
    } else {
      return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}?filter=${filter}`);
    }
  }

  create(data: AdvanceCreateDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}`, data);
  }

  update(uid: string, data: AdvanceUpdateDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${uid}`, data);
  }
}
