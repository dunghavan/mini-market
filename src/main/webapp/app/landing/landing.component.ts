
import { Component, OnInit } from '@angular/core';
import {ItemService} from 'app/entities/item';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IItem, Item} from 'app/shared/model/item.model';

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
    constructor(private itemService: ItemService) {
        this.current_selected_page = 1;
    }

    ngOnInit() {
        this.loadItems();
    }

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
