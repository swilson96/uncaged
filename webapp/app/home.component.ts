import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {ServiceClient} from './serviceClient'

import {Event} from './event'
import {Applicant} from './applicant'

import {EventService} from './eventService'
import {ApplicantService} from './applicantService'


@Component({
    selector: 'home',
    template:`
        <div class='content'>
          <h4>{{event.name}}</h4>
          <form (ngSubmit)="signUp()">
              <div class="form-group">
                <label for="name">Name: </label>
                <input type="text" class="form-control" required [(ngModel)]="applicant.name">
              </div>
              <div class="form-group">
                <label for="company">Email: </label>
                <input type="text" class="form-control" [(ngModel)]="applicant.email" >
              </div>
              <button type="submit" [disabled]="eventSelected" class="btn btn-default">Sign Up</button>
          </form>
        </div>
        `,
    providers: [ApplicantService, EventService, ServiceClient]
})

export class Home {
    applicant: Applicant = new Applicant();
    eventSelected = false;
    event: Event = new Event();
    events = [];

    constructor(private router: Router, private service: ApplicantService, private eventService: EventService){
        this.event.name = "Loading event name...";

        this.eventService.list().subscribe((data) => {
            this.events = data;
            this.event = this.events[0];
            this.eventSelected = event ? true : false;
        });
    }

    signUp() {
        this.service.signUp(this.event, this.applicant).subscribe(newApplicant => {
            console.log('Signed in ' + newApplicant.name);
            return this.router.navigate(['Success']);
        });
    }
}

