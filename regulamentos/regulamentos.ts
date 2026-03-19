import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-regulamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './regulamentos.html'
})
export class Regulamentos {

  filtro: string = '';

  categorias = ['Acadêmica', 'Disciplinar', 'Avaliação'];

  regulamentos = [

    {
      titulo: 'Frequência mínima obrigatória',
      descricao: 'O aluno deverá cumprir no mínimo 75% de frequência nas atividades acadêmicas de cada disciplina. O controle de presença será realizado pelo docente responsável, sendo de inteira responsabilidade do discente acompanhar sua frequência ao longo do período letivo. O não cumprimento dessa exigência implicará reprovação automática, independentemente do desempenho nas avaliações.',
      categoria: 'Acadêmica',
      aberto: false
    },

    {
      titulo: 'Critérios de aprovação',
      descricao: 'Será considerado aprovado o aluno que obtiver média final igual ou superior a 7,0 (sete) e cumprir a frequência mínima exigida. A média será calculada com base nas avaliações aplicadas ao longo do semestre, podendo incluir provas, trabalhos, seminários e outras atividades acadêmicas previstas no plano de ensino da disciplina.',
      categoria: 'Avaliação',
      aberto: false
    },

    {
      titulo: 'Avaliação substitutiva',
      descricao: 'O aluno poderá solicitar a realização de avaliação substitutiva em caso de ausência justificada em avaliações oficiais. A solicitação deverá ser formalizada junto à coordenação do curso dentro do prazo estabelecido, mediante apresentação de documentação comprobatória. A aplicação da avaliação substitutiva seguirá as normas institucionais vigentes.',
      categoria: 'Avaliação',
      aberto: false
    },

    {
      titulo: 'Entrega de atividades',
      descricao: 'As atividades acadêmicas deverão ser entregues dentro dos prazos estabelecidos pelo docente, conforme cronograma da disciplina. Trabalhos entregues fora do prazo poderão sofrer penalizações, salvo em casos devidamente justificados e aceitos pelo professor responsável. É dever do aluno acompanhar as datas e orientações divulgadas.',
      categoria: 'Acadêmica',
      aberto: false
    },

    {
      titulo: 'Conduta disciplinar',
      descricao: 'O aluno deve manter comportamento ético, respeitoso e colaborativo dentro do ambiente acadêmico, incluindo salas de aula, laboratórios e demais dependências da instituição. Atitudes que comprometam a ordem, o respeito ou a integridade de membros da comunidade acadêmica estarão sujeitas a sanções disciplinares previstas no regimento interno.',
      categoria: 'Disciplinar',
      aberto: false
    },

    {
      titulo: 'Uso de recursos institucionais',
      descricao: 'Os recursos disponibilizados pela instituição, como laboratórios, bibliotecas e equipamentos, devem ser utilizados exclusivamente para fins acadêmicos. O uso inadequado, danificação ou apropriação indevida desses recursos poderá resultar em medidas disciplinares, além de possíveis responsabilidades administrativas e legais.',
      categoria: 'Disciplinar',
      aberto: false
    }

  ];

  toggle(item: any) {
    item.aberto = !item.aberto;
  }

  getRegulamentosFiltrados() {
    if (!this.filtro) return this.regulamentos;
    return this.regulamentos.filter(r => r.categoria === this.filtro);
  }
}