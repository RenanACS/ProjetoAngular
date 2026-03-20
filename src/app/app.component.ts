import { Component } from '@angular/core';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BibliotecaComponent],
  template: `<app-biblioteca></app-biblioteca>`
})
export class AppComponent {}