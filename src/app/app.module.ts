import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ShListComponent } from './sh-list/sh-list.component';
import { TemplateShTypingComponent } from './_template/template-sh-typing/template-sh-typing.component';
import { TemplateShKeycodeComponent } from './_template/template-sh-keycode/template-sh-keycode.component';
import { TemplateShTypingFormComponent } from './_template/template-sh-typing-form/template-sh-typing-form.component';
import { TemplateHeaderComponent } from './_template/template-header/template-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ShListComponent,
    TemplateShTypingComponent,
    TemplateShKeycodeComponent,
    TemplateShTypingFormComponent,
    TemplateHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
