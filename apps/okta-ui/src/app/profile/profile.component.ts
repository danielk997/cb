import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {OktaAuthStateService} from "@okta/okta-angular";
import {AuthState} from "@okta/okta-auth-js";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'okta-ui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;

  constructor(
    private _oktaAuthStateService: OktaAuthStateService,
    private _apiService: ApiService
  ) {
  }

  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );

    this._apiService.get().subscribe(it => {
      console.log(it);
    })
  }
}
