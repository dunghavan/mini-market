import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
    previous_page() {
        console.log('Hello');
    }
    next_page() {
        console.log('Hello');
    }
}
