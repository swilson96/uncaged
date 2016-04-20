import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from 'angular2/router';

import {ServiceClient} from './serviceClient';

import {Event} from './event';
import {EventService} from './eventService';


@Component({
    selector: 'event',
    template:`
        <div class='content'>
          <h2>{{event.name}}</h2>
          <table>
                <tr><th>Name</th><th>Email</th><th>Time</th></tr>
                <tr *ngFor="#applicant of event.applicants">
                    <td>{{applicant.name}}</td>
                    <td>{{applicant.email}}</td>
                    <td>{{deserialiseDate(applicant.time) | date:'medium'}}</td>
                </tr>
          </table>
          <button (click)="gotoHome()">Back</button>
        </div>
        `,
    providers: [EventService, ServiceClient]
})

export class EventPage {
    event: Event = new Event();

    constructor(private router: Router, private routeParams: RouteParams, private eventService: EventService) {
        this.eventService.single(this.routeParams.get('id')).subscribe((data) => {
            this.event = data;
        });
    }

    deserialiseDate(dateString: string): Date {
        return new Date(dateString);
    }

    gotoHome() {
        return this.router.navigate(['Home']);
    }
}

