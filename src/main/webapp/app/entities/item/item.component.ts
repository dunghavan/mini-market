import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IItem } from 'app/shared/model/item.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ItemService } from './item.service';

@Component({
    selector: 'jhi-item',
    templateUrl: './item2.component.html',
    styleUrls: ['./item2.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
    items: IItem[];

    constructor(
        private itemService: ItemService,
    ) {
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
