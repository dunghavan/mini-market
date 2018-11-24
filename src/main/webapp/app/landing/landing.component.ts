
import { Component, OnInit } from '@angular/core';
import {ItemDes} from 'app/entities/item-card/item-des.model'
import {ItemService} from "app/entities/item";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IItem, Item} from "app/shared/model/item.model";

@Component({
    selector: 'app-list-item',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class ListItemComponent implements OnInit {
    items: IItem[];
    MAX_ITEM_PER_PAGE = 10;
    MAX_PAGE = 10;
    MAX_DISPLAY_PAGE = 5;
    current_selected_page: number;
    item_in_page: Array<ItemDes>;
    constructor(private itemService: ItemService) {
        this.current_selected_page = 1;
    }

    ngOnInit() {
        this.loadItems();
    }
    // previous_page() {
    //     if (this.current_selected_page > 1) {
    //         this.current_selected_page -= 1;
    //         this.get_item_id_in_page(this.current_selected_page);
    //     }
    // }
    // next_page() {
    //     if (this.current_selected_page < this.MAX_PAGE) {
    //         this.current_selected_page += 1;
    //         this.get_item_id_in_page(this.current_selected_page);
    //     }
    // }
    // get_item_id_in_page(page_number: number) {
    //     this.item_in_page = [];
    //     for (let i = 0; i < this.MAX_ITEM_PER_PAGE; i++) {
    //         this.get_data();
    //         this.item_in_page.push(this.item_des);
    //     }
    // }

    loadItems() {
        this.itemService.queryByCustomer().subscribe(
            (res: HttpResponse<IItem[]>) => this.onSuccess(res),
            (res: HttpErrorResponse) => this.onError(res)
        );
    }

    onSuccess(res: any) {
        this.items = res.body;
    }

    onError(res: any) {
        console.log('err: ', res);
    }
}
