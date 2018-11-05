import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MiniMarketSharedModule } from 'app/shared';
import {
    TypeComponent,
    TypeDetailComponent,
    TypeUpdateComponent,
    TypeDeletePopupComponent,
    TypeDeleteDialogComponent,
    typeRoute,
    typePopupRoute
} from './';
import {ItemComponent} from "app/item/item/item.component";

const ENTITY_STATES = [...typeRoute, ...typePopupRoute];

@NgModule({
    imports: [MiniMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeComponent,
        TypeDetailComponent,
        TypeUpdateComponent,
        TypeDeleteDialogComponent,
        TypeDeletePopupComponent,
    ],
    entryComponents: [
        TypeComponent,
        TypeUpdateComponent,
        TypeDeleteDialogComponent,
        TypeDeletePopupComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniMarketTypeModule {}
