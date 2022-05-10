import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatProfileComponent } from './cat-profile/cat-profile.component';
import { MainComponent } from './main/main.component';
import { QuizzComponent } from './quizz/quizz.component';
import { MainQuizzComponent } from './main-quizz/main-quizz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    LandingPageComponent,
    HeaderComponent,
    DashboardComponent,
    CatProfileComponent,
    MainComponent,
    QuizzComponent,
    MainQuizzComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
