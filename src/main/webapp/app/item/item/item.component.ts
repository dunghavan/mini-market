import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
    Item_id: number;
    Item_image_url: string;
    Item_name: string;
    Item_price: string;
    Item_address: string;
    Item_date_time: string;
    User_name: string;
    User_rating: number;
    constructor() {}

    ngOnInit() {
        this.get_item_image();
        this.get_item_info();
        this.get_user_info();
    }

    get_item_info() {
        this.Item_id = 1;
        this.Item_name = 'Ao thun';
        this.Item_price = '100.000 VND';
        this.Item_address = 'Ho Chi Minh';
        this.Item_date_time = '27/10/2018';
    }

    get_user_info() {
        this.User_name = 'Huy';
        this.User_rating = 5;
    }

    get_item_image() {
        this.Item_image_url = 'http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg';
    }

    save_item() {
        console.log(this.Item_id);
    }
}
