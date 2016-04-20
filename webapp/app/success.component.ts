import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'success',
    template:`
        <div class="content">
          <h2>Thanks for signing up! You will hear from us in the next few days.</h2>
          <fieldset>
            <button (click)="gotoHome()">Continue</button>
          </fieldset>
        </div>
        `
})


export class Success {
    constructor(private _router: Router){ }

    gotoHome() {
        this._router.navigate(['Home']);
    }
}

