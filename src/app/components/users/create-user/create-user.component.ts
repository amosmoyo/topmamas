import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm = this.fb.group({
    name: ['', Validators.required],
    job: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.userForm.invalid) {
      return;
    }

    console.log(this.userForm.value)

    // this.auth.createUser()

    this.auth.createUser(this.userForm.value).subscribe({
      next:(data) => {
        console.log(data)
      },
      error:(err) => {
        console.log(err)
      }
    }
    )

    this.userForm.reset();

    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null);
    });
  }

}
