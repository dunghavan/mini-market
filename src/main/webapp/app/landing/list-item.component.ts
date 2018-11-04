import { ItemDes } from './../item/item-des.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
    MAX_ITEM_PER_PAGE = 10;
    MAX_PAGE = 10;
    MAX_DISPLAY_PAGE = 5;
    current_selected_page: number;
    item_in_page: Array<number>;
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
            this.item_in_page.push(0);
        }
    }
}
