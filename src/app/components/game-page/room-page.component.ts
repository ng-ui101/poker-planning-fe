import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import { FormBuilder } from '@angular/forms';
import {Subscription} from "rxjs";

const SOCKET = 'ws://127.0.0.1:8000'

@Component({
    selector: 'app-room-page',
    templateUrl: './room-page.component.html',
    styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {
    public roomId: string = '';
    public roomIsActive: boolean = false;
    public nameIsAssigned: boolean = false;
    private _websocket$: WebSocketSubject<any>;
    private _sub: Subscription = Subscription.EMPTY;

    public userInfo = this.formBuilder.group({
        name: '',
    });

    constructor(
        private _httpService: HttpService,
        private _router: Router,
        private formBuilder: FormBuilder,
    ) {
    }

    public ngOnInit(): void {
        this.roomId = this._router.url.slice(1)
        this._httpService.getRoom(this.roomId).subscribe((response) => {
            this.roomIsActive = response.roomIsActive;
            this._websocket$ = new WebSocketSubject<any>(`${SOCKET}/${this.roomId}`)
        });
    }

    public onSubmit(){
        this._sub = this._websocket$.subscribe();

        this._websocket$.next({
            action: {
                type: 'setUserName',
                data: this.userInfo.value
            },
        });
        this.nameIsAssigned = true;
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}
