import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JVFileRequestModel } from '../model/jvrequestModel';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app-constants';
import { JVFileResponseModel } from '../model/jvResponseModel';

@Injectable({
  providedIn: 'root'
})
export class JvFileService {

  constructor(private httpClient: HttpClient) {

  }

  validateJVFile(data: JVFileRequestModel[]): Observable<JVFileResponseModel[]> {
    return this.httpClient.post<any>(AppConstants.apiUrl +
      'JV/ValidateJVFile', data, AppConstants.httpOptions);
  }
}
