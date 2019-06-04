import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SearchComponent } from './search-component/search.component';
import { HeaderComponent } from './header/header.component';
import { HistoryListComponent } from './history/history-list/history-list.component';
import { TicketElementComponent } from './history/ticket-element/ticket-element.component';
import { LabListComponent } from './laboratories/lab-list/lab-list.component';
import { RegulatoryListComponent } from './regulatory/regulatory-list/regulatory-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchPipe } from './pipes/search-pipe.pipe';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    LabListComponent,
    RegulatoryListComponent,
    HistoryListComponent,
    TicketElementComponent,
    SearchPipe,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
