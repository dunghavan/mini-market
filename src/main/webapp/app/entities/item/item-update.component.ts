import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { IType, Type } from 'app/shared/model/type.model';
import { TypeService } from 'app/entities/type';
import { Status } from 'app/shared/model/status.model';
import { State } from 'app/shared/model/state.model';
import { MatDialog } from '@angular/material';
import { ImageService } from 'app/entities/image';
import { Location as _Location } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogComponent } from 'app/shared/dialog/success-dialog.component';
import { LoginService, Principal } from 'app/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { JhiEventManager } from 'ng-jhipster';

interface ModalMessage {
    isShow: boolean;
    msg: string;
}

@Component({
    selector: 'jhi-item-update',
    templateUrl: './item-update.component.html',
    styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {
    private _item: IItem;
    public types: IType[];
    isSaving: boolean;
    files: FileList;
    errorMessage: ModalMessage;
    successMessage: ModalMessage;
    avais: Status[];
    avai: Status;
    states: State[];
    state: State;
    curType: Type;
    popupRef: NgbModalRef;
    DEFAULT_TYPE: Type = { id: -1, name: 'Chọn loại mặt hàng' };
    isAuthenticate = false;

    constructor(
        private itemService: ItemService,
        private activatedRoute: ActivatedRoute,
        private typeService: TypeService,
        public dialog: MatDialog,
        private _route: ActivatedRoute,
        private _router: Router,
        private imageService: ImageService,
        private _location: _Location,
        private modalService: NgbModal,
        private principal: Principal,
        private authService: AuthService,
        private loginService: LoginService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.errorMessage = { isShow: false, msg: '' };
        this.successMessage = { isShow: false, msg: '' };
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
            // this.curType = this.item.type;
            // console.log('this.curType: ', this.curType);
        });
        this.types = [];
        this.curType = { id: 3, name: 'Ao', desc: null };
        console.log('this.item: ', this.item);
        this.avais = Status.getStatus();
        this.avai = this.item.isAvailable ? this.avais[0] : this.avais[1];
        this.states = State.getStates();
        this.state = this.item.state ? this.states[0] : this.states[1];
        this.loadTypes();
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
        console.log('run customLogin from item-update.component: ', fbId + fbToken);
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
                this.isAuthenticated();
            })
            .catch(() => {
                console.log('custom login err');
            });
    }

    isAuthenticated() {
        // console.log('navbar call isAuthenticated() ' + this.i);
        // this.i++;
        this.isAuthenticate = this.principal.isAuthenticated();
        return this.isAuthenticate;
    }

    openDialog(): void {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = undefined;
        }
        this.popupRef = this.modalService.open(SuccessDialogComponent as Component, { backdrop: 'static', centered: true });
        this.popupRef.result.then(
            res => {
                console.log('add box response: ', res);
            },
            reason => {
                console.log('add box rejected: ', reason);
            }
        );
    }

    loadTypes() {
        this.typeService.query().subscribe(
            (res: HttpResponse<IType[]>) => {
                this.types = [];
                this.types.push(this.DEFAULT_TYPE);
                this.types.push(...res.body);
                if (this.item.type === null || this.item.type === undefined) {
                    this.item.type = this.DEFAULT_TYPE;
                }
                console.log('this.types: ', this.types);
                console.log('this.item.type: ', this.item.type);
            },
            (res: HttpErrorResponse) => {
                console.log('get types err: ', res);
            }
        );
    }

    public backToPreviousPage() {
        console.log('go back...');
        this._location.back();
    }

    handleFileInput(event: any) {
        this.files = event.target.files;
        console.log('this.files: ', this.files);
        this.previewFiles();
    }
    previewFiles() {
        // preview image before upload
        if (this.files !== undefined && this.files.length !== 0) {
            for (let i = 0; i < this.files.length; i++) {
                const reader = new FileReader();

                reader.readAsDataURL(this.files[i]); // read file as data url
                reader.onload = _event => {
                    // called once readAsDataURL is completed
                    // @ts-ignore
                    this.files[i]['tempUrl'] = _event.target.result;
                };
            }
        }
    }

    upLoadFiles(itemId: number) {
        const formData = new FormData();
        console.log('this.files: ', this.files);
        if (this.files === undefined || this.files.length === 0) {
            return;
        }
        for (let i = 0; i < this.files.length; i++) {
            formData.append('file', this.files.item(i), this.files.item(i).name);
        }
        formData.set('itemId', String(itemId));
        console.log('begin upload...: ');
        this.itemService
            .uploadFiles(formData)
            .subscribe(res => this.onUploadSuccess(res.body), (err: HttpErrorResponse) => this.onUploadError(err.message));
    }

    private onUploadSuccess(result: any) {
        this.isSaving = false;
        console.log('upload done: ', result);
        this.showSuccessMsg('upload images success');
        this.openDialog();
    }
    private onUploadError(msg: string) {
        this.isSaving = false;
        console.log('upload error: ', msg);
        this.showErrorMsg('upload images failed');
    }

    save() {
        this.item.isAvailable = this.avai.id === 1;
        this.item.state = this.state.id === 1;
        console.log('save item: ', this.item);
        this.isSaving = true;
        if (this.item.id !== undefined) {
            this.subscribeToSaveResponse(this.itemService.update(this.item));
        } else {
            this.subscribeToSaveResponse(this.itemService.create(this.item));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
        result.subscribe(
            (res: HttpResponse<IItem>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError(res.message)
        );
    }

    private onSaveSuccess(result: IItem) {
        this.isSaving = false;
        this.upLoadFiles(result.id);
        this.showSuccessMsg('save item success');
    }
    private onSaveError(err: string) {
        this.isSaving = false;
        this.showErrorMsg('save item failed');
    }

    showSuccessMsg(_msg: string) {
        this.errorMessage.isShow = false;

        this.successMessage.isShow = true;
        this.successMessage.msg = _msg;
    }
    showErrorMsg(_msg: string) {
        this.successMessage.isShow = false;

        this.errorMessage.isShow = true;
        this.errorMessage.msg = _msg;
    }

    trackByFn(item: any) {
        return item.id;
    }

    compareType(a, b: Type): boolean {
        if (a !== undefined && b !== undefined) {
            return a.id === b.id;
        }
        return false;
    }

    get item() {
        return this._item;
    }

    set item(item: IItem) {
        this._item = item;
    }
}
