import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'app/shared/model/item.model';
import { ImageService } from 'app/entities/image';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IImage, Image } from 'app/shared/model/image.model';
import { ItemDeleteDialogComponent } from 'app/entities/item';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/entities/item/delete-dialog.component';

@Component({
    selector: 'app-item-card-user',
    templateUrl: './item-card-user.component.html',
    styleUrls: ['./item-card-user.component.css']
})
export class ItemCardUserComponent implements OnInit {
    @Input() item: IItem;
    constructor(private imageService: ImageService, public dialog: MatDialog) {}

    ngOnInit() {
        console.log('resutl: ', this.item);
        this.item.images = [];
        this.loadImages();
    }

    loadImages() {
        this.imageService.findByItemId(this.item.id).subscribe(
            (res: HttpResponse<IImage[]>) => {
                this.item.images = res.body;
                console.log('images: ', this.item);
            },
            (res: HttpErrorResponse) => {
                console.log('err: ', res);
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                id: this.item.id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
