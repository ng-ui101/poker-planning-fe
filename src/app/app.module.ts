import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EstimateViewComponent } from './components/estimate-view/estimate-view.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { InitPageComponent } from './components/init-page/init-page.component';
import { RoomPageComponent } from './components/game-page/room-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserListComponent,
        EstimateViewComponent,
        GameFieldComponent,
        InitPageComponent,
        RoomPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}