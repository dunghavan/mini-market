import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ItemComponent } from './item.component';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';
import { ItemDeletePopupComponent } from './item-delete-dialog.component';
import { IItem } from 'app/shared/model/item.model';
import { ItemDetailByCustomerComponent } from 'app/entities/item-detail-by-customer/item-detail-by-customer.component';

@Injectable({ providedIn: 'root' })
export class ItemResolve implements Resolve<IItem> {
    constructor(private service: ItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((item: HttpResponse<Item>) => item.body));
        }
        return of(new Item());
    }
}

export const itemRoute: Routes = [
    {
        path: 'item',
        component: ItemComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item/:id/view',
        component: ItemDetailComponent,
        resolve: {
            item: ItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item/new',
        component: ItemUpdateComponent,
        resolve: {
            item: ItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item/:id/edit',
        component: ItemUpdateComponent,
        resolve: {
            item: ItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item/:id/detail-by-customer',
        component: ItemDetailByCustomerComponent,
        resolve: {
            item: ItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: []
    }
];

export const itemPopupRoute: Routes = [
    {
        path: 'item/:id/delete',
        component: ItemDeletePopupComponent,
        resolve: {
            item: ItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
