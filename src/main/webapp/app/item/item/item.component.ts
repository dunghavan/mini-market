import { Component, OnInit, Input } from '@angular/core';
import { ItemDes } from './item-des.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent2 implements OnInit {
    @Input() item_des: ItemDes;
    constructor() {
    }

    ngOnInit() {
        console.log('resutl: ', this.item_des);
    }
    save_item() {
        console.log(this.item_des.Item_id);
    }
}
