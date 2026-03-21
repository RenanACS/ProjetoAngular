import { Component } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-portal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './acesso-portal.html',
  styleUrl: './acesso-portal.css'
})
export class AcessoPortal {

  modo: 'login' | 'cadastro' = 'login';

  email: string = '';
  senha: string = '';
  nome: string = '';

  constructor(private router: Router){}
  trocarModo(novoModo: 'login' | 'cadastro') {
    this.modo = novoModo;
  }

  login() {
    if (this.email && this.senha) {
      alert('Login realizado com sucesso!');
      this.router.navigate(['/portal'])
    } else {
      alert('Preencha todos os campos!');
    }
  }

  cadastrar() {
    if (this.nome && this.email && this.senha) {
      alert('Conta criada com sucesso!');
      this.modo = 'login';
    } else {
      alert('Preencha todos os campos!');
    }
  }

}