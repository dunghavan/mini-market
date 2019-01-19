import { Component, Input, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ItemService } from 'app/entities/item';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Filter_Price, Filter_State, Filter_Status, Filter_type, IItem, Item, Sort } from 'app/shared/model/item.model';
import { AccountService, LoginService } from 'app/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { State } from 'app/shared/model/state.model';

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
    search: string;
    price: number;
    status: number;
    state: number;
    type: number;
    prices: Filter_Price;
    statuss: Filter_Status;
    states: Filter_State;
    types: Filter_type;
    Sort: Sort;
    sort: any;

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
        this.init_filter();
        this.init_sort();
    }

    ngOnInit() {
        this.init_filter();
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
            this.search = this._route.snapshot.queryParamMap.get('search');
        } else {
            this.search = '';
        }
        this.init_filter();
        this.max_item = 0;
        //this.loadItems();
        this.MAX_ITEM_PER_PAGE = 10;
        this.MAX_PAGE_TO_DISPLAY = 5;
        this.current_page = 1;
        this.current_list = 1;
        this.load_page();
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
        console.log(this.items);
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
        if (this.max_item > 0) {
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
    }

    next_page() {
        if (this.max_item > 0) {
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
    }

    first_page() {
        if (this.max_item > 0) {
            if (this.current_page != 1) {
                this.current_page = 1;
                if (this.current_list != 1) {
                    this.current_list = 1;
                    this.update_list();
                }
                this.load_page();
            }
        }
    }

    last_page() {
        if (this.max_item > 0) {
            if (this.current_page != this.number_of_page) {
                this.current_page = this.number_of_page;
                if (this.current_list != this.number_of_list) {
                    this.current_list = this.number_of_list;
                    this.update_list();
                }
                this.load_page();
            }
        }
    }

    //search=aokhoac&price=1&status=0&state=1&type=5
    load_page() {
        console.log('search ne');
        console.log(this.search);
        this.itemService
            .queryByCustomer({
                page: this.current_page - 1,
                size: this.MAX_ITEM_PER_PAGE,
                search: this.search,
                price: this.price,
                status: this.status,
                state: this.state,
                type: this.type,
                sort: this.sort
            })
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    /*sort()
    {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }*/

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
        if (this.max_item > 0) {
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

    init_filter() {
        this.prices = new Filter_Price();
        this.types = new Filter_type();
        this.states = new Filter_State();
        this.statuss = new Filter_Status();
        this.price = -1;
        this.status = -1;
        this.state = -1;
        this.type = -1;
    }

    get_filter() {
        if (this.prices.under100 == true) {
            if (this.price == -1) {
                this.price = 1;
            } else if (this.price != 1) {
                this.price = 1;
                this.prices.from100_1000 = false;
                this.prices.from1000_10000 = false;
                this.prices.over10000 = false;
            }
        }
        if (this.prices.from100_1000 == true) {
            if (this.price == -1) {
                this.price = 2;
            } else if (this.price != 2) {
                this.price = 2;
                this.prices.under100 = false;
                this.prices.from1000_10000 = false;
                this.prices.over10000 = false;
            }
        }
        if (this.prices.from1000_10000 == true) {
            if (this.price == -1) {
                this.price = 3;
            } else if (this.price != 3) {
                this.price = 3;
                this.prices.from100_1000 = false;
                this.prices.under100 = false;
                this.prices.over10000 = false;
            }
        }
        if (this.prices.over10000 == true) {
            if (this.price == -1) {
                this.price = 4;
            } else if (this.price != 4) {
                this.price = 4;
                this.prices.from100_1000 = false;
                this.prices.under100 = false;
                this.prices.from1000_10000 = false;
            }
        }

        if (
            this.prices.under100 == false &&
            this.prices.from100_1000 == false &&
            this.prices.from1000_10000 == false &&
            this.prices.over10000 == false
        ) {
            this.price = -1;
        }

        if (this.types.ao == true) {
            if (this.type == -1) {
                this.type = 1;
            } else if (this.type != 1) {
                this.type = 1;
                this.types.quan = false;
                this.types.giay_dep = false;
            }
        }
        if (this.types.quan == true) {
            if (this.type == -1) {
                this.type = 2;
            } else if (this.type != 2) {
                this.type = 2;
                this.types.ao = false;
                this.types.giay_dep = false;
            }
        }
        if (this.types.giay_dep == true) {
            if (this.type == -1) {
                this.type = 3;
            } else if (this.type != 3) {
                this.type = 3;
                this.types.quan = false;
                this.types.ao = false;
            }
        }
        if (this.types.ao == false && this.types.quan == false && this.types.giay_dep == false) {
            this.type = -1;
        }

        if (this.states.conhang == true) {
            if (this.state == -1) {
                this.state = 1;
            } else if (this.state != 1) {
                this.state = 1;
                this.states.hethang = false;
            }
        }
        if (this.states.hethang == true) {
            if (this.state == -1) {
                this.state = 2;
            } else if (this.state != 2) {
                this.state = 2;
                this.states.conhang = false;
            }
        }
        if (this.states.conhang == false && this.states.hethang == false) {
            this.state = -1;
        }

        if (this.statuss.moi == true) {
            if (this.status == -1) {
                this.status = 1;
            } else if (this.status != 1) {
                this.status = 1;
                this.statuss.cu = false;
            }
        }
        if (this.statuss.cu == true) {
            if (this.status == -1) {
                this.status = 2;
            } else if (this.status != 2) {
                this.status = 2;
                this.statuss.moi = false;
            }
        }
        if (this.statuss.cu == false && this.statuss.moi == false) {
            this.status = -1;
        }
        console.log(this.price);
        console.log(this.type);
        console.log(this.status);
        console.log(this.state);
        this.load_page();
    }

    init_sort() {
        this.Sort = new Sort();
        this.sort = ['id'];
    }

    get_sort(new_sort: number) {
        if (this.Sort.current_sort == -1) {
            this.Sort.current_sort = new_sort;
            switch (new_sort) {
                case 1:
                    this.Sort.name = true;
                    break;
                case 2:
                    this.Sort.date = true;
                    break;
                case 3:
                    this.Sort.price_low = true;
                    break;
                case 4:
                    this.Sort.price_high = true;
                    break;
                default:
            }
        } else if (this.Sort.current_sort == new_sort) {
            this.Sort.current_sort = -1;
            switch (new_sort) {
                case 1:
                    this.Sort.name = false;
                    break;
                case 2:
                    this.Sort.date = false;
                    break;
                case 3:
                    this.Sort.price_low = false;
                    break;
                case 4:
                    this.Sort.price_high = false;
                    break;
                default:
            }
        } else if (this.Sort.current_sort != new_sort) {
            switch (this.Sort.current_sort) {
                case 1:
                    this.Sort.name = false;
                    break;
                case 2:
                    this.Sort.date = false;
                    break;
                case 3:
                    this.Sort.price_low = false;
                    break;
                case 4:
                    this.Sort.price_high = false;
                    break;
                default:
            }
            this.Sort.current_sort = new_sort;
            switch (new_sort) {
                case 1:
                    this.Sort.name = true;
                    break;
                case 2:
                    this.Sort.date = true;
                    break;
                case 3:
                    this.Sort.price_low = true;
                    break;
                case 4:
                    this.Sort.price_high = true;
                    break;
                default:
            }
        }
        switch (this.Sort.current_sort) {
            case -1:
                this.sort = ['id'];
                break;
            case 1:
                this.sort = ['id', 'name', 'asc'];
                break;
            case 2:
                this.sort = ['id', 'date', 'asc'];
                break;
            case 3:
                this.sort = ['id', 'price', 'desc'];
                break;
            case 4:
                this.sort = ['id', 'price', 'asc'];
                break;
            default:
        }
        this.load_page();
        console.log(this.sort);
    }
}
