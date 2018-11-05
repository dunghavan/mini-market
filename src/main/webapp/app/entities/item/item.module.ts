import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MiniMarketSharedModule } from 'app/shared';
import {
    ItemComponent,
    ItemDetailComponent,
    ItemUpdateComponent,
    ItemDeletePopupComponent,
    ItemDeleteDialogComponent,
    itemRoute,
    itemPopupRoute
} from './';
import {ListItemComponent} from "app/landing/list-item.component";
import {ItemComponent2} from "app/item/item/item.component";

const ENTITY_STATES = [...itemRoute, ...itemPopupRoute];

@NgModule({
    imports: [MiniMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ItemComponent,
        ItemDetailComponent,
        ItemUpdateComponent,
        ItemDeleteDialogComponent,
        ItemDeletePopupComponent,
        ListItemComponent,
        ItemComponent2,
    ],
    entryComponents: [
        ItemComponent,
        ItemUpdateComponent,
        ItemDeleteDialogComponent,
        ItemDeletePopupComponent,
        ListItemComponent,
        ItemComponent2],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniMarketItemModule {}
