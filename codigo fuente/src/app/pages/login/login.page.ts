import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loginError = '';

  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {}

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    try {
      await this.auth.login(this.email, this.password);
      const esAdmin = await this.auth.isAdmin();
      if(esAdmin){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/parcelas']);
      }
    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.loginError = 'Correo o contraseña incorrectos.';
    } finally {
      loading.dismiss();
    }
  }
}
