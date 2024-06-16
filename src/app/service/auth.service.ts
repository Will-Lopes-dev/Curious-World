import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';


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
      loading.dismiss();
      isAuthenticated = true;
      this.showToast('CONECTADOS COM SUCESSO');
      user;
      this.router.navigate(['/home']);
    } catch (error) {
      loading.dismiss();
      console.log(error)
      this.showToast('ERRO AO EFETUAR LOGIN');
      throw error;  // Lance o erro para que ele possa ser tratado no componente
    }
  }

  async resetPassword(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async getProfile() {
    return await this.auth.currentUser
  }

  async register(email: string, password: string) {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await loading.dismiss();
      this.showToast("Conta criada com sucesso!");
      this.router.navigate(['/login']);
  } catch (error) {
    await loading.dismiss();
    console.log(error);
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