import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordMissMatchValidator } from 'src/app/shared/password-match.directive';
import {AuthService} from '../../service/auth.service'
import { User } from 'src/app/interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerform!:FormGroup;
  constructor(private fb:FormBuilder, private service:AuthService,
    private messageService:MessageService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.registerform = this.fb.group({
    fullname:['',Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
    email:['',Validators.required,Validators.email],
    password:['',Validators.required],
    confirmpassword:['',Validators.required]
    },{
      validators: PasswordMissMatchValidator
    })
  }
  get fullname(){
    return this.registerform.controls['fullname'];
  }
  get email(){
    return this.registerform.controls['email'];
  }
  get password(){
    return this.registerform.controls['password'];
  }
  get confirmpassword(){
    return this.registerform.controls['confirmpassword'];
  }
  onSubmit(){
    const postData = {...this.registerform.value};
    delete postData.confirmpassword;
    this.service.registerUser(postData as User).subscribe(
      res => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'Registered Successfully'});
        this.router.navigate(['login'])
      },
      error=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Somthing went wrong'});
      }
    )
  }
}
