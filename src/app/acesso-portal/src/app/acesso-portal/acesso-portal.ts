import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-portal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './acesso-portal.html',
  styleUrl: './acesso-portal.css'
})
export class AcessoPortal {

  constructor(private router: Router) {}

  modo: 'login' | 'cadastro' = 'login';

  email: string = '';
  senha: string = '';
  nome: string = '';

  trocarModo(novoModo: 'login' | 'cadastro') {
    this.modo = novoModo;
  }

  login() {
    if (this.email && this.senha) {
      alert('Login realizado com sucesso!');
      this.router.navigate(['/portal']); 
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