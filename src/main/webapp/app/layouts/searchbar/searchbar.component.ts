import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent implements OnInit {
    search_text: string;
    constructor(private _route: ActivatedRoute, private _router: Router) {}
    ngOnInit() {}

    search() {
        this.search_text = (<HTMLInputElement>document.getElementById('searchTxt')).value;
        this._router.navigate(['/'], {
            queryParams: { search: this.search_text }
        });
    }
}
