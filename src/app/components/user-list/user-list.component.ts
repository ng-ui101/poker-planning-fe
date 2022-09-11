import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {Subscription} from "rxjs";
import {IUserEstimate} from "../../interfaces/user-estimate";
import {MessageType} from "../../interfaces/message";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public activeUsers: IUserEstimate[] = [];
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
                    break;
                case MessageType.Estimates:
                case MessageType.FinalEstimate:
                case MessageType.UserLeave:
                    this.activeUsers = msg.estimates;
                    break;
                default:
                    return;
            }
        })
    }
}
