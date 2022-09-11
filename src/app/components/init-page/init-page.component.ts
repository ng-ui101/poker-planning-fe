import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-init-page',
    templateUrl: './init-page.component.html',
    styleUrls: ['./init-page.component.scss']
})
export class InitPageComponent implements OnInit {

    constructor(
        private _httpService: HttpService,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    public createRoom() {
        this._httpService.createRoom().subscribe((response) => {
            this._router.navigate(['room'],{ queryParams: { id: response.roomId }})
        })
    }
}
