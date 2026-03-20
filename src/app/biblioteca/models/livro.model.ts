export type StatusLivro = 'disponivel' | 'emprestado' | 'reservado';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  editora: string;
  isbn: string;
  genero: string;
  descricao: string;
  paginas: number;
  idioma: string;
  capa: string; // emoji ou URL
  status: StatusLivro;
  empresiadoPor?: string; // nome do aluno, se emprestado
  dataDevolucao?: string;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  curso: string;
  livrosEmprestados: number[]; // IDs dos livros
}

export interface Emprestimo {
  id: number;
  livroId: number;
  alunoId: number;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal?: string;
  ativo: boolean;
}