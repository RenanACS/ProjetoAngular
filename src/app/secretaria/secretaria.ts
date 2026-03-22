import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secretaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secretaria.html'
})
export class SecretariaComponent {

  opcaoAtiva = 'atendimento';

  lista: string[] = [];

  setOpcao(opcao: string) {
    this.opcaoAtiva = opcao;

    if (opcao === 'atendimento') {
      this.lista = [
        'Horário de atendimento',
        'Contato da secretaria',
        'Localização no campus'
      ];
    }

    if (opcao === 'documentos') {
      this.lista = [
        'RG e CPF',
        'Comprovante de matrícula',
        'Declaração de vínculo'
      ];
    }

    if (opcao === 'requerimentos') {
      this.lista = [
        'Trancamento de curso',
        'Solicitação de histórico',
        'Declarações acadêmicas'
      ];
    }
  }

  getClasse(opcao: string) {
    return this.opcaoAtiva === opcao
      ? 'bg-green-700 text-white px-4 py-2 rounded shadow'
      : 'bg-white text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-100';
      
}

voltar() {
  alert('Voltando...');
  }
}