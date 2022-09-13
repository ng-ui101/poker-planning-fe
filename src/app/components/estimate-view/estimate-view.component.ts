import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {filter, Subscription} from "rxjs";
import {MessageType} from "../../interfaces/message";

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
            filter((msg) => msg.type === MessageType.FinalEstimate
            || msg.type === MessageType.Reset)
        ).subscribe((msg) => {
            if(msg.type === MessageType.FinalEstimate) {
                this.finalEstimate = msg.finalEstimate;
            }

            if(msg.type === MessageType.Reset) {
                this.finalEstimate = null;
            }
        });
    }

    public reset() {
        this._webSocketService.websocket$.next({type: MessageType.Reset});
    }

    public accept() {
        this._webSocketService.websocket$.next({type: MessageType.Accept});
    }

    public ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}
