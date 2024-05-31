import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service'
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginform!:FormGroup;
  constructor(private fb:FormBuilder, private service:AuthService, private router:Router,
    private messageservice:MessageService
  ){

  }
  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.loginform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  get email(){
    return this.loginform.controls['email'];
  }
  get password(){
    return this.loginform.controls['password'];
  }
  onSubmit(){
    const {email,password} = this.loginform.value;
    this.service.getUserByEmail(email as string).subscribe(
      (res)=>{
        if(res.length  > 0 && res[0].password === password){
          sessionStorage.setItem('email',email as string)
          this.messageservice.add({severity:'sucess', summary:'Sucess', detail:'Login sucess'});
          this.router.navigate(['/home'])
        }else{
          this.messageservice.add({severity:'error', summary:'Error', detail:'email or password wrong'});
        }
      },
      error=>{
        this.messageservice.add({severity:'error', summary:'Error', detail:'somthing went wrong'});
      }
    )
  }
 
}
