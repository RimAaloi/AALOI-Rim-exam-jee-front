import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Client} from '../model/client.model';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  errorMessage: string = '';
  newClient: Client = { nom: '', email: '' };
  editingClient: Client | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement : ' + err.message;
      }
    });
  }

  addClient() {
    this.clientService.addClient(this.newClient).subscribe({
      next: () => {
        this.loadClients();
        this.newClient = { nom: '', email: '' };
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout : ' + err.message;
      }
    });
  }

  editClient(client: Client) {
    this.editingClient = { ...client };
  }

  updateClient() {
    if (this.editingClient) {
      this.clientService.updateClient(this.editingClient).subscribe({
        next: () => {
          this.loadClients();
          this.editingClient = null;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour : ' + err.message;
        }
      });
    }
  }

  deleteClient(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression : ' + err.message;
        }
      });
    }
  }
}
