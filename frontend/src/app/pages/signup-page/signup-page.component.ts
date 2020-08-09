import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  // emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
  showSuccessMsg: boolean;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignupButtonClicked(email: string, password: string) {
    var re = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/);
    if (!re.test(email)) {
      this.errorMsg = "Please enter a valid email address.";
      setTimeout(() => this.errorMsg = '', 4000);
    }
    else {
      this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
        this.showSuccessMsg = true;
        setTimeout(() => this.showSuccessMsg = false, 4000);
        console.log(res);
        this.router.navigate(['/lists']);
      },

        err => {
          if (err) {
            if (password == '' || email == '') {
              this.errorMsg = "All fields are Required";
              setTimeout(() => this.errorMsg = '', 4000);
            }
            else if (password.length < 8) {
              this.errorMsg = "Password should contain minimum 8 characters";
              setTimeout(() => this.errorMsg = '', 4000);
            }
            else {
              this.errorMsg = "Something went wrong";
              setTimeout(() => this.errorMsg = '', 4000);
            }
          }
        }

      );
    }
  }

}
