import React, { useState, useEffect } from 'react';
import { X, Target, User, Calendar } from 'lucide-react';
import { ObjectifIndividuel } from '../types';

interface ObjectifModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (objectif: Omit<ObjectifIndividuel, 'id'>) => void;
  editingObjectif?: ObjectifIndividuel | null;
}

const ObjectifModal: React.FC<ObjectifModalProps> = ({ isOpen, onClose, onSave, editingObjectif }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    membreId: '',
    membreNom: '',
    dateEcheance: '',
    statut: 'Non commencé' as ObjectifIndividuel['statut'],
    priorite: 'Moyenne' as ObjectifIndividuel['priorite'],
    progression: 0,
    type: 'Opérationnel' as ObjectifIndividuel['type'],
    trimestre: 'Q1' as ObjectifIndividuel['trimestre'],
    notes: '',
    jalons: [] as string[]
  });

  const [newJalon, setNewJalon] = useState('');

  const membres = [
    { id: '1', nom: 'Marie Dubois' },
    { id: '2', nom: 'Jean Martin' },
    { id: '3', nom: 'Sophie Laurent' },
    { id: '4', nom: 'Pierre Durand' }
  ];

  useEffect(() => {
    if (editingObjectif) {
      setFormData({
        titre: editingObjectif.titre,
        description: editingObjectif.description,
        membreId: editingObjectif.membreId,
        membreNom: editingObjectif.membreNom,
        dateEcheance: editingObjectif.dateEcheance,
        statut: editingObjectif.statut,
        priorite: editingObjectif.priorite,
        progression: editingObjectif.progression,
        type: editingObjectif.type,
        trimestre: editingObjectif.trimestre,
        notes: editingObjectif.notes,
        jalons: editingObjectif.jalons
      });
    } else {
      setFormData({
        titre: '',
        description: '',
        membreId: '',
        membreNom: '',
        dateEcheance: '',
        statut: 'Non commencé',
        priorite: 'Moyenne',
        progression: 0,
        type: 'Opérationnel',
        trimestre: 'Q1',
        notes: '',
        jalons: []
      });
    }
  }, [editingObjectif, isOpen]);

  const handleMembreChange = (membreId: string) => {
    const membre = membres.find(m => m.id === membreId);
    setFormData({
      ...formData,
      membreId,
      membreNom: membre?.nom || ''
    });
  };

  const handleAddJalon = () => {
    if (newJalon.trim()) {
      setFormData({
        ...formData,
        jalons: [...formData.jalons, newJalon.trim()]
      });
      setNewJalon('');
    }
  };

  const handleRemoveJalon = (index: number) => {
    setFormData({
      ...formData,
      jalons: formData.jalons.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      dateCreation: editingObjectif?.dateCreation || new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Target size={24} />
            <span>{editingObjectif ? 'Modifier l\'objectif' : 'Nouvel objectif individuel'}</span>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Titre de l'objectif"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Description détaillée de l'objectif"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} />
                <span>Membre assigné *</span>
              </label>
              <select
                required
                value={formData.membreId}
                onChange={(e) => handleMembreChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sélectionner un membre</option>
                {membres.map(membre => (
                  <option key={membre.id} value={membre.id}>{membre.nom}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} />
                <span>Date d'échéance *</span>
              </label>
              <input
                type="date"
                required
                value={formData.dateEcheance}
                onChange={(e) => setFormData({ ...formData, dateEcheance: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as ObjectifIndividuel['statut'] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Non commencé">Non commencé</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
              <select
                value={formData.priorite}
                onChange={(e) => setFormData({ ...formData, priorite: e.target.value as ObjectifIndividuel['priorite'] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Basse">Basse</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ObjectifIndividuel['type'] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Stratégique">Stratégique</option>
                <option value="Opérationnel">Opérationnel</option>
                <option value="Développement">Développement</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trimestre</label>
              <select
                value={formData.trimestre}
                onChange={(e) => setFormData({ ...formData, trimestre: e.target.value as ObjectifIndividuel['trimestre'] })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Q1">Q1 (Jan-Mar)</option>
                <option value="Q2">Q2 (Avr-Juin)</option>
                <option value="Q3">Q3 (Juil-Sep)</option>
                <option value="Q4">Q4 (Oct-Déc)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progression ({formData.progression}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.progression}
                onChange={(e) => setFormData({ ...formData, progression: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Jalons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jalons</label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newJalon}
                  onChange={(e) => setNewJalon(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ajouter un jalon..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddJalon())}
                />
                <button
                  type="button"
                  onClick={handleAddJalon}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.jalons.map((jalon, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {jalon}
                    <button
                      type="button"
                      onClick={() => handleRemoveJalon(index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Notes additionnelles, commentaires..."
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {editingObjectif ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ObjectifModal;