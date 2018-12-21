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

import { ItemCardComponent } from 'app/entities/item-card/item-card.component';
import { ItemCardUserComponent } from 'app/entities/item-card-user/item-card-user.component';
import { ListItemComponent } from 'app/landing/landing.component';
import { EditDialogComponent } from 'app/entities/item/edit-dialog.component';

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
        EditDialogComponent
    ],
    entryComponents: [
        ItemComponent,
        ItemUpdateComponent,
        ItemDeleteDialogComponent,
        ItemDeletePopupComponent,
        ListItemComponent,
        ItemCardComponent,
        ItemCardUserComponent,
        EditDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniMarketItemModule {}
