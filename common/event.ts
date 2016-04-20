import {Applicant} from './applicant';

export class Event {
    name: string;
    date: Date;
    open: Boolean;
    applicants: [Applicant];
    _id: string;
}
