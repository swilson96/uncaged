import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {ServiceClient} from './serviceClient'

import {Applicant} from './applicant'
import {ApplicantService} from './applicantService'


@Component({
    selector: 'home',
    template:`
        <div class='content'>
          <form (ngSubmit)="signUp()">
              <div class="form-group">
                <label for="name">Name: </label>
                <input type="text" class="form-control" required [(ngModel)]="applicant.name">
              </div>
              <div class="form-group">
                <label for="company">Email: </label>
                <input type="text" class="form-control" [(ngModel)]="applicant.email" >
              </div>
              <button type="submit" class="btn btn-default">Sign Up</button>
          </form>
        </div>
        `,
    providers: [ApplicantService, ServiceClient]
})

export class Home {
    applicant: Applicant = new Applicant();

    constructor(private router: Router, private service: ApplicantService){ }

    signUp() {
        this.service.signUp(this.applicant).subscribe(newApplicant => {
            console.log('Signed in ' + newApplicant.name);
            return this.router.navigate(['Success']);
        });
    }
}

