import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import { Action } from '../types';
import ConfigurationSection from './ConfigurationSection';
import ActionModal from './ActionModal';
import ExportButtons from './ExportButtons';

const ActionsGlobales: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([
    {
      id: '1',
      titre: 'Mise à jour documentation technique',
      description: 'Révision complète de la documentation des processus',
      responsable: 'Marie Dubois',
      statut: 'En cours',
      priorite: 'Haute',
      dateCreation: '2024-01-01',
      dateEcheance: '2024-01-15',
      origine: 'Audit qualité',
      observations: 'Nécessite validation du responsable technique',
      progression: 65
    },
    {
      id: '2',
      titre: 'Formation équipe sécurité',
      description: 'Session de formation sur les nouvelles procédures de sécurité',
      responsable: 'Jean Martin',
      statut: 'À faire',
      priorite: 'Moyenne',
      dateCreation: '2024-01-02',
      dateEcheance: '2024-01-20',
      origine: 'Réunion manager',
      observations: 'Attente confirmation des dates',
      progression: 0
    },
    {
      id: '3',
      titre: 'Optimisation processus client',
      description: 'Amélioration du parcours client et réduction des délais',
      responsable: 'Sophie Laurent',
      statut: 'Terminé',
      priorite: 'Haute',
      dateCreation: '2023-12-15',
      dateEcheance: '2024-01-10',
      origine: 'Feedback client',
      observations: 'Implémentation réussie, gains mesurés',
      progression: 100
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Terminé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En cours': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'En retard': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'Haute': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatut === '' || action.statut === filterStatut;
    return matchesSearch && matchesFilter;
  });

  const handleNewAction = () => {
    setEditingAction(null);
    setShowModal(true);
  };

  const handleEditAction = (action: Action) => {
    setEditingAction(action);
    setShowModal(true);
  };

  const handleSaveAction = (actionData: Omit<Action, 'id'>) => {
    if (editingAction) {
      // Modifier action existante
      setActions(actions.map(action => 
        action.id === editingAction.id 
          ? { ...actionData, id: editingAction.id }
          : action
      ));
      alert('Action modifiée avec succès !');
    } else {
      // Créer nouvelle action
      const newAction: Action = {
        ...actionData,
        id: Date.now().toString()
      };
      setActions([...actions, newAction]);
      alert('Action créée avec succès !');
    }
    setEditingAction(null);
  };

  const handleDeleteAction = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette action ?')) {
      setActions(actions.filter(action => action.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Actions Globales" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Actions Globales</h2>
        <div className="flex items-center space-x-3">
          <ExportButtons type="actions" data={{ actions }} />
          <button
            onClick={handleNewAction}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nouvelle Action</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Actions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredActions.length} action(s) trouvée(s)
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredActions.map((action) => (
            <div key={action.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatutIcon(action.statut)}
                    <h4 className="text-lg font-semibold text-gray-900">{action.titre}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioriteColor(action.priorite)}`}>
                      {action.priorite}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{action.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        <strong>Responsable:</strong> {action.responsable}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Origine:</strong> {action.origine}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Échéance:</strong> {new Date(action.dateEcheance).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-medium text-gray-900">{action.progression}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${action.progression}%` }}
                      ></div>
                    </div>
                  </div>

                  {action.observations && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Observations:</strong> {action.observations}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(action.statut)}`}>
                    {action.statut}
                  </span>
                  <button
                    onClick={() => handleEditAction(action)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteAction(action.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune action trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer une nouvelle action pour votre équipe.
          </p>
        </div>
      )}

      {/* Modal */}
      <ActionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAction(null);
        }}
        onSave={handleSaveAction}
        editingAction={editingAction}
      />
    </div>
  );
};

export default ActionsGlobales;