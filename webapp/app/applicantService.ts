import {Injectable} from 'angular2/core';

import {Applicant} from './applicant';
import {ServiceClient} from "./serviceClient";


@Injectable()
export class ApplicantService {

    constructor(private client: ServiceClient) {
    }

    signUp(applicant: Applicant) {
        if (!applicant.time) {
            //applicant.time = new Date();
        }
        return this.client.post("/applicants", applicant);
    }
}
