import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';

@Component({
    selector: 'jhi-item-update',
    templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
    private _item: IItem;
    isSaving: boolean;
    files: FileList;

    constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
    }

    previousState() {
        window.history.back();
    }

    handleFileInput(files: FileList) {
        this.files = files;
    }

    upLoadFiles() {
        const formData = new FormData();
        console.log('this.files: ', this.files);
        for (let i = 0; i < this.files.length; i++) {
            formData.append('file', this.files.item(i), this.files.item(i).name);
        }
        console.log('begin upload...: ');
        this.itemService.uploadFiles(formData).subscribe(
            (data) => {
                //this.myImage = data.body['name'];
                console.log('upload done with imageName: ', data.body);
            },
            (err: HttpErrorResponse) => {
                console.log('upload error: ', err);
                // this.uploadMessageError = err.message;
                // this.timer = setTimeout(() => this.uploadMessageError = null, 3000);
            }
        );
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
        result.subscribe((res: HttpResponse<IItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get item() {
        return this._item;
    }

    set item(item: IItem) {
        this._item = item;
    }
}
