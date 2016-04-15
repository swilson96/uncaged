import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Home} from './home.component';

@Component({
    selector: 'app',
    template:`
        <h1>UNCAGED Admin Portal</h1>
        <router-outlet></router-outlet>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ]
})

@RouteConfig([
    {
        path: '/home',
        name: 'Home',
        component: Home,
        useAsDefault: true
    }
])

export class App { }

