import { Component, OnInit } from '@angular/core';

import { IItem, user } from 'app/shared/model/item.model';
import { IImage } from 'app/shared/model/image.model';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-item-detail',
    templateUrl: './detail.component.html',
    styleUrls: [
        '../../content/css/bootstrap.css',
        '../../content/css/etalage.css',
        '../../content/css/megamenu.css',
        '../../content/css/style.css'
    ]
})
export class DetailComponent implements OnInit {
    item: IItem;
    user: user;
    images: IImage[];

    constructor() {}

    ngOnInit() {
        console.log('Run detail component.ts');
        this.animation();
    }

    animation() {
        $(document).ready(function() {
            $('.tab1 .single-bottom').hide();
            $('.tab2 .single-bottom').hide();
            $('.tab3 .w_nav2').hide();
            $('.tab4 .single-bottom').hide();
            $('.tab5 .star-at').hide();
            $('.tab1 ul').click(function() {
                $('.tab1 .single-bottom').slideToggle(300);
                $('.tab2 .single-bottom').hide();
                $('.tab3 .w_nav2').hide();
                $('.tab4 .single-bottom').hide();
                $('.tab5 .star-at').hide();
            });
            $('.tab2 ul').click(function() {
                $('.tab2 .single-bottom').slideToggle(300);
                $('.tab1 .single-bottom').hide();
                $('.tab3 .w_nav2').hide();
                $('.tab4 .single-bottom').hide();
                $('.tab5 .star-at').hide();
            });
            $('.tab3 ul').click(function() {
                $('.tab3 .w_nav2').slideToggle(300);
                $('.tab4 .single-bottom').hide();
                $('.tab5 .star-at').hide();
                $('.tab2 .single-bottom').hide();
                $('.tab1 .single-bottom').hide();
            });
            $('.tab4 ul').click(function() {
                $('.tab4 .single-bottom').slideToggle(300);
                $('.tab5 .star-at').hide();
                $('.tab3 .w_nav2').hide();
                $('.tab2 .single-bottom').hide();
                $('.tab1 .single-bottom').hide();
            });
            $('.tab5 ul').click(function() {
                $('.tab5 .star-at').slideToggle(300);
                $('.tab4 .single-bottom').hide();
                $('.tab3 .w_nav2').hide();
                $('.tab2 .single-bottom').hide();
                $('.tab1 .single-bottom').hide();
            });
        });
    }
}
