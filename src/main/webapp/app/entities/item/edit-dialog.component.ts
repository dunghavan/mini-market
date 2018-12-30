import { Component, Inject, OnInit } from '@angular/core';
import { ItemUpdateComponent } from 'app/entities/item/item-update.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-edit-dialog',
    templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent implements OnInit {
    constructor(
        public dialogref: MatDialogRef<ItemUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    new_item() {
        this.dialogref.close();
        this._router.navigate(['/item/new'], {});
    }

    back() {
        this.dialogref.close();
        this._router.navigate(['/item/'], {});
    }
}
