import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {Subscription} from "rxjs";
import {IUserEstimate} from "../../interfaces/user-estimate";
import {MessageType} from "../../interfaces/message";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @HostBinding('class.field') field = true;

    public activeUsers: IUserEstimate[] = [];
    public cardsIsHidden: boolean = true;
    private _sub: Subscription = Subscription.EMPTY;

    constructor(
        private _webSocketService: WebSocketService,
    ) {
    }

    public ngOnInit(): void {
        this._sub = this._webSocketService.websocket$.subscribe((msg) => {
            switch (msg.type) {
                case MessageType.Reset:
                    this.activeUsers = [];
                    this.cardsIsHidden = true;
                    break;
                case MessageType.Estimates:
                    this.activeUsers = msg.estimates;
                    this.cardsIsHidden = true;
                    break;
                case MessageType.FinalEstimate:
                    this.activeUsers = msg.estimates;
                    this.cardsIsHidden = false;
                    break;
                case MessageType.UserLeave:
                default:
                    this.activeUsers = msg.estimates;
                    break;
            }
        })
    }

    public trackByFn(index: number, item: IUserEstimate) {
        return item.clientId;
    }
}
