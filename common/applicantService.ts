import {Injectable} from 'angular2/core';

import {Event} from './event';
import {Applicant} from './applicant';
import {ServiceClient} from "./serviceClient";

import 'rxjs/add/operator/map';

@Injectable()
export class ApplicantService {

    constructor(private client: ServiceClient) {
    }

    signUp(event: Event, applicant: Applicant) {
        return this.client.post("/event/" + event._id + "/applicants", applicant)
            .map(json => <Applicant> json);
    }
}
