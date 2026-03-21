import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroComponent } from '../filtro/filtro.component';
import { CalendarioComponent } from '../calendario/calendario.component';
import { PainelEventosComponent } from '../painel-eventos/painel-eventos.component';
import { RouterModule } from '@angular/router';
// 1. IMPORTANDO AS PEÇAS DO QUEBRA-CABEÇA
// Dica: Se o VS Code sublinhar de vermelho alguma dessas 3 linhas abaixo, 
// apague o texto dentro das aspas, aperte Ctrl+Espaço e selecione o caminho certo!

@Component({
  selector: 'app-tela-calendario',
  standalone: true,
  // 2. A MÁGICA: Colocando os componentes aqui, os erros do HTML somem na hora!
  imports: [
    CommonModule, 
    RouterModule,
    FiltroComponent, 
    CalendarioComponent, 
    PainelEventosComponent,
    RouterModule
  ],
  templateUrl: './tela-calendario.html',
  styleUrl: './tela-calendario.css'
})
export class TelaCalendario {
  
  // ==========================================
  // VARIÁVEIS QUE O HTML ESTAVA PEDINDO
  // ==========================================
  filtrosAtivos: any = { aula: true, prova: true, feriado: true, evento: true };
  eventos: any = {};
  diaSelecionadoAtual: any = null;
  eventosDoDia: any[] = [];

  // ==========================================
  // FUNÇÕES QUE O HTML ESTAVA PEDINDO
  // ==========================================
  onFiltroAlterado(novosFiltros: any) {
    this.filtrosAtivos = novosFiltros;
  }

  onDiaSelecionado(dia: any) {
    this.diaSelecionadoAtual = dia;
    this.eventosDoDia = dia.eventos || [];
  }
}