import { Routes } from '@angular/router';
import { AcessoPortal } from './acesso-portal/acesso-portal';
import { Portal } from './portal/portal';

export const routes: Routes = [
  { path: '', component: AcessoPortal },
  { path: 'portal', component: Portal }
];