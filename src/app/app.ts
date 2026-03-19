import { Component } from '@angular/core';

// 1. Aqui nós "buscamos" o componente que você criou
import { LaboratorioLista } from './components/laboratorio-lista/laboratorio-lista'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Aqui nós declaramos ele para o Angular poder usar no HTML
  imports: [LaboratorioLista], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'laboratorio';
}1