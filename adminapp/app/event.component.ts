import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {ServiceClient} from './serviceClient'

import {Event} from './event'
import {EventService} from './eventService'


@Component({
    selector: 'event',
    template:`
        <div class='content'>
          <h2>Event Details</h2>
          <button (click)="gotoHome()">Back</button>
        </div>
        `,
    providers: [EventService, ServiceClient]
})

export class EventPage {
    event: Event = new Event();

    constructor(private router: Router, private eventService: EventService){
    }

    gotoHome() {
        return this.router.navigate(['Home']);
    }
}

