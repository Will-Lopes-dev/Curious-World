import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
  action?: string; 
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  public appPages: MenuItem[] = [
    { title: 'Home', url: '/home', icon: 'home' },
    // { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Registrar', url: '/signup', icon: 'heart' },
    { title: 'Redefinir Senha', url: '/reset-password', icon: 'refresh-circle' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public user: firebase.default.User | null = null; // Usuário atualmente autenticado

  constructor(private authService: AuthService, public afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.user = user; // Atualiza o usuário atual
      this.updateMenu(); // Chama a função para atualizar os itens do menu
    });
  }

  updateMenu() {
    if (this.user) {
      this.appPages = this.appPages.filter(page => page.title !== 'Login');
      if (!this.appPages.some(page => page.title === 'Sair')) {
        this.appPages.push({ title: 'Sair', url: '', icon: 'log-out', action: 'logout' });
      }
    } else {
      this.appPages = this.appPages.filter(page => page.title !== 'Sair');
      if (!this.appPages.some(page => page.title === 'Login')) {
        this.appPages.push({ title: 'Login', url: '/login', icon: 'log-in' });
      }
    }
  }

  async handleMenuClick(page: any) {
    if (page.action === 'logout') {
      this.logout(); // Chama o método de logout se a ação for 'logout'
    }
  }

  async logout() {
    try {
      await this.authService.logout(); // Chama o serviço de logout do AuthService
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
