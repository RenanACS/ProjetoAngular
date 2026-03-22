import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Livro, Aluno } from './models/livro.model';
import { BibliotecaService } from './services/biblioteca.service';
import { DisponiveisPipe, EmprestadosPipe } from './pipes/status.pipe';

type Aba = 'acervo' | 'cadastro-livro' | 'cadastro-aluno' | 'emprestimos';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, FormsModule, DisponiveisPipe, EmprestadosPipe],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit, OnDestroy {

  abaAtiva: Aba = 'acervo';
  livros: Livro[] = [];
  alunos: Aluno[] = [];
  livroSelecionado: Livro | null = null;
  modalEmprestimoAberto = false;
  mensagem: { texto: string; tipo: 'sucesso' | 'erro' } | null = null;

  formLivro = {
    titulo: '', autor: '', anoPublicacao: new Date().getFullYear(),
    editora: '', isbn: '', genero: '', descricao: '',
    paginas: 0, idioma: 'Português', capa: '📚'
  };

  formAluno = { nome: '', matricula: '', email: '', curso: '' };
  formEmprestimo = { alunoNome: '', dataDevolucao: '' };

  private subs = new Subscription();

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.subs.add(
      this.bibliotecaService.getLivros().subscribe((livros: Livro[]) => (this.livros = livros))
    );
    this.subs.add(
      this.bibliotecaService.getAlunos().subscribe((alunos: Aluno[]) => (this.alunos = alunos))
    );
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  mudarAba(aba: Aba): void { this.abaAtiva = aba; this.livroSelecionado = null; }

  abrirDetalhes(livro: Livro): void { this.livroSelecionado = livro; }
  fecharDetalhes(): void { this.livroSelecionado = null; this.modalEmprestimoAberto = false; }
  abrirModalEmprestimo(): void { this.modalEmprestimoAberto = true; }

  confirmarEmprestimo(): void {
    if (!this.livroSelecionado) return;
    const { alunoNome, dataDevolucao } = this.formEmprestimo;
    if (!alunoNome.trim() || !dataDevolucao) {
      this.exibirMensagem('Preencha todos os campos do empréstimo.', 'erro');
      return;
    }
    const sucesso = this.bibliotecaService.realizarEmprestimo(
      this.livroSelecionado.id, alunoNome, dataDevolucao
    );
    if (sucesso) {
      this.exibirMensagem(`Livro emprestado para ${alunoNome} com sucesso!`, 'sucesso');
      this.formEmprestimo = { alunoNome: '', dataDevolucao: '' };
      this.modalEmprestimoAberto = false;
      this.livroSelecionado = null;
    } else {
      this.exibirMensagem('Não foi possível realizar o empréstimo.', 'erro');
    }
  }

  devolver(livro: Livro): void {
    this.bibliotecaService.devolverLivro(livro.id);
    this.exibirMensagem(`"${livro.titulo}" devolvido com sucesso!`, 'sucesso');
    this.livroSelecionado = null;
  }

  cadastrarLivro(): void {
    const { titulo, autor, editora, isbn } = this.formLivro;
    if (!titulo.trim() || !autor.trim() || !editora.trim() || !isbn.trim()) {
      this.exibirMensagem('Preencha todos os campos obrigatórios.', 'erro');
      return;
    }
    this.bibliotecaService.adicionarLivro({ ...this.formLivro, status: 'disponivel' });
    this.exibirMensagem(`"${titulo}" cadastrado no acervo!`, 'sucesso');
    this.formLivro = {
      titulo: '', autor: '', anoPublicacao: new Date().getFullYear(),
      editora: '', isbn: '', genero: '', descricao: '',
      paginas: 0, idioma: 'Português', capa: '📚'
    };
  }

  cadastrarAluno(): void {
    const { nome, matricula, email, curso } = this.formAluno;
    if (!nome.trim() || !matricula.trim() || !email.trim() || !curso.trim()) {
      this.exibirMensagem('Preencha todos os campos do aluno.', 'erro');
      return;
    }
    this.bibliotecaService.cadastrarAluno(this.formAluno);
    this.exibirMensagem(`Aluno "${nome}" cadastrado com sucesso!`, 'sucesso');
    this.formAluno = { nome: '', matricula: '', email: '', curso: '' };
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      disponivel: 'Disponível', emprestado: 'Emprestado', reservado: 'Reservado'
    };
    return map[status] ?? status;
  }

  private exibirMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = { texto, tipo };
    setTimeout(() => (this.mensagem = null), 4000);
  }
}