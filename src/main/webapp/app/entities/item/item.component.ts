import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { IItem } from 'app/shared/model/item.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ItemService } from './item.service';
import { NavigationEnd } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { Subscriber, Subscription } from 'rxjs';

@Component({
    selector: 'jhi-item',
    templateUrl: './item2.component.html',
    styleUrls: ['./item2.component.css']
})
export class ItemComponent implements OnInit {
    items: IItem[];
    MAX_ITEM_PER_PAGE: number;
    MAX_PAGE_TO_DISPLAY: number;
    max_item: number;
    current_page: number;
    current_list: number;
    last_list: number;
    number_of_page_to_display: number;
    number_of_page: number;
    number_of_list: number;
    list_page: number[];
    eventSubscriber: Subscription;

    constructor(private itemService: ItemService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.max_item = 0;
        //this.loadItems();
        this.MAX_ITEM_PER_PAGE = 10;
        this.MAX_PAGE_TO_DISPLAY = 5;
        this.current_page = 1;
        this.current_list = 1;
        this.load_page();
        //this.registerChangeInImages();
    }
    registerChangeInImages() {
        this.eventSubscriber = this.eventManager.subscribe('itemListModification', response => this.loadItems());
    }
    loadItems() {
        this.itemService
            .queryByCustomer()
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    onSuccess(res: any) {
        this.items = res.body;
        if (this.max_item == 0) {
            this.max_item = parseInt(res.headers.get('X-Total-Count'), 10);
            this.list_init();
        }
        window.scroll(0, 0);
    }

    onError(res: any) {
        console.log('err: ', res);
    }

    set_page(page: number) {
        if (this.current_page != page) {
            this.current_page = page;
            this.load_page();
            console.log('++++++++++++++++++++++++++++++++++++++++++++++');
        }
    }

    previous_page() {
        if (this.max_item > 0) {
            this.current_page--;
            if (this.current_page < 1) {
                this.current_page = 1;
            } else {
                if (this.current_list != 1) {
                    if (this.current_page <= (this.number_of_list - 1) * this.MAX_PAGE_TO_DISPLAY) {
                        this.current_list--;
                        this.update_list();
                    }
                }
                this.load_page();
            }
        }
    }

    next_page() {
        if (this.max_item > 0) {
            this.current_page++;
            if (this.current_page > this.number_of_page) {
                this.current_page = this.number_of_page;
            } else {
                if (this.current_list != this.number_of_list) {
                    if (this.current_page > this.number_of_list * this.MAX_PAGE_TO_DISPLAY) {
                        this.current_list++;
                        this.update_list();
                    }
                }
                this.load_page();
            }
        }
    }

    first_page() {
        if (this.max_item > 0) {
            if (this.current_page != 1) {
                this.current_page = 1;
                if (this.current_list != 1) {
                    this.current_list = 1;
                    this.update_list();
                }
                this.load_page();
            }
        }
    }

    last_page() {
        if (this.max_item > 0) {
            if (this.current_page != this.number_of_page) {
                this.current_page = this.number_of_page;
                if (this.current_list != this.number_of_list) {
                    this.current_list = this.number_of_list;
                    this.update_list();
                }
                this.load_page();
            }
        }
    }

    load_page() {
        this.itemService
            .queryByCustomer({
                page: this.current_page - 1,
                size: this.MAX_ITEM_PER_PAGE,
                search: '',
                price: -1,
                status: -1,
                state: -1,
                type: -1,
                sort: -1
            })
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    update_list() {
        if (this.current_list === this.number_of_list) {
            this.number_of_page_to_display = this.last_list;
        } else {
            this.number_of_page_to_display = this.MAX_PAGE_TO_DISPLAY;
        }
        var iter;
        this.list_page = [];
        for (iter = 0; iter < this.number_of_page_to_display; iter++) {
            this.list_page[iter] = (this.number_of_list - 1) * this.MAX_PAGE_TO_DISPLAY + iter + 1;
        }
    }

    list_init() {
        if (this.max_item > 0) {
            console.log('---------------------------------->>>>>>>>>>>>>>>>');
            this.number_of_page = Math.floor(this.max_item / this.MAX_ITEM_PER_PAGE);
            if (this.max_item % this.MAX_ITEM_PER_PAGE > 0) {
                this.number_of_page++;
            }
            console.log(this.number_of_page);
            this.number_of_list = Math.floor(this.number_of_page / this.MAX_PAGE_TO_DISPLAY);
            this.last_list = this.number_of_page % this.MAX_PAGE_TO_DISPLAY;
            if (this.last_list > 0) {
                this.number_of_list++;
            }
            console.log(this.number_of_list);
            this.update_list();
            console.log('---------------------------------->>>>>>>>>>>>>>>>');
        }
    }
}
