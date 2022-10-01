import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OktaCallbackComponent} from "@okta/okta-angular";

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('ROUTER');
  }
}
