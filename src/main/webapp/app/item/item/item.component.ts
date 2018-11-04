import { Component, OnInit, Input } from '@angular/core';
import { ItemDes } from './item-des.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
    @Input() id: number;
    item_des: ItemDes;
    constructor() {
        this.item_des = new ItemDes();
    }

    ngOnInit() {
        this.item_des.Item_id = this.id;
        this.get_item_des(this.item_des.Item_id);
    }

    get_item_des(item_id: number) {
        this.get_item_image(item_id);
        this.get_item_info(item_id);
        this.get_user_info(item_id);
    }

    get_item_info(item_id: number) {
        this.item_des.Item_name = 'Ao thun';
        this.item_des.Item_price = '100.000 VND';
        this.item_des.Item_address = 'Ho Chi Minh';
        this.item_des.Item_date_time = '27/10/2018';
    }

    get_user_info(item_id: number) {
        this.item_des.User_name = 'Huy';
        this.item_des.User_rating = 5;
    }

    get_item_image(item_id: number) {
        this.item_des.Item_image_url = 'http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg';
    }

    save_item() {
        console.log(this.item_des.Item_id);
    }
}
