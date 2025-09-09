import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ActionsGlobales from './components/ActionsGlobales';
import TraitementMailing from './components/TraitementMailing';
import ReunionsManager from './components/ReunionsManager';
import ReunionsEquipe from './components/ReunionsEquipe';
import Rapports from './components/Rapports';
import GestionEquipe from './components/GestionEquipe';
import ObjectifsIndividuels from './components/ObjectifsIndividuels';
import { ExcelExportService } from './services/ExcelExportService';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Fonction globale pour télécharger toutes les données
  const handleDownloadAllData = () => {
    try {
      // Utilisation des données par défaut pour la démonstration
      const actions = [
        { id: '1', titre: 'Action test', description: 'Description test', responsable: 'Test', statut: 'En cours', priorite: 'Haute', dateCreation: Date.now(), dateEcheance: Date.now(), origine: 'Manuel', progression: 50, observations: 'Test' }
      ];
      const membres = [
        { id: '1', prenom: 'John', nom: 'Doe', email: 'john@example.com', poste: 'Développeur', actionsAssignees: 5, actionsTerminees: 3 }
      ];
      const emails = [
        { id: '1', expediteur: 'test@example.com', destinataire: 'user@example.com', sujet: 'Test', dateReception: Date.now(), traite: false, contenu: 'Contenu test' }
      ];
      const reunionsManager = [
        { id: '1', titre: 'Réunion test', description: 'Description', statut: 'Ouvert', responsable: 'Manager', dateReunion: Date.now(), typeReunion: 'Hebdomadaire', actions: [], notes: 'Notes' }
      ];
      const reunionsEquipe = [
        { id: '1', titre: 'Stand-up test', description: 'Description', statut: 'Ouvert', responsable: 'Team Lead', dateReunion: Date.now(), typeReunion: 'Daily', actions: [], notes: 'Notes' }
      ];
      
      ExcelExportService.exportAllData(actions, membres, emails, reunionsManager, reunionsEquipe);
      alert('Téléchargement de tous les fichiers terminé ! Vérifiez vos téléchargements.');
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement des fichiers.');
    }
  };
  
  // Exposer la fonction globalement pour qu'elle soit accessible
  (window as any).downloadAllFiles = handleDownloadAllData;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'actions':
        return <ActionsGlobales />;
      case 'emails':
        return <TraitementMailing />;
      case 'reunions-manager':
        return <ReunionsManager />;
      case 'reunions-equipe':
        return <ReunionsEquipe />;
      case 'objectifs':
        return <ObjectifsIndividuels />;
      case 'rapports':
        return <Rapports />;
      case 'equipe':
        return <GestionEquipe />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
