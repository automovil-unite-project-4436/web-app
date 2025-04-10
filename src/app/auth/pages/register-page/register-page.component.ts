import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {DividerModule} from 'primeng/divider';
import {PaginatorModule} from 'primeng/paginator';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {RoleEnum} from '../../enums/role-enum';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {RegisterRequestInterface} from '../../interfaces/request/register-request-interface';
import {Carousel} from 'primeng/carousel';

interface CarouselItem {
  title: string;
  image: string;
  text: string;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    Ripple,
    DividerModule,
    PaginatorModule,
    RouterLink,
    FormsModule,
    Carousel,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  carouselItems: CarouselItem[] = [];

  protected registerRequest: RegisterRequestInterface = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  };

  roles: { label: string; value: RoleEnum }[] = [];
  selectedRole: RoleEnum | null = null;

  ngOnInit() {
    this.roles = [
      {label: 'Renter', value: RoleEnum.renter},
      {label: 'Owner', value: RoleEnum.owner},
    ];

    // Improved carousel content focused on vehicle rental
    this.carouselItems = [
      {
        title: 'Wide Range of Vehicles',
        image: 'https://i.postimg.cc/L6YHKLm1/jaguar.png',
        text: 'Access our wide variety of luxury, sports, and economy vehicles for all your needs.'
      },
      {
        title: 'Simple Process',
        image: 'https://i.postimg.cc/K8tx4bkc/audi.png',
        text: 'Book the vehicle you need in minutes. No complications, no excessive paperwork.'
      },
      {
        title: 'Guaranteed Security',
        image: 'https://i.postimg.cc/T1yXxvv6/bmw.png',
        text: 'All our vehicles come with full insurance and 24/7 roadside assistance.'
      },
      {
        title: 'Earn Money with Your Car',
        image: 'https://i.postimg.cc/vZ7wbvkc/lamboriguini.png',
        text: 'Put your vehicle to work. Register as an owner and start generating extra income.'
      }
    ];
  }

  register() {
    // Validate that all fields are completed
    if (!this.registerRequest.email || !this.registerRequest.password ||
      !this.registerRequest.firstName || !this.registerRequest.lastName ||
      !this.registerRequest.phone || !this.selectedRole) {
      Swal.fire('Error', 'Please complete all fields', 'warning');
      return;
    }

    // Assign the selected role
    this.registerRequest.role = this.selectedRole as RoleEnum;


    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        Swal.fire('Registration successful', 'Your account has been created successfully', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        console.log('Error en registro:', error);
        const errorMessage = typeof error === 'string' ? error : 'An unexpected error occurred. Please try again.';
        Swal.fire('Registration Error', errorMessage, 'error');
      }

    });
  }
}
