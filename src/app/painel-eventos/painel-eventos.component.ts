import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento, DiaEvento, FiltrosAtivos, TipoEvento } from '../models/evento.model';

interface ResumoItem  { tipo: TipoEvento; label: string; icone: string; count: number; }
interface ProximoItem { dia: number; chave: string; titulo: string; tipo: TipoEvento; }

@Component({
  selector: 'app-painel-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'painel-eventos.component.html',
  styleUrls: ['painel-eventos.component.css'],
})
export class PainelEventosComponent implements OnChanges {

  @Input() diaSelecionado: DiaEvento | null = null;
  @Input() eventosDoDia:   Evento[]         = [];
  @Input() eventos:        { [key: string]: Evento[] } = {};
  @Input() filtrosAtivos:  FiltrosAtivos    = { aula:true, prova:true, feriado:true, evento:true };

  resumoItems:   ResumoItem[]  = [];
  proximosItens: ProximoItem[] = [];

  private readonly nomeDias  = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  private readonly nomeMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  ngOnChanges(): void {
    this.calcularResumo();
    this.calcularProximos();
  }

  get dataFormatada(): string {
    if (!this.diaSelecionado) return '—';
    const dt = new Date(this.diaSelecionado.ano, this.diaSelecionado.mes, this.diaSelecionado.dia);
    return `${this.nomeDias[dt.getDay()]}, ${this.diaSelecionado.dia} de ${this.nomeMeses[this.diaSelecionado.mes]}`;
  }

  getClasseCard(tipo: TipoEvento): string {
    return { aula:'bg-blue-50 border-blue-100', prova:'bg-amber-50 border-amber-100',
             feriado:'bg-pink-50 border-pink-100', evento:'bg-emerald-50 border-emerald-100' }[tipo];
  }

  getClasseBadge(tipo: TipoEvento): string {
    return { aula:'bg-blue-100 text-blue-800 border-blue-200', prova:'bg-amber-100 text-amber-800 border-amber-200',
             feriado:'bg-pink-100 text-pink-800 border-pink-200', evento:'bg-emerald-100 text-emerald-800 border-emerald-200' }[tipo];
  }

  getClasseTitulo(tipo: TipoEvento): string {
    return { aula:'text-blue-800', prova:'text-amber-800', feriado:'text-pink-800', evento:'text-emerald-800' }[tipo];
  }

  labelTipo(tipo: TipoEvento): string {
    return { aula:'Aula', prova:'Prova', feriado:'Feriado', evento:'Evento' }[tipo];
  }

  private calcularResumo(): void {
    const counts: Record<TipoEvento, number> = { aula:0, prova:0, feriado:0, evento:0 };
    const refMes    = this.diaSelecionado?.mes ?? new Date().getMonth();
    const refAno    = this.diaSelecionado?.ano ?? new Date().getFullYear();
    const diasNoMes = new Date(refAno, refMes + 1, 0).getDate();
    for (let d = 1; d <= diasNoMes; d++) {
      const chave = `${refAno}-${String(refMes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      (this.eventos[chave] || []).forEach(e => counts[e.tipo]++);
    }
    this.resumoItems = [
      { tipo:'aula',    label:'Aulas',    icone:'📚', count: counts.aula },
      { tipo:'prova',   label:'Provas',   icone:'✏️',  count: counts.prova },
      { tipo:'feriado', label:'Feriados', icone:'🎉', count: counts.feriado },
      { tipo:'evento',  label:'Eventos',  icone:'🎯', count: counts.evento },
    ];
  }

  private calcularProximos(): void {
    const hoje      = new Date();
    const refMes    = this.diaSelecionado?.mes ?? hoje.getMonth();
    const refAno    = this.diaSelecionado?.ano ?? hoje.getFullYear();
    const diasNoMes = new Date(refAno, refMes + 1, 0).getDate();
    const lista: ProximoItem[] = [];
    for (let d = 1; d <= diasNoMes; d++) {
      const chave = `${refAno}-${String(refMes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      if (new Date(refAno, refMes, d) >= hoje) {
        const evs = (this.eventos[chave] || []).filter(e => this.filtrosAtivos[e.tipo]);
        if (evs.length) lista.push({ dia:d, chave, titulo:evs[0].titulo, tipo:evs[0].tipo });
      }
    }
    this.proximosItens = lista.slice(0, 4);
  }
}