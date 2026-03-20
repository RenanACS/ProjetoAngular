import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosAtivos, TipoEvento } from '../models/evento.model';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent {

  @Input()  filtrosAtivos: FiltrosAtivos = { aula: true, prova: true, feriado: true, evento: true };
  @Output() filtroAlterado = new EventEmitter<FiltrosAtivos>();

  chips: { tipo: TipoEvento; label: string }[] = [
    { tipo: 'aula',    label: 'Aulas' },
    { tipo: 'prova',   label: 'Provas' },
    { tipo: 'feriado', label: 'Feriados' },
    { tipo: 'evento',  label: 'Eventos' },
  ];

  toggleFiltro(tipo: TipoEvento): void {
    this.filtroAlterado.emit({ ...this.filtrosAtivos, [tipo]: !this.filtrosAtivos[tipo] });
  }

  getClasseChip(tipo: TipoEvento): string {
    const base = 'px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-all hover:-translate-y-px';
    if (!this.filtrosAtivos[tipo]) return `${base} bg-white text-gray-400 border-gray-200`;
    const mapa: Record<TipoEvento, string> = {
      aula:    `${base} bg-blue-100    text-blue-800    border-blue-300`,
      prova:   `${base} bg-amber-100   text-amber-800   border-amber-300`,
      feriado: `${base} bg-pink-100    text-pink-800    border-pink-300`,
      evento:  `${base} bg-emerald-100 text-emerald-800 border-emerald-300`,
    };
    return mapa[tipo];
  }
}