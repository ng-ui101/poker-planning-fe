import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public websocket$: WebSocketSubject<any>;

    public initWebsocket(url: string) {
        this.websocket$ = new WebSocketSubject<any>(url);
    }
}
