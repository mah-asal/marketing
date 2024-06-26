import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public readonly endpoint: string = "https://edge.tv-92.com";

  constructor(
    private http: HttpClient,
  ) { }


  public request<T = any>(param: RequestParam) {
    let url =
      param.url ??
      `${param.endpoint ?? this.endpoint}${param.path}`;

    let headers: any = param.header ?? {};

    return this.http
      .request<T>(
        new HttpRequest(param.method, url, param.data, {
          responseType: 'json',
          reportProgress: param.reportProgress ?? false,
          headers: new HttpHeaders(headers),
        })
      )
      .pipe(
        map<any, T | undefined>((res) => {
          if (param.reportProgress) return res;
          if ('type' in res && res.type == 0) return undefined;
          else return res.body;
        }),
        filter((res) => res != undefined)
      );
  }
}

interface RequestParam {
  method: string;
  path?: string;
  data?: any;
  auth?: boolean;
  endpoint?: string;
  url?: string;
  header?: object;
  reportProgress?: boolean;
}