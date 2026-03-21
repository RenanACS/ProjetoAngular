import { Routes } from '@angular/router';
import { TelaCalendario } from './tela-calendario/tela-calendario';
import { LaboratorioLista } from './laboratorio-lista/laboratorio-lista';
import { AcessoPortal } from './acesso-portal/src/app/acesso-portal/acesso-portal';
import { Portal } from './acesso-portal/src/app/portal/portal';

export const routes: Routes = [
  // 1. As rotas específicas vêm primeiro
  { path: 'login', component: AcessoPortal },
  { path: 'portal', component: Portal },
  { path: 'laboratorios', component: LaboratorioLista },

  // 2. A rota vazia SEMPRE por último e com pathMatch: 'full'
  // Isso diz ao Angular: "Só mostre o calendário se a URL estiver TOTALMENTE vazia"
  { path: '', component: TelaCalendario, pathMatch: 'full' }
];