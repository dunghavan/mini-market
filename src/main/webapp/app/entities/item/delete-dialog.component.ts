import { Component, Inject, OnInit } from '@angular/core';
import { ItemUpdateComponent } from 'app/entities/item/item-update.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemService } from 'app/entities/item/item.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ItemCardUserComponent } from 'app/entities/item-card-user/item-card-user.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-delete-dialog',
    templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent implements OnInit {
    constructor(
        private itemService: ItemService,
        //public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        public dialogref: MatDialogRef<ItemCardUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    delete_item() {
        this.dialogref.close();
        this.confirmDelete(this.data.id);
        this._router.navigate(['/item/'], {});
    }

    confirmDelete(id: number) {
        console.log(id);
        this.itemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'itemListModification',
                content: 'Deleted an item'
            });
            //this.activeModal.dismiss(true);
        });
    }

    back() {
        this.dialogref.close();
    }
}
