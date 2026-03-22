import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Livro, Aluno, Emprestimo, StatusLivro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  // ─── Dados iniciais dos livros ───────────────────────────────────────────────
  private livrosIniciais: Livro[] = [
    {
      id: 1,
      titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      autor: 'Robert C. Martin',
      anoPublicacao: 2008,
      editora: 'Prentice Hall',
      isbn: '978-0132350884',
      genero: 'Tecnologia / Programação',
      descricao: 'Um guia essencial para escrever código limpo, legível e sustentável. Robert Martin apresenta princípios, padrões e práticas para criar software de qualidade que qualquer desenvolvedor consiga manter.',
      paginas: 431,
      idioma: 'Inglês',
      capa: '💻',
      status: 'disponivel'
    },
    {
      id: 2,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      anoPublicacao: 1899,
      editora: 'Garnier',
      isbn: '978-8572327787',
      genero: 'Literatura Brasileira / Romance',
      descricao: 'Um dos maiores romances da literatura brasileira. Bentinho narra sua vida desde a infância até a velhice, marcada pelo amor e pela dúvida sobre a fidelidade de Capitu — personagem que se tornou um símbolo cultural do Brasil.',
      paginas: 256,
      idioma: 'Português',
      capa: '📖',
      status: 'emprestado',
      empresiadoPor: 'Maria Silva',
      dataDevolucao: '2026-04-01'
    },
    {
      id: 3,
      titulo: 'Algoritmos: Teoria e Prática',
      autor: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest',
      anoPublicacao: 2009,
      editora: 'MIT Press',
      isbn: '978-0262033848',
      genero: 'Tecnologia / Ciência da Computação',
      descricao: 'O livro de algoritmos mais completo e rigoroso já publicado. Cobre estruturas de dados, ordenação, grafos e programação dinâmica com profundidade matemática e exemplos práticos amplamente usados em universidades do mundo inteiro.',
      paginas: 1292,
      idioma: 'Inglês',
      capa: '🧮',
      status: 'disponivel'
    }
  ];

  private livros$ = new BehaviorSubject<Livro[]>([...this.livrosIniciais]);
  private alunos$ = new BehaviorSubject<Aluno[]>([]);
  private emprestimos$ = new BehaviorSubject<Emprestimo[]>([
    {
      id: 1,
      livroId: 2,
      alunoId: 1,
      dataEmprestimo: '2026-03-10',
      dataDevolucaoPrevista: '2026-04-01',
      ativo: true
    }
  ]);

  private nextLivroId = 4;
  private nextAlunoId = 2;
  private nextEmprestimoId = 2;

  // ─── Livros ──────────────────────────────────────────────────────────────────

  getLivros(): Observable<Livro[]> {
    return this.livros$.asObservable();
  }

  getLivroById(id: number): Livro | undefined {
    return this.livros$.getValue().find(l => l.id === id);
  }

  adicionarLivro(livro: Omit<Livro, 'id'>): void {
    const novoLivro: Livro = { ...livro, id: this.nextLivroId++ };
    this.livros$.next([...this.livros$.getValue(), novoLivro]);
  }

  atualizarStatusLivro(id: number, status: StatusLivro, empresiadoPor?: string, dataDevolucao?: string): void {
    const livros = this.livros$.getValue().map(l =>
      l.id === id ? { ...l, status, empresiadoPor, dataDevolucao } : l
    );
    this.livros$.next(livros);
  }

  // ─── Alunos ──────────────────────────────────────────────────────────────────

  getAlunos(): Observable<Aluno[]> {
    return this.alunos$.asObservable();
  }

  getAlunoById(id: number): Aluno | undefined {
    return this.alunos$.getValue().find(a => a.id === id);
  }

  cadastrarAluno(aluno: Omit<Aluno, 'id' | 'livrosEmprestados'>): void {
    const novoAluno: Aluno = { ...aluno, id: this.nextAlunoId++, livrosEmprestados: [] };
    this.alunos$.next([...this.alunos$.getValue(), novoAluno]);
  }

  // ─── Empréstimos ─────────────────────────────────────────────────────────────

  getEmprestimos(): Observable<Emprestimo[]> {
    return this.emprestimos$.asObservable();
  }

  realizarEmprestimo(livroId: number, alunoNome: string, dataDevolucao: string): boolean {
    const livro = this.getLivroById(livroId);
    if (!livro || livro.status !== 'disponivel') return false;

    const novoEmprestimo: Emprestimo = {
      id: this.nextEmprestimoId++,
      livroId,
      alunoId: 0,
      dataEmprestimo: new Date().toISOString().split('T')[0],
      dataDevolucaoPrevista: dataDevolucao,
      ativo: true
    };

    this.emprestimos$.next([...this.emprestimos$.getValue(), novoEmprestimo]);
    this.atualizarStatusLivro(livroId, 'emprestado', alunoNome, dataDevolucao);
    return true;
  }

  devolverLivro(livroId: number): void {
    const emprestimos = this.emprestimos$.getValue().map(e =>
      e.livroId === livroId && e.ativo
        ? { ...e, ativo: false, dataDevolucaoReal: new Date().toISOString().split('T')[0] }
        : e
    );
    this.emprestimos$.next(emprestimos);
    this.atualizarStatusLivro(livroId, 'disponivel');
  }
}