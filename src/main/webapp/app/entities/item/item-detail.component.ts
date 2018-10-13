import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItem } from 'app/shared/model/item.model';
import {IImage} from 'app/shared/model/image.model';
import {ImageService} from 'app/entities/image';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-item-detail',
    templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
    item: IItem;
    images: IImage[];

    constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
            this.loadImages();
        });
    }

    loadImages() {
        const requestOption = {
            page: 0,
            size: 10,
            sort: ['id']
        };
        this.imageService.findByItemId(this.item.id, requestOption)
            .subscribe(
                (res: HttpResponse<IImage[]>) => this.onSuccess(res.body),
                (err: HttpErrorResponse) => this.onError(err.message)
            );
    }

    onSuccess(images: IImage[]) {
        this.images = images;
        console.log('get images success: ', this.images);
    }

    onError(msg: string) {
        console.log('get images err: ', msg);
    }

    previousState() {
        window.history.back();
    }

    trackByFn(item: any) {
        return item.id;
    }
}
