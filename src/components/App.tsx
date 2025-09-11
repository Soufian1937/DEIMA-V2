@@ .. @@
  // Fonction globale pour télécharger toutes les données
   const handleDownloadAllData = () => {
     try {
-      // Utilisation des données par défaut pour la démonstration
-      const actions = [
-        { id: '1', titre: 'Action test', description: 'Description test', responsable: 'Test', statut: 'En cours', priorite: 'Haute', dateCreation: Date.now(), dateEcheance: Date.now(), origine: 'Manuel', progression: 50, observations: 'Test' }
-      ];
-      const membres = [
-        { id: '1', prenom: 'John', nom: 'Doe', email: 'john@example.com', poste: 'Développeur', actionsAssignees: 5, actionsTerminees: 3 }
-      ];
-      const emails = [
-        { id: '1', expediteur: 'test@example.com', destinataire: 'user@example.com', sujet: 'Test', dateReception: Date.now(), traite: false, contenu: 'Contenu test' }
-      ];
-      const reunionsManager = [
-        { id: '1', titre: 'Réunion test', description: 'Description', statut: 'Ouvert', responsable: 'Manager', dateReunion: Date.now(), typeReunion: 'Hebdomadaire', actions: [], notes: 'Notes' }
-      ];
-      const reunionsEquipe = [
-        { id: '1', titre: 'Stand-up test', description: 'Description', statut: 'Ouvert', responsable: 'Team Lead', dateReunion: Date.now(), typeReunion: 'Daily', actions: [], notes: 'Notes' }
-      ];
+      // Récupérer les données réelles depuis localStorage
+      const actions = JSON.parse(localStorage.getItem('actions') || '[]');
+      const membres = JSON.parse(localStorage.getItem('membres') || '[]');
+      const emails = JSON.parse(localStorage.getItem('emails') || '[]');
+      const reunionsManager = JSON.parse(localStorage.getItem('reunionsManager') || '[]');
+      const reunionsEquipe = JSON.parse(localStorage.getItem('reunionsEquipe') || '[]');
       
       ExcelExportService.exportAllData(actions, membres, emails, reunionsManager, reunionsEquipe);
       alert('Téléchargement de tous les fichiers terminé ! Vérifiez vos téléchargements.');
     } catch (error) {
       console.error('Erreur lors du téléchargement:', error);
       alert('Erreur lors du téléchargement des fichiers.');
     }
   };