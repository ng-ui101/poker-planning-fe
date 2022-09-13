import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {EnvironmentService} from "../../services/environment.service";

@Component({
    selector: 'app-init-page',
    templateUrl: './init-page.component.html',
    styleUrls: ['./init-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InitPageComponent {
    @HostBinding('class.init-page') initPage = true;

    constructor(
        private _httpService: HttpService,
        private _router: Router,
        private _environmentService: EnvironmentService
    ) {
    }

    public createRoom() {
        this._httpService.createRoom().subscribe((response) => {
            this._router.navigate(['room'],{ queryParams: { id: response.roomId }});
        });
    }
}
