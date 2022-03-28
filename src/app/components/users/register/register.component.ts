import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  save(form:NgForm){

    const data = {
      email:form.value.email,
      password:form.value.password
    }
    
    this.auth.signup(data);
    form.resetForm();
  }

}
