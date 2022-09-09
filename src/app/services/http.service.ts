import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const TEMP_URL = 'http://127.0.0.1:3000';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    // POST: /api/create-room
    public createRoom(): Observable<any> {
        return this._httpClient.post(`${TEMP_URL}/api/create-room`, {});
    }

    // GET: /api/get-room
    public getRoom(roomId: string): Observable<any> {
        return this._httpClient.get(`${TEMP_URL}/api/get-room`, {params: {roomId}});
    }
}
