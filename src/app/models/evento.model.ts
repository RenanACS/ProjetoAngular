export type TipoEvento = 'aula' | 'prova' | 'feriado' | 'evento';

export interface Evento {
  tipo: TipoEvento;
  titulo: string;
  desc: string;
}

export interface DiaEvento {
  chave: string;
  dia: number;
  mes: number;
  ano: number;
  eventos: Evento[];
}

export interface FiltrosAtivos {
  aula: boolean;
  prova: boolean;
  feriado: boolean;
  evento: boolean;
}