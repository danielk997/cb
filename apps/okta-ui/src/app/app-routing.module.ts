import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
