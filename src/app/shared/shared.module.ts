import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // NavbarComponent,
    MainNavComponent,
    RouterModule,
    MatFormFieldModule
  ],
  declarations: [MainNavComponent]
  // declarations: [NavbarComponent]
})
export class SharedModule {}
