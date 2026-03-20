import { Pipe, PipeTransform } from '@angular/core';
import { Livro } from '../models/livro.model';

@Pipe({ name: 'disponivel', standalone: true })
export class DisponiveisPipe implements PipeTransform {
  transform(livros: Livro[]): number {
    return livros.filter(l => l.status === 'disponivel').length;
  }
}

@Pipe({ name: 'emprestado', standalone: true })
export class EmprestadosPipe implements PipeTransform {
  transform(livros: Livro[]): number {
    return livros.filter(l => l.status === 'emprestado').length;
  }
}