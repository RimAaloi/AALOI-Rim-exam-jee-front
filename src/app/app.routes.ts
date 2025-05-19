import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { CreditComponent } from './credit/credit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'credits', component: CreditComponent },
  { path: 'remboursements', redirectTo: '' }
];
