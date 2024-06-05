import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  nomeUsuario: string = ''; // Substitua pelo nome do usuário logado

  constructor() { }

  ngOnInit() {}

}
