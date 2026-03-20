import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';

@Injectable({ providedIn: 'root' })
export class EventosService {

  private dados: { [key: string]: Evento[] } = {

    '2025-03-03': [{ tipo: 'aula',    titulo: 'Início do semestre letivo',      desc: 'Primeiro dia de aulas do 1º semestre 2025' }],
    '2025-03-17': [{ tipo: 'feriado', titulo: 'Feriado Municipal de Belém',     desc: 'Ponto facultativo — verificar com professor' }],
    '2025-03-24': [{ tipo: 'feriado', titulo: 'Carnaval',                       desc: 'Recesso carnavalesco — sem aulas' }],
    '2025-03-25': [{ tipo: 'feriado', titulo: 'Carnaval',                       desc: 'Feriado nacional — sem aulas' }],
    '2025-03-26': [{ tipo: 'feriado', titulo: 'Quarta de Cinzas',               desc: 'Ponto facultativo até meio-dia' }],
    '2025-04-07': [{ tipo: 'feriado', titulo: 'Paixão de Cristo',               desc: 'Feriado nacional — sem aulas' }],
    '2025-04-14': [{ tipo: 'evento',  titulo: 'Semana Acadêmica UNAMA',         desc: 'Palestras, workshops e networking — Dia 1' }],
    '2025-04-15': [{ tipo: 'evento',  titulo: 'Semana Acadêmica UNAMA',         desc: 'Workshops práticos — Dia 2' }],
    '2025-04-16': [{ tipo: 'evento',  titulo: 'Semana Acadêmica UNAMA',         desc: 'Encerramento — Dia 3' }],
    '2025-04-21': [{ tipo: 'feriado', titulo: 'Tiradentes',                     desc: 'Feriado nacional — sem aulas' }],
    '2025-04-25': [{ tipo: 'prova',   titulo: 'P1 — Cálculo',                   desc: 'Sala 301 · 19h às 21h · Capítulos 1 ao 4' }],
    '2025-04-28': [{ tipo: 'prova',   titulo: 'P1 — Algoritmos',                desc: 'Lab de Informática A · 19h às 21h' }],
    '2025-04-30': [{ tipo: 'prova',   titulo: 'P1 — Física',                    desc: 'Auditório Central · 19h às 21h' }],
    '2025-05-01': [{ tipo: 'feriado', titulo: 'Dia do Trabalho',                desc: 'Feriado nacional — sem aulas' }],
    '2025-05-09': [{ tipo: 'prova',   titulo: 'P1 — Programação Web',           desc: 'Lab B · 19h · Prof. André Neto' }],
    '2025-05-12': [{ tipo: 'prova',   titulo: 'P1 — Estrutura de Dados',        desc: 'Sala 204 · 19h às 21h' }],
    '2025-05-19': [{ tipo: 'evento',  titulo: 'Hackathon UNAMA — Dia 1',        desc: 'Competição de 24h — inscrições na secretaria' }],
    '2025-05-20': [{ tipo: 'evento',  titulo: 'Hackathon UNAMA — Dia 2',        desc: 'Apresentação dos projetos — 18h, Auditório' }],
    '2025-05-29': [{ tipo: 'feriado', titulo: 'Corpus Christi',                 desc: 'Feriado nacional — sem aulas' }],
    '2025-06-03': [{ tipo: 'prova',   titulo: 'P2 — Cálculo',                   desc: 'Sala 301 · 19h às 21h · Capítulos 5 ao 8' }],
    '2025-06-06': [{ tipo: 'prova',   titulo: 'P2 — Algoritmos',                desc: 'Lab A · 19h às 21h' }],
    '2025-06-10': [{ tipo: 'prova',   titulo: 'P2 — Física',                    desc: 'Auditório · 19h às 21h' }],
    '2025-06-13': [{ tipo: 'feriado', titulo: 'Festa de Santo Antônio',         desc: 'Feriado municipal de Belém' }],
    '2025-06-17': [{ tipo: 'prova',   titulo: 'P2 — Programação Web',           desc: 'Lab B · 19h · Prof. André Neto' }],
    '2025-06-19': [{ tipo: 'prova',   titulo: 'P2 — Estrutura de Dados',        desc: 'Sala 204 · 19h às 21h' }],
    '2025-06-24': [{ tipo: 'feriado', titulo: 'Festa de São João',              desc: 'Ponto facultativo' }],
    '2025-06-27': [{ tipo: 'evento',  titulo: 'Último dia de aulas — 1º sem.',  desc: 'Encerramento do semestre letivo' }],
    '2025-06-30': [{ tipo: 'evento',  titulo: 'Divulgação de resultados',       desc: 'Notas finais disponíveis no portal AVA' }],
    '2025-07-01': [{ tipo: 'evento',  titulo: 'Início das férias de julho',     desc: 'Recesso — retorno previsto em agosto' }],
    '2025-07-07': [{ tipo: 'prova',   titulo: 'Prova final — reposição',        desc: 'Alunos com frequência mínima e média entre 4 e 6' }],
    '2025-07-10': [{ tipo: 'prova',   titulo: 'Segunda chamada geral',          desc: 'Solicitar na secretaria com antecedência' }],
    '2025-08-04': [{ tipo: 'aula',    titulo: 'Início do 2º semestre',          desc: 'Primeiro dia de aulas do 2º semestre 2025' }],
    '2025-08-15': [{ tipo: 'feriado', titulo: 'Pré-Círio — Nossa Sra. Nazaré', desc: 'Ponto facultativo estadual' }],
  };

  getEventos(): { [key: string]: Evento[] } {
    return this.dados;
  }

  getEventosDoDia(chave: string): Evento[] {
    return this.dados[chave] || [];
  }
}