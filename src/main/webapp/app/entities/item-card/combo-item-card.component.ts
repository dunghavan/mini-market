import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'app/shared/model/item.model';
import { ImageService } from 'app/entities/image';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IImage, Image } from 'app/shared/model/image.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-combo-item-card',
    templateUrl: './combo-item-card.component.html',
    styleUrls: [
        '../../../content/css/bootstrap.css',
        '../../../content/css/etalage.css',
        '../../../content/css/megamenu.css',
        '../../../content/css/style.css'
    ]
})
export class ComboItemCardComponent implements OnInit {
    @Input() item_1: IItem;
    @Input() item_2: IItem;
    @Input() item_3: IItem;
    items: IItem[];
    constructor(private imageService: ImageService, private _route: ActivatedRoute, private _router: Router) {}

    ngOnInit() {
        this.initArray();
    }

    initArray() {
        this.items = [];
        if (this.item_1) {
            this.items.push(this.item_1);
        }
        if (this.item_2) {
            this.items.push(this.item_2);
        }
        if (this.item_3) {
            this.items.push(this.item_3);
        }
        console.log('array result: ', this.items);
        this.loadImages();
    }

    loadImages() {
        for (let i = 0; i < this.items.length; i++) {
            this.imageService.findByItemId(this.items[i].id).subscribe(
                (res: HttpResponse<IImage[]>) => {
                    this.items[i].images = res.body;
                    // console.log('images: ', this.item.images);
                },
                (res: HttpErrorResponse) => {
                    console.log('load images of item err: ', res);
                }
            );
        }
    }

    view_item(id) {
        this._router.navigate(['/item', id, 'detail-by-customer'], {});
    }
}
