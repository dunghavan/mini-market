import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItem } from 'app/shared/model/item.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IImage } from 'app/shared/model/image.model';
import { ItemService } from 'app/entities/item';
import { ImageService } from 'app/entities/image';

@Component({
    selector: 'jhi-item-detail-by-customer',
    templateUrl: './item-detail-by-customer.component.html'
})
export class ItemDetailByCustomerComponent implements OnInit {
    item: IItem;
    imgErrorSrc = "src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'";
    selectedImageName: string;
    constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
            this.item.images = [];
            this.loadImages();
        });
    }

    loadImages() {
        this.imageService.findByItemId(this.item.id).subscribe(
            (res: HttpResponse<IImage[]>) => {
                this.item.images = res.body;
                console.log('images: ', this.item);
                this.item.images.forEach((img, i) => {
                    this.item.images[i]['select'] = i === 0;
                    this.selectedImageName = this.item.images[0].name;
                });
            },
            (res: HttpErrorResponse) => {
                console.log('err: ', res);
            }
        );
    }

    viewImage(index) {
        this.item.images.forEach((img, i) => {
            this.item.images[i]['select'] = false;
        });
        this.item.images[index]['select'] = true;
        this.selectedImageName = this.item.images[index].name;
    }

    previousState() {
        window.history.back();
    }
}
