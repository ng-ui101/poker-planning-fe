import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {MessageType} from "../../interfaces/message";

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GameFieldComponent {
    @HostBinding('class.game-field') gameField = true;

    @Input() name: string = '';
    public estimates: number[] = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

    constructor(
        private _webSocketService: WebSocketService,
    ) {
    }

    public sendEstimate(estimate: number) {
        this._webSocketService.websocket$.next({
            type: MessageType.SetEstimate,
            name: this.name,
            estimate
        })
    }
}
