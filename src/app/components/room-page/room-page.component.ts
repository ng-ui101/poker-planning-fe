import {Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {Subscription} from "rxjs";
import {WebSocketService} from "../../services/web-socket.service";
import {OutgoingMessageType} from "../../interfaces/message";
import {EnvironmentService} from "../../services/environment.service";

@Component({
    selector: 'app-room-page',
    templateUrl: './room-page.component.html',
    styleUrls: ['./room-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RoomPageComponent implements OnInit, OnDestroy {
    @HostBinding('class.room-page') roomPage = true;

    public roomId: string = '';
    public roomIsActive: boolean = false;
    public name: string = '';

    public userInfo = this._formBuilder.group({
        name: '',
    });

    private _sub: Subscription = Subscription.EMPTY;
    private _querySub: Subscription = Subscription.EMPTY;
    private readonly _url: string;

    constructor(
        private _httpService: HttpService,
        private _formBuilder: FormBuilder,
        private _webSocketService: WebSocketService,
        private _activatedRoute: ActivatedRoute,
        private _environmentService: EnvironmentService
    ) {
        this._url = this._environmentService.getValue('wsUrl');
    }

    public ngOnInit(): void {
        this._querySub = this._activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.roomId = queryParam['id'];
            }
        );

        this._httpService.getRoom(this.roomId).subscribe((response) => {
            this.roomIsActive = response.roomIsActive;
            this._webSocketService.initWebsocket(`${this._url}/${this.roomId}`);
        });
    }

    public onSubmit() {
        this._sub = this._webSocketService.websocket$.subscribe();

        this._webSocketService.websocket$.next({type: OutgoingMessageType.SetUserName});
        this.name = this.userInfo.value.name!;
    }

    @HostListener('window:beforeunload')
    public sendUserLeaveEvent() {
        this._webSocketService.websocket$.next({
            type: OutgoingMessageType.UserLeave,
        })
    }

    public ngOnDestroy(): void {
        this._sub.unsubscribe();
        this._querySub.unsubscribe();
    }
}
