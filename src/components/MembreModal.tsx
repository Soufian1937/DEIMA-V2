import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MembreEquipe } from '../types';

interface MembreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (membre: Omit<MembreEquipe, 'id'>) => void;
  membre?: MembreEquipe | null;
  mode?: 'add' | 'edit';
}

const MembreModal: React.FC<MembreModalProps> = ({ isOpen, onClose, onSave, membre, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    poste: '',
    actionsAssignees: 0,
    actionsTerminees: 0
  });

  // Met à jour le formulaire quand un membre est passé pour l'édition
  React.useEffect(() => {
    if (mode === 'edit' && membre) {
      setFormData({
        nom: membre.nom,
        prenom: membre.prenom,
        email: membre.email,
        poste: membre.poste,
        actionsAssignees: membre.actionsAssignees,
        actionsTerminees: membre.actionsTerminees
      });
    } else {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        poste: '',
        actionsAssignees: 0,
        actionsTerminees: 0
      });
    }
  }, [mode, membre, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    // Le reset du formulaire est géré par useEffect
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'edit' ? 'Modifier membre' : 'Nouveau membre'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prénom *</label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom *</label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poste *</label>
            <input
              type="text"
              required
              value={formData.poste}
              onChange={(e) => setFormData({ ...formData, poste: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Développeur, Chef de projet..."
            />
          </div>

          {mode === 'edit' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Actions Assignées</label>
                <input
                  type="number"
                  min="0"
                  value={formData.actionsAssignees}
                  onChange={(e) => setFormData({ ...formData, actionsAssignees: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Actions Terminées</label>
                <input
                  type="number"
                  min="0"
                  value={formData.actionsTerminees}
                  onChange={(e) => setFormData({ ...formData, actionsTerminees: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === 'edit' ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembreModal;