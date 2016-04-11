import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {Home} from './home.component';
import {Success} from './success.component';

@Component({
    selector: 'app',
    template:`
        <h1>UNCAGED Softwire Recruitment Sign-up</h1>
        <router-outlet></router-outlet>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
    {
        path: '/home',
        name: 'Home',
        component: Home,
        useAsDefault: true
    },
    {
        path: '/success',
        name: 'Success',
        component: Success
    }
])

export class App { }

