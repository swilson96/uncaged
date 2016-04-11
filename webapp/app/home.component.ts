import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'home',
    template:`
        <div class='content'>
          <fieldset>
            <label for="name">Name:</label>
            <input id="name" type="text" name="name">

            <label for="name">Email Address:</label>
            <input id="name" type="text" name="company">

            <button (click)="signIn()">Sign Up</button>
          </fieldset>
        </div>
        `
})



export class Home {
    constructor(private _router: Router){ }

    signIn() {
        this._router.navigate(['Success']);
    }
}

