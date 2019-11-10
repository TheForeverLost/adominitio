import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Credentials } from '../credentials';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { user } from '../services/user.model';
import { isNull } from 'util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   userdata:Credentials;
   incorrectflag:string = "None";
  constructor(private router:Router , public Auth:AuthService) { 
    Auth.user.subscribe(user => {
      if(!isNull(user)){
        router.navigate(["/home"])
      }
    })
  }

  ngOnInit() {
    
  }
  
  submitData(logincred:NgForm){
    this.userdata = new Credentials(logincred.value.un,logincred.value.pw)
    this.incorrectflag = "Block" 
    logincred.resetForm()
    this.router.navigateByUrl('/home');
  }
}
