import { Route } from '@angular/router';

import { HomeComponent } from './';
import {ListItemComponent} from "app/landing/landing.component";

export const HOME_ROUTE: Route = {
    path: '',
    component: ListItemComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
