import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {ServiceClient} from './serviceClient'

import {Event} from './event'
import {EventService} from './eventService'


@Component({
    selector: 'home',
    template:`
        <div class='content'>
          <h2>Events</h2>
          <div *ngFor="#event of events">
            <div class="link inline" (click)="details(event._id)">{{event.name}}</div>
            <button class="small" *ngIf="event.open" (click)="close(event)">Close</button>
            <button class="small" *ngIf="!event.open" (click)="open(event)">Open</button>
          </div>
          <div>
             <h3>New Event:</h3>
             <form (ngSubmit)="create()">
                <div class="form-group">
                <label for="name">Name:</label>
                 <input type="text" class="form-control" required [(ngModel)]="event.name" >
                </div>
                <div class="form-group">
                <label for="name">Date:</label>
                 <input type="text" class="form-control" required [(ngModel)]="event.date" >
                </div>
                <button type="submit" class="btn btn-default">Create</button>
             </form>
          </div>
        </div>
        `,
    providers: [EventService, ServiceClient]
})

export class Home {
    events = [];
    event: Event = new Event();

    constructor(private router: Router, private eventService: EventService){
        this.refresh();
    }

    refresh() {
        this.eventService.list().subscribe((data) => {
            this.events = data;
        });
    }

    details(eventId) {
        return this.router.navigate(['Event', {id: eventId}]);
    }

    close(event) {
        this.eventService.close(event).subscribe((data) => {
            this.refresh();
        });
    }

    open(event) {
        this.eventService.open(event).subscribe((data) => {
            this.refresh();
        });
    }

    create() {
        this.eventService.create(this.event).subscribe((data) => {
            this.event = new Event();
            this.refresh();
        });
    }
}

