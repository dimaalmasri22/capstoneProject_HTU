import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userState$= this.fireAuth.authState;
  constructor(private fireAuth:AngularFireAuth,private loader:LoadingService) { }
  signIn(email:string, password:string){
    this.loader.show();
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  
 signOut(){
  return this.fireAuth.signOut();
 }
}
