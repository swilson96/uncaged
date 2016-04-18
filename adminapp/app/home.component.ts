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
            <div (click)="details">{{event.name}}</div>
            <button *ngIf="event.open" (click)="close(event)">Close</button>
            <button *ngIf="!event.open" (click)="open(event)">Open</button>
          </div>
          <div>
             <h3>New Event:</h3>
             <form (ngSubmit)="create()">
                 <input type="text" class="form-control" required [(ngModel)]="event.name" >
                 <input type="text" class="form-control" required [(ngModel)]="event.date" >
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

    details() {
        return this.router.navigate(['Event']);
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

