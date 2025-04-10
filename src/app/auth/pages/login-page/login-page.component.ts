import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {Ripple} from 'primeng/ripple';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {DividerModule} from 'primeng/divider';
import {FormsModule} from '@angular/forms';
import {LoginRequestInterface} from '../../interfaces/request/login-request-interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    Ripple,
    DividerModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginRequest: LoginRequestInterface = {
    email: '',
    password: '',
  };

  login() {
    if (!this.loginRequest?.email || !this.loginRequest?.password ) {
      Swal.fire('Missing Fields', 'Please complete all fields', 'warning');
      return;
    }

    this.authService.login(this.loginRequest).subscribe({
      next: () => this.router.navigateByUrl('/automovil-unite'),
      error: (message) => {
        console.log(this.loginRequest);
        Swal.fire('Login Error', message, 'error');
      }
    });
  }

}
