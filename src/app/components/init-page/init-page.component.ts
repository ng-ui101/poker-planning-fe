import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-init-page',
    templateUrl: './init-page.component.html',
    styleUrls: ['./init-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InitPageComponent implements OnInit {
    @HostBinding('class.init-page') initPage = true;

    constructor(
        private _httpService: HttpService,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    public createRoom() {
        this._httpService.createRoom().subscribe((response) => {
            this._router.navigate(['room'],{ queryParams: { id: response.roomId }});
        });
    }
}
