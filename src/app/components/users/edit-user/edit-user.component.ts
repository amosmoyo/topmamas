import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm = this.fb.group({
    name: ['', Validators.required],
    job: ['', Validators.required]
  })

  param: any

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.param = params.get('id')
      }
    )

    if(this.param) {
      this.auth.getUser(this.param).subscribe({
        next: (data) => {
          console.log(data)
        }
      })
    }
  }

  onSave() {
    if (this.userForm.invalid) {
      return;
    }

    if(this.param) {
      this.auth.updateUser(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data)
        }
      })
    }

    this.userForm.reset();

    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null);
    });
  }

}
