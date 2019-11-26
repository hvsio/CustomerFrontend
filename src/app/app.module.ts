import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDialogModule, MatIconModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule,
  MatTableModule,
} from '@angular/material';
import { ShowResultsComponent } from './show-results/show-results.component';
import { AppRoutingModule } from './app-routing.module';
import {Calculation} from './modules/calculation-request';

@NgModule({
  declarations: [
    AppComponent,
    ShowResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [Calculation],
  bootstrap: [AppComponent]
})
export class AppModule { }
