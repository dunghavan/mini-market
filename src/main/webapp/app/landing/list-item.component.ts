
import { Component, OnInit } from '@angular/core';
import {ItemDes} from '../item/item/item-des.model'

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
    item_des: ItemDes;
    MAX_ITEM_PER_PAGE = 10;
    MAX_PAGE = 10;
    MAX_DISPLAY_PAGE = 5;
    current_selected_page: number;
    item_in_page: Array<ItemDes>;
    constructor() {
        this.current_selected_page = 1;
        this.get_item_id_in_page(this.current_selected_page);
    }

    ngOnInit() {}
    previous_page() {
        if (this.current_selected_page > 1) {
            this.current_selected_page -= 1;
            this.get_item_id_in_page(this.current_selected_page);
        }
    }
    next_page() {
        if (this.current_selected_page < this.MAX_PAGE) {
            this.current_selected_page += 1;
            this.get_item_id_in_page(this.current_selected_page);
        }
    }
    get_item_id_in_page(page_number: number) {
        this.item_in_page = [];
        for (let i = 0; i < this.MAX_ITEM_PER_PAGE; i++) {
            this.get_data();
            this.item_in_page.push(this.item_des);
        }
    }

    get_data() {
        this.item_des = new ItemDes();
        this.item_des.Item_name = 'Ao thun';
        this.item_des.Item_price = '100.000 VND';
        this.item_des.Item_address = 'Ho Chi Minh';
        this.item_des.Item_date_time = '27/10/2018';
        this.item_des.User_name = 'Huy';
        this.item_des.User_rating = 5;
        this.item_des.Item_image_url = 'http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg';

    }
}
