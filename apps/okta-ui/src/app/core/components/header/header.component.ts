import {Component, Inject, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth, {AuthState} from "@okta/okta-auth-js";

@Component({
  selector: 'okta-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;
  initSessionTime = 120;
  sessionTime = this.initSessionTime;

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
  ) {
  }

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this.handleSession();
    this.initListeners();
  }

  handleSession() {
    const interval = setInterval(() => {
      this.sessionTime--;
      if (this.sessionTime <= 0) {
        clearInterval(interval);
        this.signOut();
      }
    }, 1000);
  }

  private initListeners() {
    ['click', 'keydown'].forEach(it => addEventListener(it, () => this.sessionTime = this.initSessionTime));
  }

  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      () => this._router.navigate(['/profile'])
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}
