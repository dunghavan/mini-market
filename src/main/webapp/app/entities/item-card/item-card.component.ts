import { Component, OnInit, Input } from '@angular/core';
import { ItemDes } from './item-des.model';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
    @Input() item_des: ItemDes;
    constructor() {
    }

    ngOnInit() {
        console.log('resutl: ', this.item_des);
    }
}
