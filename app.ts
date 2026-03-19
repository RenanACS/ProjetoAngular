import { Component } from '@angular/core';
import { AcessoPortal } from './acesso-portal/acesso-portal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AcessoPortal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}