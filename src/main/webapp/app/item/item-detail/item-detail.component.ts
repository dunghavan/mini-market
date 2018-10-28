import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
    current_image_select: number;
    current_image_url: string;
    MAX_IMAGE_DISPLAY = 4;
    image_url: Array<string> = [];

    item_name: string;
    item_price: string;
    item_date_time: string;
    item_type: string;
    item_sell_status: string;
    item_current_status: string;
    item_ship_status: string;
    item_description: string;

    user_name: string;
    user_address: string;
    user_phone_number: string;
    user_email: string;
    user_rating: number;
    user_number_rating: number;

    constructor() {}

    ngOnInit() {
        this.get_image();
        this.get_user_info();
        this.get_item_info();
    }

    next_image() {
        this.current_image_select = this.current_image_select + 1;
        if (this.current_image_select >= this.MAX_IMAGE_DISPLAY) {
            this.current_image_select = 0;
        }
        this.current_image_url = this.image_url[this.current_image_select];
    }

    previous_image() {
        this.current_image_select = this.current_image_select - 1;
        if (this.current_image_select < 0) {
            this.current_image_select = this.MAX_IMAGE_DISPLAY - 1;
        }
        this.current_image_url = this.image_url[this.current_image_select];
    }
    get_user_info() {
        this.user_name = 'Huy';
        this.user_address = '266/20A Bach Dang, Binh Thanh, Ho Chi Minh';
        this.user_phone_number = '0942714728';
        this.user_email = 'huydinh.le@amperecomputing.com';
        this.user_rating = 5;
        this.user_number_rating = 10;
    }

    get_item_info() {
        this.item_name = 'Ao thun';
        this.item_price = '100.000 VND';
        this.item_date_time = '26/10/2018';
        this.item_type = 'Quan ao';
        this.item_sell_status = 'con hang';
        this.item_current_status = 'Hang cu';
        this.item_ship_status = 'Khong ship';
        this.item_description = 'hang su dung dc 1 nam do khong co nhau cau can nhuong lai';
    }

    get_image() {
        // for (let i = 0; i < this.MAX_IMAGE_DISPLAY; i++) {
        this.image_url.push('http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg');
        this.image_url.push('http://hstatic.net/640/1000004640/1/2016/9-6/xanhbich-aothun.jpg');
        this.image_url.push('https://cdn.concung.com/32611-36746/ao-thun-tay-ngan-con-ga-cf-107001-0-1y-trang.jpg');
        this.image_url.push('https://cdn.concung.com/28508-32592-gtt_large/ao-thun-be-trai-tay-ngan-laluna-b017017.jpg');
        this.current_image_select = 0;
        this.current_image_url = this.image_url[this.current_image_select];
        // }
    }
}
