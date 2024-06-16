import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any= {};

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
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
    return new Promise<firebase.default.User | null> ((resolve, reject)=>{
      this.auth.onAuthStateChanged(user => {
        if(user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, reject)
    })
    
    // try {
    //   const docRef = this.firestore
    //   .collection('users')
    //   .doc(uid)
    //   .get();
    //   const doc = await firstValueFrom(docRef);
    //   if (doc.exists) {
    //     const data: any =  doc.data();
    //     return data.name || null;
    //   } else {
    //     return null; // Retorna null se o documento não existir
    //   }
    // } catch (error) {
    //   console.error('Error getting user profile:', error);
    //   throw error; // Lança o erro para que possa ser tratado pelo chamador
    // }
  }

  async register(email: string, password: string) {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const user = await this.auth.createUserWithEmailAndPassword(email, password);
      loading.dismiss();
      this.showToast("Conta criada com sucesso!");
      this.router.navigate(['/login']);
      await this.firestore.collection('Users').doc(user.user?.uid).set(this.userData);
      return user;
    } catch (error) {
      loading.dismiss();
      console.log(error);
      this.showToast('ERRO AO SE REGISTRAR');
      throw error;
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