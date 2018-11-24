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
import {ListItemComponent} from 'app/landing/list-item.component';
import {ItemCardComponent} from 'app/entities/item-card/item-card.component';
import {ItemCardUserComponent} from 'app/entities/item-card-user/item-card-user.component';

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
        ItemCardComponent,
        ItemCardUserComponent,
    ],
    entryComponents: [
        ItemComponent,
        ItemUpdateComponent,
        ItemDeleteDialogComponent,
        ItemDeletePopupComponent,
        ListItemComponent,
        ItemCardComponent,
        ItemCardUserComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniMarketItemModule {}
