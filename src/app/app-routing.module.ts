import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitPageComponent} from "./components/init-page/init-page.component";
import {RoomPageComponent} from "./components/game-page/room-page.component";

const routes: Routes = [
    { path: '', component: InitPageComponent },
    { path: '**', component: RoomPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
