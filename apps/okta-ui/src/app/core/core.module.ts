import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {SimpleDialogComponent} from './components/simple-dialog/simple-dialog.component';

@NgModule({
  declarations: [HeaderComponent, SimpleDialogComponent],
    imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
