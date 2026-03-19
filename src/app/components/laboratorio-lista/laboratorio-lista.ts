import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratorioItem } from '../laboratorio-item/laboratorio-item';

export interface Reserva {
  professor: string;
  horario: string;
}

export interface Laboratorio {
  id: number;
  nome: string;
  horarios: string;
  regras: string[];
  reservas: Reserva[];
  expandido: boolean;
}

@Component({
  selector: 'app-laboratorio-lista',
  standalone: true,
  imports: [CommonModule, LaboratorioItem], 
  templateUrl: './laboratorio-lista.html'
})
export class LaboratorioLista {
  menuAberto: boolean = false; 

  // Agora temos 5 laboratórios e os professores estão bem separados!
  laboratorios: Laboratorio[] = [
    {
      id: 1,
      nome: 'Laboratório de Informática 1',
      horarios: '08:00 - 22:00',
      regras: ['Proibido comer e beber', 'Uso exclusivo acadêmico'],
      reservas: [
        { professor: 'Profa. Márcia', horario: '08:00 - 11:00' }
      ],
      expandido: false
    },
    {
      id: 2,
      nome: 'Laboratório de Redes',
      horarios: '14:00 - 18:00',
      regras: ['Necessário agendamento', 'Acesso restrito'],
      reservas: [
        { professor: 'Prof. Rodrigo', horario: '14:00 - 18:00' }
      ],
      expandido: false
    },
    {
      id: 3,
      nome: 'Laboratório de Hardware',
      horarios: '08:00 - 12:00',
      regras: ['Uso obrigatório de jaleco', 'Equipamentos sensíveis'],
      reservas: [
        { professor: 'Prof. Maurício', horario: '09:00 - 11:30' }
      ],
      expandido: false
    },
    {
      id: 4,
      nome: 'Laboratório de Informática 2',
      horarios: '14:00 - 22:00',
      regras: ['Computadores de alto desempenho', 'Silêncio obrigatório'],
      reservas: [
        { professor: 'Prof. André Neto', horario: '19:00 - 22:00' }
      ],
      expandido: false
    },
    {
      id: 5,
      nome: 'Espaço Maker e Robótica',
      horarios: '09:00 - 17:00',
      regras: ['Uso de EPI obrigatório', 'Organizar ferramentas após o uso'],
      reservas: [], // Este aqui deixamos livre para mostrar aquela mensagem bonitinha!
      expandido: false
    }
  ];
}