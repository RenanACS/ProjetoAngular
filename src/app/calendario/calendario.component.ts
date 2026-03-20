import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento, DiaEvento, FiltrosAtivos, TipoEvento } from '../models/evento.model';

export interface CelulaCalendario {
  dia: number;
  chave: string;
  vazia: boolean;
  ehHoje: boolean;
  ehFimDeSemana: boolean;
  eventos: Evento[];
  tipoPrincipal: TipoEvento | null;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnChanges {

  @Input()  eventos:       { [key: string]: Evento[] } = {};
  @Input()  filtrosAtivos: FiltrosAtivos = { aula: true, prova: true, feriado: true, evento: true };
  @Output() diaSelecionado = new EventEmitter<DiaEvento>();

  mesAtual: number;
  anoAtual: number;
  diaSelecionadoChave: string | null = null;
  celulas: CelulaCalendario[] = [];

  readonly diasDaSemana = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  readonly nomeMeses    = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                           'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  readonly semestres: Record<number, string> = {
    0:'2º semestre', 1:'2º semestre', 2:'1º semestre', 3:'1º semestre',
    4:'1º semestre', 5:'1º semestre', 6:'Recesso',
    7:'2º semestre', 8:'2º semestre', 9:'2º semestre', 10:'2º semestre', 11:'2º semestre',
  };

  constructor() {
    const hoje    = new Date();
    this.mesAtual = hoje.getMonth();
    this.anoAtual = hoje.getFullYear();
  }

  ngOnChanges(): void { this.gerarCelulas(); }

  get mesTitulo():     string { return `${this.nomeMeses[this.mesAtual]} ${this.anoAtual}`; }
  get semestreLabel(): string { return this.semestres[this.mesAtual] ?? ''; }

  navegarMes(dir: number): void {
    this.mesAtual += dir;
    if (this.mesAtual > 11) { this.mesAtual = 0;  this.anoAtual++; }
    if (this.mesAtual < 0)  { this.mesAtual = 11; this.anoAtual--; }
    this.gerarCelulas();
  }

  gerarCelulas(): void {
    const hoje        = new Date();
    const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();
    const diasNoMes   = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
    this.celulas      = [];

    for (let i = 0; i < primeiroDia; i++) {
      this.celulas.push({ dia:0, chave:'', vazia:true, ehHoje:false, ehFimDeSemana:false, eventos:[], tipoPrincipal:null });
    }

    for (let d = 1; d <= diasNoMes; d++) {
      const chave        = this.toChave(this.anoAtual, this.mesAtual, d);
      const diaSem       = new Date(this.anoAtual, this.mesAtual, d).getDay();
      const evsFiltrados = (this.eventos[chave] || []).filter(e => this.filtrosAtivos[e.tipo]);
      this.celulas.push({
        dia: d, chave, vazia: false,
        ehHoje: d === hoje.getDate() && this.mesAtual === hoje.getMonth() && this.anoAtual === hoje.getFullYear(),
        ehFimDeSemana: diaSem === 0 || diaSem === 6,
        eventos: evsFiltrados,
        tipoPrincipal: evsFiltrados[0]?.tipo ?? null,
      });
    }
  }

  clicarDia(celula: CelulaCalendario): void {
    if (celula.vazia) return;
    this.diaSelecionadoChave = celula.chave;
    this.diaSelecionado.emit({ chave: celula.chave, dia: celula.dia, mes: this.mesAtual, ano: this.anoAtual, eventos: celula.eventos });
    this.gerarCelulas();
  }

  getClasseCelula(celula: CelulaCalendario): string {
    if (celula.vazia) return '';
    if (this.diaSelecionadoChave === celula.chave) return 'bg-[#2d5016] text-white';
    const mapa: Record<TipoEvento, string> = {
      aula:    'bg-blue-50    border border-blue-100    text-blue-800',
      prova:   'bg-amber-50   border border-amber-100   text-amber-800',
      feriado: 'bg-pink-50    border border-pink-100    text-pink-800',
      evento:  'bg-emerald-50 border border-emerald-100 text-emerald-800',
    };
    if (celula.tipoPrincipal) return mapa[celula.tipoPrincipal];
    if (celula.ehFimDeSemana) return 'bg-gray-50 text-gray-300';
    return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
  }

  getClassePonto(tipo: TipoEvento, selecionada: boolean): string {
    if (selecionada) return 'bg-white';
    return { aula:'bg-blue-400', prova:'bg-amber-400', feriado:'bg-pink-400', evento:'bg-emerald-400' }[tipo];
  }

  private toChave(ano: number, mes: number, dia: number): string {
    return `${ano}-${String(mes + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
  }
}