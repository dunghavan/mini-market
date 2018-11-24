import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IItem } from 'app/shared/model/item.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ItemService } from './item.service';

import { ItemDes } from 'app/entities/item-card/item-des.model'

@Component({
    selector: 'jhi-item',
    templateUrl: './item2.component.html',
    styleUrls: ['./item2.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

    item_des: ItemDes;
    MAX_ITEM_PER_PAGE = 10;
    MAX_PAGE = 10;
    MAX_DISPLAY_PAGE = 5;
    current_selected_page: number;
    item_in_page: Array<ItemDes>;

    currentAccount: any;
    items: IItem[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private itemService: ItemService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        this.current_selected_page = 1;
        this.get_item_id_in_page(this.current_selected_page);
    }

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

    loadAll() {
        this.itemService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IItem[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/item'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/item',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IItem) {
        return item.id;
    }

    registerChangeInItems() {
        this.eventSubscriber = this.eventManager.subscribe('itemListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateItems(data: IItem[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.items = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
