import React, { useState } from 'react';
import { X, FileText, Download, Calendar, BarChart3 } from 'lucide-react';

interface RapportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (rapport: any) => void;
}

const RapportModal: React.FC<RapportModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [formData, setFormData] = useState({
    type: 'Actions',
    periode: 'mois-courant',
    dateDebut: '',
    dateFin: '',
    format: 'PDF',
    includeGraphiques: true,
    includeDetails: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rapport = {
      id: Date.now().toString(),
      titre: `Rapport ${formData.type} - ${new Date().toLocaleDateString('fr-FR')}`,
      dateGeneration: new Date().toISOString().split('T')[0],
      type: formData.type,
      donnees: formData,
      format: formData.format
    };
    
    onGenerate(rapport);
    
    // Simulation de génération de rapport
    setTimeout(() => {
      alert(`Rapport ${formData.type} généré avec succès ! (Format: ${formData.format})`);
    }, 1000);
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Générer un rapport</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} />
              <span>Type de rapport *</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Actions">Rapport d'actions</option>
              <option value="Équipe">Rapport d'équipe</option>
              <option value="Réunions">Rapport de réunions</option>
              <option value="Global">Rapport global</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} />
              <span>Période *</span>
            </label>
            <select
              value={formData.periode}
              onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="semaine-courante">Semaine courante</option>
              <option value="mois-courant">Mois courant</option>
              <option value="trimestre-courant">Trimestre courant</option>
              <option value="annee-courante">Année courante</option>
              <option value="personnalisee">Période personnalisée</option>
            </select>
          </div>

          {formData.periode === 'personnalisee' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                <input
                  type="date"
                  value={formData.dateDebut}
                  onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                <input
                  type="date"
                  value={formData.dateFin}
                  onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Download size={16} />
              <span>Format de sortie</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'Excel', 'CSV'].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setFormData({ ...formData, format })}
                  className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                    formData.format === format
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Options</h4>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <BarChart3 size={16} />
                <span>Inclure graphiques</span>
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, includeGraphiques: !formData.includeGraphiques })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.includeGraphiques ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.includeGraphiques ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <FileText size={16} />
                <span>Détails complets</span>
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, includeDetails: !formData.includeDetails })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.includeDetails ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.includeDetails ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Générer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RapportModal;