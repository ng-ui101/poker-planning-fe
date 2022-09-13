import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {filter, Subscription} from "rxjs";
import {IncomingMessageType, OutgoingMessageType} from "../../interfaces/message";

@Component({
    selector: 'app-estimate-view',
    templateUrl: './estimate-view.component.html',
    styleUrls: ['./estimate-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EstimateViewComponent implements OnInit, OnDestroy {
    @HostBinding('class.estimate-view') estimateView = true;

    public finalEstimate: number = null;
    private _sub: Subscription = Subscription.EMPTY;

    constructor(
        private _webSocketService: WebSocketService,
    ) {
    }

    public ngOnInit(): void {
        this._sub = this._webSocketService.websocket$.pipe(
            filter((msg) => msg.type === IncomingMessageType.FinalEstimate
            || msg.type === IncomingMessageType.Reset)
        ).subscribe((msg) => {
            if(msg.type === IncomingMessageType.FinalEstimate) {
                this.finalEstimate = msg.finalEstimate;
            }

            if(msg.type === IncomingMessageType.Reset) {
                this.finalEstimate = null;
            }
        });
    }

    public reset() {
        this._webSocketService.websocket$.next({type: OutgoingMessageType.Reset});
    }

    public accept() {
        this._webSocketService.websocket$.next({type: OutgoingMessageType.Accept});
    }

    public ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}
