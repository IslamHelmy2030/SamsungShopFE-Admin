import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  post(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }

    return this.http.post(this.getFullUrl(url), body);
  }

  put(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }

    return this.http.put(this.getFullUrl(url), body);
  }

  get(url: string, params?: {}, options?: any): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    const fullUrl = this.getFullUrl(url);

    var result = this.http.get(fullUrl, options);
    return result;
  }

  delete(url: string, params?: {}, options?: any): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    const fullUrl = this.getFullUrl(url);
    return this.http.delete(fullUrl, options);
  }

  // SECTION Serialize Data and get full URL with Params
  // TODO Instead of adding to the URL as a query string add to an object of type query params

  private getFullUrl(apiUrl: string) {
    return environment.APIURL + apiUrl;
  }

  /**
   * Serializin arguments as a string
   * @param options object of Backend parametars to serialize
   * @return string of parameters
   */
  private getParams(args: any): string {
    if (!args) {
      return '';
    }
    let params = '?';
    Object.keys(args).forEach((key, index) => {
      params += this.optionToString(key, args[key]);
    });
    return params;
  }

  // TODO Refactor here and add recursion to get the best out of the function
  /**
   * serializing eatch option
   * @param key option key
   * @param value option value
   * @return single option serilization
   */
  private optionToString(key: string, value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    let str = '';
    if (value instanceof Array) {
      value.forEach((element, index) => {
        str += `${key}[${index}]=${element}&`;
      });
    } else if (value instanceof Object) {
      Object.keys(value).forEach((element, index) => {
        if (value instanceof Object) {
          str += this.serializeObject(value[element], `${key}[${element}]`);
        } else {
          str += `${key}[${element}]=${value[element]}&`;
        }
      });
    } else {
      str += `${key}=${value}&`;
    }
    return str;
  }

  // /**
  //  * serializing the object keys
  //  * @param obj object to serialize
  //  */
  private serializeObject(obj: any, parentSerialized: string): string {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const value = obj[key];
      if (value instanceof Object) {
        str += `${this.serializeObject(value, `${parentSerialized}[${key}]`)}`;
      } else {
        str += `${parentSerialized}[${key}]=${value}&`;
      }
    });
    return str;
  }
}
