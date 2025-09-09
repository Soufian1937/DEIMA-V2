import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, FileText } from 'lucide-react';
import { SujetReunion } from '../types';

interface SujetReunionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sujet: Omit<SujetReunion, 'id'>) => void;
  sujet?: SujetReunion | null;
  type: 'Manager' | 'Équipe';
}

const SujetReunionModal: React.FC<SujetReunionModalProps> = ({ isOpen, onClose, onSave, sujet, type }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    statut: 'Ouvert' as SujetReunion['statut'],
    responsable: '',
    dateReunion: '',
    typeReunion: type as SujetReunion['typeReunion'],
    actions: [] as string[],
    notes: ''
  });

  useEffect(() => {
    if (sujet) {
      setFormData({
        titre: sujet.titre,
        description: sujet.description,
        statut: sujet.statut,
        responsable: sujet.responsable,
        dateReunion: sujet.dateReunion.split('T')[0] + 'T' + sujet.dateReunion.split('T')[1].substring(0, 5),
        typeReunion: sujet.typeReunion,
        actions: sujet.actions,
        notes: sujet.notes
      });
    } else {
      setFormData({
        titre: '',
        description: '',
        statut: 'Ouvert',
        responsable: type === 'Manager' ? 'Manager' : '',
        dateReunion: '',
        typeReunion: type,
        actions: [],
        notes: ''
      });
    }
  }, [sujet, type, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      dateReunion: new Date(formData.dateReunion).toISOString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Calendar size={24} />
            <span>{sujet ? 'Modifier le sujet' : `Nouveau sujet ${type}`}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input
              type="text"
              required
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Titre du sujet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description détaillée du sujet"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsable *</label>
              <input
                type="text"
                required
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom du responsable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as SujetReunion['statut'] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Ouvert">Ouvert</option>
                <option value="En cours">En cours</option>
                <option value="Fermé">Fermé</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} />
              <span>Date et heure de réunion *</span>
            </label>
            <input
              type="datetime-local"
              required
              value={formData.dateReunion}
              onChange={(e) => setFormData({ ...formData, dateReunion: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} />
              <span>Notes</span>
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Notes additionnelles, points à retenir..."
            />
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
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                type === 'Manager' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {sujet ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SujetReunionModal;