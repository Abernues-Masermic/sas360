import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '@shared/material.module';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { PopUpComponent } from '@shared/components/pop-up/pop-up.component';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SpinnerModule,
    ToastrModule.forRoot(),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
