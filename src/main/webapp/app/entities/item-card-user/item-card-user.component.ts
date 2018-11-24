import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'app/shared/model/item.model';

@Component({
    selector: 'app-item-card-user',
    templateUrl: './item-card-user.component.html',
    styleUrls: ['./item-card-user.component.css']
})
export class ItemCardUserComponent implements OnInit {
    @Input() Iitem: IItem;
    constructor() {

    }

    ngOnInit() {
        console.log('resutl: ', this.item_des);
    }
}
