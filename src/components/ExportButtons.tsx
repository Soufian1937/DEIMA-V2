import React from 'react';
import { Download, FileSpreadsheet, Database } from 'lucide-react';
import { ExcelExportService } from '../services/ExcelExportService';
import { Action, MembreEquipe, Email, SujetReunion } from '../types';

interface ExportButtonsProps {
  type: 'actions' | 'equipe' | 'emails' | 'reunions' | 'all';
  data?: {
    actions?: Action[];
    membres?: MembreEquipe[];
    emails?: Email[];
    reunionsManager?: SujetReunion[];
    reunionsEquipe?: SujetReunion[];
  };
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ type, data = {} }) => {
  const handleExportSpecific = () => {
    switch (type) {
      case 'actions':
        if (data.actions) {
          ExcelExportService.exportActions(data.actions);
          alert('Export des actions terminé !');
        }
        break;
      case 'equipe':
        if (data.membres) {
          ExcelExportService.exportEquipe(data.membres);
          alert('Export de l\'équipe terminé !');
        }
        break;
      case 'emails':
        if (data.emails) {
          ExcelExportService.exportEmails(data.emails);
          alert('Export des emails terminé !');
        }
        break;
      case 'all':
        if (data.actions && data.membres && data.emails && data.reunionsManager && data.reunionsEquipe) {
          ExcelExportService.exportAllData(
            data.actions,
            data.membres,
            data.emails,
            data.reunionsManager,
            data.reunionsEquipe
          );
          alert('Export complet terminé !');
        }
        break;
    }
  };

  const handleSaveToModel = async () => {
    if (data.actions && data.membres && data.emails) {
      const result = await ExcelExportService.updateExcelModel(
        data.actions,
        data.membres,
        data.emails
      );
      
      if (result.success) {
        alert(`Sauvegarde locale réussie ! Fichier: ${result.fileName}`);
      } else {
        alert('Erreur lors de la sauvegarde');
        console.error(result.error);
      }
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'actions': return 'Actions';
      case 'equipe': return 'Équipe';
      case 'emails': return 'Emails';
      case 'reunions': return 'Réunions';
      case 'all': return 'Toutes Données';
      default: return 'Export';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleExportSpecific}
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        title={`Exporter ${getButtonText()}`}
      >
        <FileSpreadsheet size={16} />
        <span>Export {getButtonText()}</span>
      </button>

      {type === 'all' && (
        <button
          onClick={handleSaveToModel}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          title="Sauvegarder vers modèle local"
        >
          <Database size={16} />
          <span>Sauvegarder</span>
        </button>
      )}
    </div>
  );
};

export default ExportButtons;