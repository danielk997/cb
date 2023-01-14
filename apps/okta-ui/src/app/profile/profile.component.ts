import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {OktaAuthStateService} from "@okta/okta-angular";
import {AuthState} from "@okta/okta-auth-js";
import {ApiService} from "../shared/services/api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SimpleDialogComponent, SimpleDialogData} from "../core/components/simple-dialog/simple-dialog.component";

@Component({
  selector: 'okta-ui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;
  public form!: FormGroup;

  constructor(
    private _oktaAuthStateService: OktaAuthStateService,
    private _apiService: ApiService,
    private _fb: FormBuilder,
    private _matDialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.form = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    })


    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }

  onSubmit() {
    this._apiService.createUser(this.form.value).subscribe(it => {
      this._matDialog.open<SimpleDialogComponent, SimpleDialogData>(SimpleDialogComponent, {
        disableClose: true,
        data: {
          title: 'Copy Your Password',
          content: it.password
        }
      })
    });
  }

  onTest() {
    this._apiService.getUsers().subscribe(it => {
      console.log(it);
    });
  }

  onVerify(token: string) {
    // The verification process was successful.
    // You can verify the token on your server now.
  }

  onExpired(response: any) {
    // The verification expired.
  }

  onError(error: any) {
    // An error occured during the verification process.
  }
}
