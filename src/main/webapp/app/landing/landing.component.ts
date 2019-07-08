import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'app/entities/item';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IItem } from 'app/shared/model/item.model';
import { AccountService, LoginService } from 'app/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// declare var $: any;
import * as $ from 'jquery';

@Component({
    selector: 'jhi-app-list-item',
    templateUrl: './landing.component.html',
    styleUrls: [
        '../../content/css/bootstrap.css',
        '../../content/css/etalage.css',
        '../../content/css/megamenu.css',
        '../../content/css/style.css'
    ]
})
export class ListItemComponent implements OnInit, OnDestroy {
    items: IItem[];
    subscription: any;
    page: number;
    itemsPerPage: number;
    total: number;
    comboItemCount: number[];
    doneLoad: boolean;
    bestViewItems: IItem[];

    constructor(
        private itemService: ItemService,
        private accountService: AccountService,
        private authService: AuthService,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.doneLoad = false;
        this.subscription = this._router.events.filter(event => event instanceof NavigationEnd).subscribe(value => {
            this.get_search();
        });
    }

    ngOnInit() {
        this.animation();
        this.page = 0;
        this.itemsPerPage = 9;
        this.total = 0;
        this.loadItems();
        this.authService.authState.subscribe(
            user => {
                console.log('state res: ', user);
                this.customLogin(user.authToken, user.id);
            },
            err => {
                console.log('check state err: ', err);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    get_search() {
        console.log('---------------------------------------------------');
        console.log(this._route.snapshot.queryParamMap.has('search'));
        if (this._route.snapshot.queryParamMap.has('search')) {
            console.log(this._route.snapshot.queryParamMap.get('search'));
        }
        console.log('---------------------------------------------------');
    }

    signInWithFB(): void {
        this.authService
            .signIn(FacebookLoginProvider.PROVIDER_ID, { redirect_uri: 'https://minimarket.vn/api/login' })
            .then(user => {
                console.log('fb login success: ', user);
                this.customLogin(user.authToken, user.id);
            })
            .catch(err => {
                console.log('fb login err: ', err);
            });
    }

    customLogin(fbToken: string, fbId: string) {
        console.log('run customLogin: ', fbId + fbToken);
        this.loginService
            .login({
                username: 'abcdefgh',
                password: '12345678',
                fbId,
                fbToken,
                rememberMe: true
            })
            .then(() => {
                console.log('custom login success');
                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });
            })
            .catch(() => {
                console.log('custom login err');
            });
    }

    loadItems() {
        this.doneLoad = false;
        const params = {
            limit: this.itemsPerPage,
            offset: (this.page - 1) * this.itemsPerPage
        };
        this.itemService
            .queryByCustomer(params)
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    loadBestViewItem() {
        // TODO call to server here...
        const end = this.items.length >= 6 ? 6 : this.items.length;
        this.bestViewItems = this.items.slice(0, end);
        console.log('list bestViewItems: ', this.bestViewItems);
    }
    onSuccess(res: any) {
        this.items = res.body;
        console.log('list item: ', this.items);
        const remain = this.items.length % 3;
        let count = Math.floor(this.items.length / 3);
        if (remain > 0) {
            count += 1;
        }
        this.comboItemCount = new Array(count);
        this.total = parseInt(res.headers.get('x-total-count'), 10);
        this.doneLoad = true;
        this.loadBestViewItem();
        // window.scroll(0, 0);
    }

    onError(res: any) {
        console.log('err: ', res);
    }

    loadPage(event) {
        console.log('call page change: ', event);
        this.loadItems();
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
