import { Component, OnInit } from '@angular/core';
import { ItemDetail } from './item-detail.model';
import { UserDetail } from './user-detail.model';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
    item_detail: ItemDetail;
    user_detail: UserDetail;
    constructor() {
        this.item_detail = new ItemDetail();
        this.user_detail = new UserDetail();
    }

    ngOnInit() {
        this.get_image();
        this.get_user_info();
        this.get_item_info();
    }

    next_image() {
        this.item_detail.current_image_select = this.item_detail.current_image_select + 1;
        if (this.item_detail.current_image_select >= this.item_detail.MAX_IMAGE_DISPLAY) {
            this.item_detail.current_image_select = 0;
        }
        this.item_detail.current_image_url = this.item_detail.image_url[this.item_detail.current_image_select];
    }

    previous_image() {
        this.item_detail.current_image_select = this.item_detail.current_image_select - 1;
        if (this.item_detail.current_image_select < 0) {
            this.item_detail.current_image_select = this.item_detail.MAX_IMAGE_DISPLAY - 1;
        }
        this.item_detail.current_image_url = this.item_detail.image_url[this.item_detail.current_image_select];
    }
    get_user_info() {
        this.user_detail.user_name = 'Huy';
        this.user_detail.user_address = '266/20A Bach Dang, Binh Thanh, Ho Chi Minh';
        this.user_detail.user_phone_number = '0942714728';
        this.user_detail.user_email = 'huydinh.le@amperecomputing.com';
        this.user_detail.user_rating = 5;
        this.user_detail.user_number_rating = 10;
        console.log(this.user_detail.user_email);
    }

    get_item_info() {
        this.item_detail.item_name = 'Ao thun';
        this.item_detail.item_price = '100.000 VND';
        this.item_detail.item_date_time = '26/10/2018';
        this.item_detail.item_type = 'Quan ao';
        this.item_detail.item_sell_status = 'con hang';
        this.item_detail.item_current_status = 'Hang cu';
        this.item_detail.item_ship_status = 'Khong ship';
        // tslint:disable-next-line:max-line-length
        this.item_detail.item_description =
            'hang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong lai';
    }

    get_image() {
        // for (let i = 0; i < this.MAX_IMAGE_DISPLAY; i++) {
        this.item_detail.image_url.push('http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg');
        this.item_detail.image_url.push('http://hstatic.net/640/1000004640/1/2016/9-6/xanhbich-aothun.jpg');
        this.item_detail.image_url.push('https://cdn.concung.com/32611-36746/ao-thun-tay-ngan-con-ga-cf-107001-0-1y-trang.jpg');
        this.item_detail.image_url.push('https://cdn.concung.com/28508-32592-gtt_large/ao-thun-be-trai-tay-ngan-laluna-b017017.jpg');
        this.item_detail.current_image_select = 0;
        this.item_detail.current_image_url = this.item_detail.image_url[this.item_detail.current_image_select];
        // }
    }
}
