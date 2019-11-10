import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "firebase/app";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable , of } from "rxjs";
import {user} from "./user.model"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : Observable<user>
  constructor(
    private afauth : AngularFireAuth,
    private router : Router
  ) { 
    this.user = this.afauth.authState;
  }

  async googleSignin(){
    const prov = new auth.GoogleAuthProvider();
    const credential = await this.afauth.auth.signInWithPopup(prov)
    this.router.navigate(['/home'])
    return this.updateUserData(credential.user);
  }

  async signOut(){
    await this.afauth.auth.signOut()
    return this.router.navigate(['/'])
  }

  private updateUserData(user){
    const data = {
      uid : user.uid,
      email : user.email
    }
    
    return data;
  }
}
