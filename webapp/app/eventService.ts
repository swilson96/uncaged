import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Rx';

import {Event} from './event';
import {ServiceClient} from "./serviceClient";

import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

    constructor(private client: ServiceClient) {
    }

    list(): Observable<[Event]> {
        return this.client.get("/events")
            .map(json => <[Event]> json);
    }
}