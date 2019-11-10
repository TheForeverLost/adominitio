import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { CardComponent } from './card/card.component';
import { ArchiveComponent } from './archive/archive.component';
import { LabelboxComponent } from './labelbox/labelbox.component';
import { AngularFireModule} from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireDatabase} from 'angularfire2/database'
import { AngularFireAuthModule} from 'angularfire2/auth'
import { environment } from 'src/environments/environment';

@NgModule ({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    CardComponent,
    ArchiveComponent,
    LabelboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
