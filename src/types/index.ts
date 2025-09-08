export interface Action {
  id: string;
  titre: string;
  description: string;
  responsable: string;
  statut: 'En cours' | 'Terminé' | 'En retard' | 'À faire';
  priorite: 'Haute' | 'Moyenne' | 'Basse';
  dateCreation: string;
  dateEcheance: string;
  origine: string;
  observations: string;
  progression: number;
}

export interface Email {
  id: string;
  expediteur: string;
  destinataire: string;
  sujet: string;
  contenu: string;
  dateReception: string;
  actionAssociee?: string;
  traite: boolean;
}

export interface SujetReunion {
  id: string;
  titre: string;
  description: string;
  statut: 'Ouvert' | 'En cours' | 'Fermé';
  responsable: string;
  dateReunion: string;
  typeReunion: 'Manager' | 'Équipe';
  actions: string[];
  notes: string;
}

export interface MembreEquipe {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  actionsAssignees: number;
  actionsTerminees: number;
}

export interface Rapport {
  id: string;
  titre: string;
  dateGeneration: string;
  type: 'Actions' | 'Équipe' | 'Réunions';
  donnees: any;
}