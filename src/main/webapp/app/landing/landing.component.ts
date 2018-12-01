import { Component, OnInit } from '@angular/core';
import { ItemService } from 'app/entities/item';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IItem, Item } from 'app/shared/model/item.model';
import { AccountService, LoginService } from 'app/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-list-item',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class ListItemComponent implements OnInit {
    items: IItem[];
    MAX_ITEM_PER_PAGE = 10;
    MAX_PAGE = 10;
    MAX_DISPLAY_PAGE = 5;
    current_selected_page: number;
    constructor(
        private itemService: ItemService,
        private accountService: AccountService,
        private authService: AuthService,
        private loginService: LoginService
    ) {
        this.current_selected_page = 1;
    }

    ngOnInit() {
        this.loadItems();
        this.authService.authState.subscribe(user => {
            console.log('state res: ', user);
            this.customLogin(user.authToken, user.id);
        });
    }
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, { redirect_uri: 'https://localhost:8081/api/login/' });
    }

    signOut(): void {
        this.authService.signOut();
    }

    fbLogin() {
        const url =
            'https://www.facebook.com/v3.2/dialog/oauth?client_id=2262704483961309&state=abc&redirect_uri=https://localhost:8081/api/login/';

        // const url = 'https://abc.vn';
        this.accountService.fbLogin(url).subscribe(
            (res: HttpResponse<SocialUser>) => {
                console.log('response: ', res);
                this.customLogin(res.body.authToken, res.body.id);
            },
            (err: any) => {
                console.log('login err: ', err);
            }
        );
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
            })
            .catch(() => {
                console.log('custom login err');
            });
    }
    // previous_page() {
    //     if (this.current_selected_page > 1) {
    //         this.current_selected_page -= 1;
    //         this.get_item_id_in_page(this.current_selected_page);
    //     }
    // }
    // next_page() {
    //     if (this.current_selected_page < this.MAX_PAGE) {
    //         this.current_selected_page += 1;
    //         this.get_item_id_in_page(this.current_selected_page);
    //     }
    // }
    // get_item_id_in_page(page_number: number) {
    //     this.item_in_page = [];
    //     for (let i = 0; i < this.MAX_ITEM_PER_PAGE; i++) {
    //         this.get_data();
    //         this.item_in_page.push(this.item_des);
    //     }
    // }

    loadItems() {
        this.itemService
            .queryByCustomer()
            .subscribe((res: HttpResponse<IItem[]>) => this.onSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    onSuccess(res: any) {
        this.items = res.body;
    }

    onError(res: any) {
        console.log('err: ', res);
    }
}
