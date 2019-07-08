import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-success-dialog',
    template: `
            <div class="modal modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thông báo</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close" (click)="close()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="modal-form">
                        Mặt hàng đã được thêm thành công.
                        Bạn có muốn thêm mới mặt hàng khác?
                    </div>
                    <div class="g-button text-center">
                        <a class="btn btn-outline-dark btn-lg" (click)="close()">Hủy</a>
                        <a class="btn btn-primary btn-lg" (click)="goToOtherPage()">Thêm</a>
                    </div>
                </div>
            </div>
        `
})
export class SuccessDialogComponent implements OnInit {
    constructor(private activeModal: NgbActiveModal) {}

    ngOnInit(): void {}

    goToOtherPage() {
        // TODO go to another here...
        this.activeModal.dismiss('close');
    }

    close() {
        this.activeModal.dismiss('close');
    }
}
