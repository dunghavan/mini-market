import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'app/shared/model/item.model';
import { ImageService } from 'app/entities/image';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IImage, Image } from 'app/shared/model/image.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
    @Input() item: IItem;
    constructor(private imageService: ImageService, private _route: ActivatedRoute, private _router: Router) {}

    ngOnInit() {
        console.log('resutl: ', this.item);
        this.item.images = [];
        this.loadImages();
    }

    loadImages() {
        this.imageService.findByItemId(this.item.id).subscribe(
            (res: HttpResponse<IImage[]>) => {
                this.item.images = res.body;
                console.log('images: ', this.item);
            },
            (res: HttpErrorResponse) => {
                console.log('err: ', res);
            }
        );
    }

    view_item() {
        this._router.navigate(['/item', this.item.id, 'view'], {});
    }
}
