import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvironmentService} from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly _url: string;

    constructor(
        private _httpClient: HttpClient,
        private _environmentService: EnvironmentService,
    ) {
        this._url = this._environmentService.getValue('apiUrl');
    }

    // POST: /api/create-room
    public createRoom(): Observable<any> {
        return this._httpClient.post(`${this._url}/api/create-room`, {});
    }

    // GET: /api/get-room
    public getRoom(roomId: string): Observable<any> {
        return this._httpClient.get(`${this._url}/api/get-room`, {params: {roomId}});
    }
}
