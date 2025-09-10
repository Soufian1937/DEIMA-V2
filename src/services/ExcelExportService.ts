import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Action, MembreEquipe, Email, SujetReunion } from '../types';

export class ExcelExportService {
  
  // Exporter toutes les données de la plateforme
  static exportAllData(
    actions: Action[],
    membres: MembreEquipe[],
    emails: Email[],
    reunionsManager: SujetReunion[],
    reunionsEquipe: SujetReunion[]
  ) {
    const workbook = XLSX.utils.book_new();

    // Feuille Actions
    const actionsData = actions.map(action => ({
      'ID': action.id,
      'Titre': action.titre,
      'Description': action.description,
      'Responsable': action.responsable,
      'Statut': action.statut,
      'Priorité': action.priorite,
      'Date Création': new Date(action.dateCreation).toLocaleDateString('fr-FR'),
      'Date Échéance': new Date(action.dateEcheance).toLocaleDateString('fr-FR'),
      'Origine': action.origine,
      'Progression (%)': action.progression,
      'Observations': action.observations
    }));
    const wsActions = XLSX.utils.json_to_sheet(actionsData);
    XLSX.utils.book_append_sheet(workbook, wsActions, 'Actions');

    // Feuille Équipe
    const equipesData = membres.map(membre => ({
      'ID': membre.id,
      'Prénom': membre.prenom,
      'Nom': membre.nom,
      'Email': membre.email,
      'Poste': membre.poste,
      'Actions Assignées': membre.actionsAssignees,
      'Actions Terminées': membre.actionsTerminees,
      'Performance (%)': Math.round((membre.actionsTerminees / (membre.actionsAssignees || 1)) * 100)
    }));
    const wsEquipe = XLSX.utils.json_to_sheet(equipesData);
    XLSX.utils.book_append_sheet(workbook, wsEquipe, 'Équipe');

    // Feuille Emails
    const emailsData = emails.map(email => ({
      'ID': email.id,
      'Expéditeur': email.expediteur,
      'Destinataire': email.destinataire,
      'Sujet': email.sujet,
      'Date Réception': new Date(email.dateReception).toLocaleString('fr-FR'),
      'Traité': email.traite ? 'Oui' : 'Non',
      'Action Associée': email.actionAssociee || 'N/A',
      'Contenu': email.contenu
    }));
    const wsEmails = XLSX.utils.json_to_sheet(emailsData);
    XLSX.utils.book_append_sheet(workbook, wsEmails, 'Emails');

    // Feuille Réunions Manager
    const reunionsManagerData = reunionsManager.map(reunion => ({
      'ID': reunion.id,
      'Titre': reunion.titre,
      'Description': reunion.description,
      'Statut': reunion.statut,
      'Responsable': reunion.responsable,
      'Date Réunion': new Date(reunion.dateReunion).toLocaleString('fr-FR'),
      'Type': reunion.typeReunion,
      'Actions Liées': reunion.actions.join(', '),
      'Notes': reunion.notes
    }));
    const wsReunionsManager = XLSX.utils.json_to_sheet(reunionsManagerData);
    XLSX.utils.book_append_sheet(workbook, wsReunionsManager, 'Réunions Manager');

    // Feuille Réunions Équipe
    const reunionsEquipeData = reunionsEquipe.map(reunion => ({
      'ID': reunion.id,
      'Titre': reunion.titre,
      'Description': reunion.description,
      'Statut': reunion.statut,
      'Responsable': reunion.responsable,
      'Date Stand-up': new Date(reunion.dateReunion).toLocaleString('fr-FR'),
      'Actions Liées': reunion.actions.join(', '),
      'Notes': reunion.notes
    }));
    const wsReunionsEquipe = XLSX.utils.json_to_sheet(reunionsEquipeData);
    XLSX.utils.book_append_sheet(workbook, wsReunionsEquipe, 'Stand-up Équipe');

    // Feuille Statistiques
    const statsData = [
      {
        'Métrique': 'Total Actions',
        'Valeur': actions.length,
        'Détails': `${actions.filter(a => a.statut === 'Terminé').length} terminées, ${actions.filter(a => a.statut === 'En cours').length} en cours`
      },
      {
        'Métrique': 'Total Membres Équipe',
        'Valeur': membres.length,
        'Détails': `Performance moyenne: ${Math.round(membres.reduce((acc, m) => acc + (m.actionsTerminees / (m.actionsAssignees || 1) * 100), 0) / membres.length)}%`
      },
      {
        'Métrique': 'Total Emails',
        'Valeur': emails.length,
        'Détails': `${emails.filter(e => e.traite).length} traités, ${emails.filter(e => !e.traite).length} non traités`
      },
      {
        'Métrique': 'Sujets Réunions Manager',
        'Valeur': reunionsManager.length,
        'Détails': `${reunionsManager.filter(r => r.statut === 'Ouvert').length} ouverts, ${reunionsManager.filter(r => r.statut === 'Fermé').length} fermés`
      },
      {
        'Métrique': 'Sujets Stand-up Équipe',
        'Valeur': reunionsEquipe.length,
        'Détails': `${reunionsEquipe.filter(r => r.statut === 'Ouvert').length} ouverts, ${reunionsEquipe.filter(r => r.statut === 'Fermé').length} fermés`
      }
    ];
    const wsStats = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(workbook, wsStats, 'Statistiques');

    // Générer et télécharger le fichier
    const fileName = `Direction_Etudes_Management_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  // Exporter seulement les actions
  static exportActions(actions: Action[]) {
    const workbook = XLSX.utils.book_new();
    const data = actions.map(action => ({
      'ID': action.id,
      'Titre': action.titre,
      'Description': action.description,
      'Responsable': action.responsable,
      'Statut': action.statut,
      'Priorité': action.priorite,
      'Date Création': new Date(action.dateCreation).toLocaleDateString('fr-FR'),
      'Date Échéance': new Date(action.dateEcheance).toLocaleDateString('fr-FR'),
      'Origine': action.origine,
      'Progression (%)': action.progression,
      'Observations': action.observations
    }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, ws, 'Actions');
    
    const fileName = `Actions_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  // Exporter seulement l'équipe
  static exportEquipe(membres: MembreEquipe[]) {
    const workbook = XLSX.utils.book_new();
    const data = membres.map(membre => ({
      'ID': membre.id,
      'Prénom': membre.prenom,
      'Nom': membre.nom,
      'Email': membre.email,
      'Poste': membre.poste,
      'Actions Assignées': membre.actionsAssignees,
      'Actions Terminées': membre.actionsTerminees,
      'Performance (%)': Math.round((membre.actionsTerminees / (membre.actionsAssignees || 1)) * 100)
    }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, ws, 'Équipe');
    
    const fileName = `Equipe_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  // Exporter seulement les emails
  static exportEmails(emails: Email[]) {
    const workbook = XLSX.utils.book_new();
    const data = emails.map(email => ({
      'ID': email.id,
      'Expéditeur': email.expediteur,
      'Destinataire': email.destinataire,
      'Sujet': email.sujet,
      'Date Réception': new Date(email.dateReception).toLocaleString('fr-FR'),
      'Traité': email.traite ? 'Oui' : 'Non',
      'Action Associée': email.actionAssociee || 'N/A',
      'Contenu': email.contenu
    }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, ws, 'Emails');
    
    // Ajouter signature
    const signatureData = [{ Info: 'Développé par Soufian RAMZI', Date: new Date().toLocaleDateString('fr-FR') }];
    const wsSignature = XLSX.utils.json_to_sheet(signatureData);
    XLSX.utils.book_append_sheet(workbook, wsSignature, 'Info');
    
    const fileName = `Emails_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  // Exporter rapport personnalisé
  static exportCustomReport(
    type: string,
    data: any[],
    columns: string[],
    fileName: string
  ) {
    const workbook = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, ws, type);
    
    const fullFileName = `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fullFileName);
  }

  // Sauvegarder vers le modèle Excel existant (mise à jour)
  static async updateExcelModel(
    actions: Action[],
    membres: MembreEquipe[],
    emails: Email[]
  ) {
    try {
      // Créer un nouveau fichier basé sur le modèle
      const workbook = XLSX.utils.book_new();

      // Créer les feuilles avec les données actuelles
      const actionsWS = XLSX.utils.json_to_sheet(actions.map(a => ({
        ID: a.id,
        Titre: a.titre,
        Responsable: a.responsable,
        Statut: a.statut,
        Priorite: a.priorite,
        Echeance: a.dateEcheance,
        Progression: a.progression
      })));

      const membresWS = XLSX.utils.json_to_sheet(membres.map(m => ({
        ID: m.id,
        Nom: `${m.prenom} ${m.nom}`,
        Email: m.email,
        Poste: m.poste,
        Actions_Assignees: m.actionsAssignees,
        Actions_Terminees: m.actionsTerminees
      })));

      const emailsWS = XLSX.utils.json_to_sheet(emails.map(e => ({
        ID: e.id,
        Expediteur: e.expediteur,
        Sujet: e.sujet,
        Date: e.dateReception,
        Traite: e.traite ? 'Oui' : 'Non'
      })));

      XLSX.utils.book_append_sheet(workbook, actionsWS, 'Actions');
      XLSX.utils.book_append_sheet(workbook, membresWS, 'Equipe');  
      XLSX.utils.book_append_sheet(workbook, emailsWS, 'Emails');

      // Sauvegarder en local
      const fileName = `suivi_des_actions_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      return { success: true, fileName };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return { success: false, error };
    }
  }
}