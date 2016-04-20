import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Response, Headers} from 'angular2/http';
import {Observable} from "rxjs/Rx";

import {baseApiUrl} from './configuration';

import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceClient {
    private baseUrl: string;

    constructor(protected http: Http) {
        this.baseUrl = baseApiUrl;
    }

    private handleError (error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    private  getJsonRequestOptions() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }

    public get(url) {
        return this.http.get(this.baseUrl + url, this.getJsonRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }

    public post(url, body) {
        return this.http.post(this.baseUrl + url, JSON.stringify(body), this.getJsonRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }

    public put(url: string, jsonEntity = null): Observable<Object> {
        return this.http.put(this.baseUrl + url, JSON.stringify(jsonEntity), this.getJsonRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }
}
