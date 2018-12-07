import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItem } from 'app/shared/model/item.model';
import { IImage } from 'app/shared/model/image.model';
import { ImageService } from 'app/entities/image';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-item-detail',
    templateUrl: './item-detail.component2.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
    item: IItem;
    images: IImage[];
    current_image_select: number;
    current_image_url: string;
    current_image_name: string;
    number_of_image: number;

    constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
            console.log('item: ', this.item);
            this.loadImages();
        });
    }

    showImage(imgName: string) {
        var iter;
        for (iter = 0; iter < this.images.length; iter++) {
            if (this.images[iter].name === imgName) {
                this.current_image_select = iter;
            }
        }
        this.updateImage();
    }
    next_image() {
        this.current_image_select++;
        if (this.current_image_select >= this.images.length) {
            this.current_image_select = 0;
        }
        this.updateImage();
    }

    previous_image() {
        this.current_image_select--;
        if (this.current_image_select < 0) {
            this.current_image_select = this.images.length - 1;
        }
        this.updateImage();
    }

    loadImages() {
        const requestOption = {
            page: 0,
            size: 10,
            sort: ['id']
        };
        this.imageService
            .findByItemId(this.item.id, requestOption)
            .subscribe((res: HttpResponse<IImage[]>) => this.onSuccess(res.body), (err: HttpErrorResponse) => this.onError(err.message));
    }

    onSuccess(images: IImage[]) {
        this.images = images;
        console.log('get images success: ', this.images);
        this.number_of_image = this.images.length;
        this.current_image_select = 0;
        this.updateImage();
    }

    updateImage() {
        if (this.number_of_image > 0) {
            this.current_image_url = 'http://localhost:8888/' + this.images[this.current_image_select].name;
            this.current_image_name = this.images[this.current_image_select].name;
        }
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
