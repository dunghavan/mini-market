import { Component, Input, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ItemService } from 'app/entities/item';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IItem, Item } from 'app/shared/model/item.model';
import { AccountService, LoginService } from 'app/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-list-item',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {
    items: IItem[];
    subscription: any;
    MAX_ITEM_PER_PAGE: number;
    MAX_PAGE_TO_DISPLAY: number;
    max_item: number;
    current_page: number;
    current_list: number;
    last_list: number;
    number_of_page_to_display: number;
    number_of_page: number;
    number_of_list: number;
    list_page: number[];

    constructor(
        private itemService: ItemService,
        private accountService: AccountService,
        private authService: AuthService,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.subscription = this._router.events.filter(event => event instanceof NavigationEnd).subscribe(value => {
            this.get_search();
        });
    }

    ngOnInit() {
        this.max_item = 0;
        //this.loadItems();
        this.MAX_ITEM_PER_PAGE = 10;
        this.MAX_PAGE_TO_DISPLAY = 5;
        this.current_page = 1;
        this.current_list = 1;
        this.load_page();
        this.authService.authState.subscribe(
            user => {
                console.log('state res: ', user);
                // this.customLogin(user.authToken, user.id);
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
                fbId: fbId,
                fbToken: fbToken,
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
        this.itemService
            .queryByCustomer()
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    onSuccess(res: any) {
        this.items = res.body;
        if (this.max_item == 0) {
            this.max_item = parseInt(res.headers.get('X-Total-Count'), 10);
            this.list_init();
        }
        window.scroll(0, 0);
    }

    onError(res: any) {
        console.log('err: ', res);
    }

    set_page(page: number) {
        if (this.current_page != page) {
            this.current_page = page;
            this.load_page();
        }
    }

    previous_page() {
        this.current_page--;
        if (this.current_page < 1) {
            this.current_page = 1;
        } else {
            if (this.current_list != 1) {
                if (this.current_page <= (this.number_of_list - 1) * this.MAX_PAGE_TO_DISPLAY) {
                    this.current_list--;
                    this.update_list();
                }
            }
            this.load_page();
        }
    }

    next_page() {
        this.current_page++;
        if (this.current_page > this.number_of_page) {
            this.current_page = this.number_of_page;
        } else {
            if (this.current_list != this.number_of_list) {
                if (this.current_page > this.number_of_list * this.MAX_PAGE_TO_DISPLAY) {
                    this.current_list++;
                    this.update_list();
                }
            }
            this.load_page();
        }
    }

    first_page() {
        if (this.current_page != 1) {
            this.current_page = 1;
            if (this.current_list != 1) {
                this.current_list = 1;
                this.update_list();
            }
            this.load_page();
        }
    }

    last_page() {
        if (this.current_page != this.number_of_page) {
            this.current_page = this.number_of_page;
            if (this.current_list != this.number_of_list) {
                this.current_list = this.number_of_list;
                this.update_list();
            }
            this.load_page();
        }
    }

    load_page() {
        this.itemService
            .query({
                page: this.current_page - 1,
                size: this.MAX_ITEM_PER_PAGE
            })
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    update_list() {
        if (this.current_list === this.number_of_list) {
            this.number_of_page_to_display = this.last_list;
        } else {
            this.number_of_page_to_display = this.MAX_PAGE_TO_DISPLAY;
        }
        var iter;
        this.list_page = [];
        for (iter = 0; iter < this.number_of_page_to_display; iter++) {
            this.list_page[iter] = (this.number_of_list - 1) * this.MAX_PAGE_TO_DISPLAY + iter + 1;
        }
    }

    list_init() {
        console.log('---------------------------------->>>>>>>>>>>>>>>>');
        this.number_of_page = Math.floor(this.max_item / this.MAX_ITEM_PER_PAGE);
        if (this.max_item % this.MAX_ITEM_PER_PAGE > 0) {
            this.number_of_page++;
        }
        console.log(this.number_of_page);
        this.number_of_list = Math.floor(this.number_of_page / this.MAX_PAGE_TO_DISPLAY);
        this.last_list = this.number_of_page % this.MAX_PAGE_TO_DISPLAY;
        if (this.last_list > 0) {
            this.number_of_list++;
        }
        console.log(this.number_of_list);
        this.update_list();
        console.log('---------------------------------->>>>>>>>>>>>>>>>');
    }
}
