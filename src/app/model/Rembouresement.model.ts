export interface Remboursement {
  id?: number;
  date: string;
  montant: number;
  type: TypeRemboursement;
  creditId: number;
}

export enum TypeRemboursement {
  MENSUALITE = 'MENSUALITE',
  REMBOURSEMENT_ANTICIPE = 'REMBOURSEMENT_ANTICIPE'
}
