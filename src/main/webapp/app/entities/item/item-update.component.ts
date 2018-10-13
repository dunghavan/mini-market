import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';


interface ModalMessage {
    isShow: boolean,
    msg: string
}

@Component({
    selector: 'jhi-item-update',
    templateUrl: './item-update.component.html'
})

export class ItemUpdateComponent implements OnInit {
    private _item: IItem;
    isSaving: boolean;
    files: FileList;
    errorMessage: ModalMessage;
    successMessage: ModalMessage;

    constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.errorMessage = {isShow: false, msg: ''};
        this.successMessage = {isShow: false, msg: ''};
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
    }

    previousState() {
        window.history.back();
    }

    handleFileInput(event: any) {
        this.files = event.target.files;

        // preview image before upload
        if (event.target.files && event.target.files.length !== 0) {
            for(let i = 0; i < this.files.length; i++) {
                const reader = new FileReader();

                reader.readAsDataURL(this.files[i]); // read file as data url
                reader.onload = (_event) => { // called once readAsDataURL is completed
                    this.files[i]['tempUrl'] = _event.target.result;
                }
            }
        }
    }

    upLoadFiles(itemId: number) {
        const formData = new FormData();
        console.log('this.files: ', this.files);
        for (let i = 0; i < this.files.length; i++) {
            formData.append('file', this.files.item(i), this.files.item(i).name);
        }
        formData.set('itemId', String(itemId));
        console.log('begin upload...: ');
        this.itemService.uploadFiles(formData).subscribe(
            (res) => this.onUploadSuccess(res.body),
            (err: HttpErrorResponse) => this.onUploadError(err.message)
        );
    }

    private onUploadSuccess(result: any) {
        this.isSaving = false;
        console.log('upload done: ', result);
        this.showSuccessMsg('upload images success');
    }
    private onUploadError(msg: string) {
        this.isSaving = false;
        console.log('upload error: ', msg);
        this.showErrorMsg('upload images failed');
    }

    save() {
        this.isSaving = true;
        if (this.item.id !== undefined) {
            this.subscribeToSaveResponse(this.itemService.update(this.item));
        } else {
            this.subscribeToSaveResponse(this.itemService.create(this.item));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
        result.subscribe((res: HttpResponse<IItem>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError(res.message));
    }

    private onSaveSuccess(result: IItem) {
        this.isSaving = false;
        this.upLoadFiles(result.id);
        this.showSuccessMsg("save item success");
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

    get item() {
        return this._item;
    }

    set item(item: IItem) {
        this._item = item;
    }
}
