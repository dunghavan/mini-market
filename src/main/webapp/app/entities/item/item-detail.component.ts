import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItem } from 'app/shared/model/item.model';
import {IImage} from 'app/shared/model/image.model';
import {ImageService} from 'app/entities/image';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UserDetail} from "app/item/item-detail/user-detail.model";

@Component({
    selector: 'jhi-item-detail',
    templateUrl: './item-detail.component2.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
    item: IItem;
    images: IImage[];
    current_image_select: number;
    current_image_url: string;
    user_detail: UserDetail;

    constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {
        this.user_detail = new UserDetail();
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
            console.log('item: ', this.item);
            this.loadImages();
        });
        // this.get_image();
        this.get_user_info();
        // this.get_item_info();
    }

    showImage(imgId: number) {
        // TODO show image here
    }
    next_image() {
        this.current_image_select++;
        if (this.current_image_select >= this.images.length) {
            this.current_image_select = 0;
        }
        this.current_image_url = 'http://localhost:8888/' + this.images[this.current_image_select].name;
    }

    previous_image() {
        this.current_image_select--;
        if (this.current_image_select < 0) {
            this.current_image_select = this.images.length - 1;
        }
        this.current_image_url = this.images[this.current_image_select].name;
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

    // get_item_info() {
    //     this.item.item_name = 'Ao thun';
    //     this.item.item_price = '100.000 VND';
    //     this.item.item_date_time = '26/10/2018';
    //     this.item.item_type = 'Quan ao';
    //     this.item.item_sell_status = 'con hang';
    //     this.item.item_current_status = 'Hang cu';
    //     this.item.item_ship_status = 'Khong ship';
    //     // tslint:disable-next-line:max-line-length
    //     this.item.item_description =
    //         'hang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong laihang su dung dc 1 nam do khong co nhau cau can nhuong lai';
    // }

    // get_image() {
    //     this.item.image_url.push('http://hstatic.net/640/1000004640/1/2016/8-17/xanhla-aothun.jpg');
    //     this.item.image_url.push('http://hstatic.net/640/1000004640/1/2016/9-6/xanhbich-aothun.jpg');
    //     this.item.image_url.push('https://cdn.concung.com/32611-36746/ao-thun-tay-ngan-con-ga-cf-107001-0-1y-trang.jpg');
    //     this.item.image_url.push('https://cdn.concung.com/28508-32592-gtt_large/ao-thun-be-trai-tay-ngan-laluna-b017017.jpg');
    //     this.item.current_image_select = 0;
    //     this.item.current_image_url = this.item.image_url[this.item.current_image_select];
    // }

    loadImages() {
        const requestOption = {
            page: 0,
            size: 10,
            sort: ['id']
        };
        this.imageService.findByItemId(this.item.id, requestOption)
            .subscribe(
                (res: HttpResponse<IImage[]>) => this.onSuccess(res.body),
                (err: HttpErrorResponse) => this.onError(err.message)
            );
    }

    onSuccess(images: IImage[]) {
        this.images = images;
        console.log('get images success: ', this.images);
        this.current_image_select = 0;
        this.current_image_url = 'http://localhost:8888/' + this.images[this.current_image_select].name;
    }

    onError(msg: string) {
        console.log('get images err: ', msg);
    }

    previousState() {
        window.history.back();
    }

    trackByFn(item: any) {
        return item.id;
    }
}
