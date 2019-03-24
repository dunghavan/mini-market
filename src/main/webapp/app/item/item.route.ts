import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'app/shared/model/item.model';
import { IItem } from 'app/shared/model/item.model';
import { DetailComponent } from 'app/item/detail.component';
import { ItemService } from 'app/item/item.service';

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
        path: 'detail',
        component: DetailComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'miniMarketApp.item.home.title'
        },
        canActivate: []
    }
];
