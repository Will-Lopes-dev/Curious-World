import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    // private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router 
  ) {}

  async login(email: string, password: string, isAuthenticated: boolean) {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      await loading.dismiss();
      isAuthenticated = true;
      this.showToast('CONECTADOS COM SUCESSO');
      return user;
    } catch (error) {
      await loading.dismiss();
      this.showToast('ERRO AO EFETUAR LOGIN');
      throw error;  // Lance o erro para que ele possa ser tratado no componente
    }
  }

  async register(email: string, password: string) {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      this.auth.createUserWithEmailAndPassword(email, password);
      await loading.dismiss();
  } catch (error) {
    await loading.dismiss();
    this.showToast('ERRO AO SE REGISTRAR');
    throw error;  // Lance o erro para que ele possa ser tratado no componente
  }
}

  async logout(isAuthenticated?: boolean) {
    await this.auth.signOut();
    if(isAuthenticated) {
      isAuthenticated = false;
    }
    this.showToast('DESCONECTADOS COM SUCESSO');
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}