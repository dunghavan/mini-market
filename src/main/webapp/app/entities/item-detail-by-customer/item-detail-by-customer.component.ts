import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IItem, Item } from 'app/shared/model/item.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ImageService } from 'app/entities/image';
import { ItemService } from 'app/entities/item';
import { Image } from 'app/shared/model/image.model';
declare var window: any;

@Component({
    selector: 'jhi-item-detail-by-customer',
    templateUrl: './item-detail-by-customer.component.html',
    styleUrls: [
        '../../assets/css/demo.css',
        '../../assets/css/light-bootstrap-dashboard.css?v=2.0.0',
        '../../assets/css/font-awesome.min.css',
        '../../assets/css/fonts.googleapis.com.css?family=Montserrat:400,700,200'
    ]
})
export class ItemDetailByCustomerComponent implements OnInit, AfterViewInit {
    item: IItem;
    displayingImage: Image;
    currentUrl = '';
    imgErrorSrc = "src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'";
    constructor(
        private activatedRoute: ActivatedRoute,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private itemService: ItemService,
        private router: Router
    ) {
        this.item = new Item();
        this.currentUrl = window.location.href;
    }

    ngOnInit() {
        console.log('run item detail by customer');
        this.route.params.subscribe(
            params => {
                if (params['id']) {
                    console.log('run item detail by customer id = ', params['id']);
                    this.getItem(params['id']);
                }
            },
            err => {
                console.log('get item id in params err: ', err);
            }
        );
    }

    ngAfterViewInit(): void {
        this.initFacebookCommentDiv();
        if (window === undefined) {
            console.log('--------------------------------------------window is undefined!');
        } else {
            window.FB.XFBML.parse();
        }
    }

    initFacebookCommentDiv() {
        const fbComment = document.getElementsByClassName('fb-comments');
        if (fbComment[0]) {
            fbComment[0].setAttribute('data-href', this.currentUrl);
        }
    }

    createFacebookAdmin(fbId: string) {
        const link = document.createElement('meta');
        link.setAttribute('property', 'fb:admins');
        link.content = fbId;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    getItem(id: number) {
        this.itemService.find(id).subscribe(
            (res: HttpResponse<IItem>) => {
                this.item = res.body;
                console.log('this.item: ', this.item);
                this.createFacebookAdmin(this.item.user.facebookId);
                this.viewImage();
            },
            (err: HttpErrorResponse) => {
                console.log('get item by id err: ', err);
            }
        );
    }

    // loadImages() {
    //     this.imageService.findByItemId(this.item.id).subscribe(
    //         (res: HttpResponse<IImage[]>) => {
    //             this.item.images = res.body;
    //             console.log('images: ', this.item);
    //             this.item.images.forEach((img, i) => {
    //                 this.item.images[i]['select'] = i === 0;
    //                 this.selectedImageName = this.item.images[0].name;
    //             });
    //         },
    //         (res: HttpErrorResponse) => {
    //             console.log('err: ', res);
    //         }
    //     );
    // }

    viewImage(index?: number) {
        index = index === undefined ? 0 : index;
        this.item.images.forEach((img, i) => {
            this.item.images[i]['select'] = false;
        });
        this.item.images[index]['select'] = true;
        this.displayingImage = this.item.images[index];
    }

    previousState() {
        window.history.back();
    }
}
