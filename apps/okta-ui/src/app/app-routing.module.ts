import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OktaCallbackComponent} from "@okta/okta-angular";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
