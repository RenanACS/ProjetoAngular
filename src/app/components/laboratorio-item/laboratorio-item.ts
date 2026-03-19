import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
// Importamos a interface para ele saber o que é um "Laboratorio"
import { Laboratorio } from '../laboratorio-lista/laboratorio-lista'; 

@Component({
  selector: 'app-laboratorio-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laboratorio-item.html'
})
export class LaboratorioItem {
  
  // O @Input() diz: "Pai, mande os dados do laboratório para mim por aqui!"
  @Input({ required: true }) lab!: Laboratorio;

}