import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AdvanceCreateDto } from '../dtos/advance-create.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { AdvanceUpdateDto } from '../dtos/advance-update.dto';
import { HttpClient } from '@angular/common/http';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient, private helpers: HelpersService) {
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

  async loadSummaries(clientId: string): Promise<Map<string, any>> {
    const response: ApiResponse = await lastValueFrom(this.getSummaries(clientId), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    if(response.statusCode === 200) {
      return JSON.parse(JSON.stringify(response.data), this.helpers.reviver);
    } else {
      return new Map<string, any>();
    }

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

  getSummaries(clientId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}/summaries`);
  }

  create(data: AdvanceCreateDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}`, data);
  }

  update(uid: string, data: AdvanceUpdateDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${uid}`, data);
  }
}
