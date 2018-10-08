import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MiniMarketItemModule } from './item/item.module';
import { MiniMarketImageModule } from './image/image.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MiniMarketItemModule,
        MiniMarketImageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniMarketEntityModule {}
