import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponent2 } from './item-detail.component';

describe('ItemDetailComponent', () => {
    let component: ItemDetailComponent2;
    let fixture: ComponentFixture<ItemDetailComponent2>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ItemDetailComponent2]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailComponent2);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
