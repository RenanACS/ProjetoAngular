import { Component, OnInit, inject } from '@angular/core';
import { EventosService }    from './services/eventos.service';
import { Evento, DiaEvento, FiltrosAtivos, TipoEvento } from './models/evento.model';
import { FiltroComponent }        from './filtro/filtro.component';
import { CalendarioComponent }    from './calendario/calendario.component';
import { PainelEventosComponent } from './painel-eventos/painel-eventos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FiltroComponent, CalendarioComponent, PainelEventosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {

  private eventosService = inject(EventosService);

  eventos:             { [key: string]: Evento[] } = {};
  filtrosAtivos:       FiltrosAtivos = { aula: true, prova: true, feriado: true, evento: true };
  diaSelecionadoAtual: DiaEvento | null = null;
  eventosDoDia:        Evento[] = [];

  ngOnInit(): void {
    this.eventos = this.eventosService.getEventos();
  }

  onFiltroAlterado(filtros: FiltrosAtivos): void {
    this.filtrosAtivos = { ...filtros };
  }

  onDiaSelecionado(dia: DiaEvento): void {
    this.diaSelecionadoAtual = dia;
    this.eventosDoDia = (this.eventos[dia.chave] || [])
      .filter((e: Evento) => this.filtrosAtivos[e.tipo as TipoEvento]);
  }
}