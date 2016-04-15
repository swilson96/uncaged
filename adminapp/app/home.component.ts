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
             <form (ngSubmit)="create()">
             <input type="text" class="form-control" [(ngModel)]="event.name" >
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
        this.eventService.list().subscribe((data) => {
            this.events = data;
        });
    }

    details() {

    }

    close(event) {

    }

    open(event) {

    }

    create() {

    }
}

