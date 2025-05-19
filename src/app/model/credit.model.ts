export interface Credit {
  id?: number;
  dateDemande: string;
  statut: Statut;
  dateAcception?: string;
  montant: number;
  dureeRemboursement: number;
  tauxInteret: number;
  clientId: number;
  typeCredit: string;
}

export enum Statut {
  EN_COURS = 'EN_COURS',
  ACCEPTE = 'ACCEPTE',
  REJETE = 'REJETE'
}

export interface CreditPersonnel extends Credit {
  motif: MotifPersonnel;
}

export interface CreditImmobilier extends Credit {
  typeBien: TypeBien;
}

export interface CreditProfessionnel extends Credit {
  motif: MotifPersonnel;
  raisonSociale: string;
}

export enum MotifPersonnel {
  ACHAT_VOITURE = 'ACHAT_VOITURE',
  ETUDES = 'ETUDES',
  TRAVAUX = 'TRAVAUX'
}

export enum TypeBien {
  APPARTEMENT = 'APPARTEMENT',
  MAISON = 'MAISON',
  LOCAL_COMMERCIAL = 'LOCAL_COMMERCIAL'
}
