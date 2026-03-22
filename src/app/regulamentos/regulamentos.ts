import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regulamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './regulamentos.html'
})
export class Regulamentos {
  constructor(private router: Router){}
  // Categoria selecionada no filtro

  //construtor aqui

  categoriaSelecionada: string = 'Todas';

  // Lista de categorias disponíveis
  categorias = ['Todas', 'Avaliação', 'Acadêmica', 'Disciplinar'];

  // Lista de regulamentos com categoria
  regulamentos = [
    {
      titulo: 'Frequência Mínima Obrigatória',
      descricao: 'O aluno deverá cumprir no mínimo 75% de frequência nas atividades acadêmicas de cada disciplina. O controle de presença será realizado pelo docente responsável, sendo de inteira responsabilidade do discente acompanhar sua frequência ao longo do período letivo. O não cumprimento dessa exigência implicará reprovação automática.',
      categoria: 'Acadêmica',
      aberto: false
    },
    {
      titulo: 'Critérios de Aprovação',
      descricao: 'Será considerado aprovado o aluno que obtiver média final igual ou superior a 7,0 (sete) e cumprir a frequência mínima exigida. A média será calculada com base nas avaliações aplicadas ao longo do semestre.',
      categoria: 'Avaliação',
      aberto: false
    },
    {
      titulo: 'Avaliação Substitutiva',
      descricao: 'O aluno poderá solicitar a realização de avaliação substitutiva em caso de ausência justificada em avaliações oficiais. A solicitação deverá ser formalizada junto à coordenação do curso dentro do prazo estabelecido.',
      categoria: 'Avaliação',
      aberto: false
    },
    {
      titulo: 'Entrega de Atividades',
      descricao: 'As atividades acadêmicas deverão ser entregues dentro dos prazos estabelecidos pelo docente. Trabalhos entregues fora do prazo poderão sofrer penalizações.',
      categoria: 'Acadêmica',
      aberto: false
    },
    {
      titulo: 'Conduta Disciplinar',
      descricao: 'O aluno deve manter comportamento ético, respeitoso e colaborativo dentro do ambiente acadêmico. Atitudes que comprometam a ordem, o respeito ou a integridade de membros da comunidade acadêmica estarão sujeitas a sanções disciplinares.',
      categoria: 'Disciplinar',
      aberto: false
    },
    {
      titulo: 'Uso de Recursos Institucionais',
      descricao: 'Os recursos disponibilizados pela instituição, como laboratórios, bibliotecas e equipamentos, devem ser utilizados exclusivamente para fins acadêmicos. O uso inadequado poderá resultar em medidas disciplinares.',
      categoria: 'Disciplinar',
      aberto: false
    }
  ];

  // Alterna abertura da descrição
  toggle(item: any) {
    item.aberto = !item.aberto;
  }

  // Botão voltar
  voltar() {
    this.router.navigate(['/portal'])
  }

  // Retorna regulamentos filtrados por categoria
  getRegulamentosFiltrados() {
    if (this.categoriaSelecionada === 'Todas') {
      return this.regulamentos;
    }
    return this.regulamentos.filter(r => r.categoria === this.categoriaSelecionada);
  }
}
