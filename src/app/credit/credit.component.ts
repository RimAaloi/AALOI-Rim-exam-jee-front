import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Credit, MotifPersonnel, Statut, TypeBien} from '../model/credit.model';
import {Client} from '../model/client.model';
import {CreditService} from '../services/credit.service';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  credits: Credit[] = [];
  clients: Client[] = [];
  errorMessage: string = '';
  newCredit: Credit & { motif?: MotifPersonnel; typeBien?: TypeBien; raisonSociale?: string } = {
    dateDemande: new Date().toISOString().split('T')[0],
    statut: Statut.EN_COURS,
    montant: 0,
    dureeRemboursement: 0,
    tauxInteret: 0,
    clientId: 0,
    typeCredit: 'PERSONNEL'
  };
  editingCredit: (Credit & { motif?: MotifPersonnel; typeBien?: TypeBien; raisonSociale?: string }) | null = null;
  statuts = Object.values(Statut);
  motifs = Object.values(MotifPersonnel);
  typeBiens = Object.values(TypeBien);

  constructor(
    private creditService: CreditService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.loadCredits();
    this.loadClients();
  }

  loadCredits() {
    this.creditService.getCredits().subscribe({
      next: (data) => {
        this.credits = data || [];
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des crédits : ' + (err.message || 'Erreur inconnue');
        this.credits = [];
      }
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data || [];
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des clients : ' + (err.message || 'Erreur inconnue');
      }
    });
  }

  addCredit() {
    this.errorMessage = '';
    const creditToAdd: Credit = {
      dateDemande: this.newCredit.dateDemande,
      statut: this.newCredit.statut,
      montant: this.newCredit.montant,
      dureeRemboursement: this.newCredit.dureeRemboursement,
      tauxInteret: this.newCredit.tauxInteret,
      clientId: this.newCredit.clientId,
      typeCredit: this.newCredit.typeCredit
    };

    // Ajouter les champs spécifiques selon le type
    if (this.newCredit.typeCredit === 'PERSONNEL') {
      (creditToAdd as any).motif = this.newCredit.motif || MotifPersonnel.ACHAT_VOITURE;
    } else if (this.newCredit.typeCredit === 'IMMOBILIER') {
      (creditToAdd as any).typeBien = this.newCredit.typeBien || TypeBien.APPARTEMENT;
    } else if (this.newCredit.typeCredit === 'PROFESSIONNEL') {
      (creditToAdd as any).motif = this.newCredit.motif || MotifPersonnel.ACHAT_VOITURE;
      (creditToAdd as any).raisonSociale = this.newCredit.raisonSociale || 'Entreprise';
    }

    this.creditService.addCredit(creditToAdd).subscribe({
      next: () => {
        this.loadCredits();
        this.resetNewCredit();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout du crédit : ' + (err.message || 'Erreur inconnue');
      }
    });
  }

  editCredit(credit: Credit) {
    this.editingCredit = { ...credit };
  }

  updateCredit() {
    if (this.editingCredit) {
      const creditToUpdate: Credit = {
        id: this.editingCredit.id,
        dateDemande: this.editingCredit.dateDemande,
        statut: this.editingCredit.statut,
        montant: this.editingCredit.montant,
        dureeRemboursement: this.editingCredit.dureeRemboursement,
        tauxInteret: this.editingCredit.tauxInteret,
        clientId: this.editingCredit.clientId,
        typeCredit: this.editingCredit.typeCredit
      };

      // Ajouter les champs spécifiques selon le type
      if (this.editingCredit.typeCredit === 'PERSONNEL') {
        (creditToUpdate as any).motif = this.editingCredit.motif || MotifPersonnel.ACHAT_VOITURE;
      } else if (this.editingCredit.typeCredit === 'IMMOBILIER') {
        (creditToUpdate as any).typeBien = this.editingCredit.typeBien || TypeBien.APPARTEMENT;
      } else if (this.editingCredit.typeCredit === 'PROFESSIONNEL') {
        (creditToUpdate as any).motif = this.editingCredit.motif || MotifPersonnel.ACHAT_VOITURE;
        (creditToUpdate as any).raisonSociale = this.editingCredit.raisonSociale || 'Entreprise';
      }

      this.creditService.updateCredit(creditToUpdate).subscribe({
        next: () => {
          this.loadCredits();
          this.editingCredit = null;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour : ' + (err.message || 'Erreur inconnue');
        }
      });
    }
  }

  deleteCredit(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce crédit ?')) {
      this.creditService.deleteCredit(id).subscribe({
        next: () => {
          this.loadCredits();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression : ' + (err.message || 'Erreur inconnue');
        }
      });
    }
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? `${client.nom} (${client.email})` : 'Inconnu';
  }

  resetNewCredit() {
    this.newCredit = {
      dateDemande: new Date().toISOString().split('T')[0],
      statut: Statut.EN_COURS,
      montant: 0,
      dureeRemboursement: 0,
      tauxInteret: 0,
      clientId: 0,
      typeCredit: 'PERSONNEL'
    };
  }
}
