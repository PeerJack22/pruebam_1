import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent
  ]
})
export class RegisterPage {
  email = '';
  password = '';
  mensaje = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async register() {
    const { error } = await this.supabaseService.register(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = (error as any).message;
      return;
    }

    this.mensaje = 'Usuario registrado exitosamente';
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }

  back() {
    this.router.navigate(['login']);
  }
}
