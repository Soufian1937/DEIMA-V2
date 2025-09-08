import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Users
} from 'lucide-react';
import { SujetReunion } from '../types';
import ConfigurationSection from './ConfigurationSection';

const ReunionsManager: React.FC = () => {
  const [sujets, setSujets] = useState<SujetReunion[]>([
    {
      id: '1',
      titre: 'Budget Q1 2024',
      description: 'Révision et validation du budget pour le premier trimestre',
      statut: 'En cours',
      responsable: 'Manager',
      dateReunion: '2024-01-15T14:00:00',
      typeReunion: 'Manager',
      actions: ['1', '3'],
      notes: 'Attente validation direction financière'
    },
    {
      id: '2',
      titre: 'Stratégie produit 2024',
      description: 'Définition de la roadmap produit pour l\'année',
      statut: 'Ouvert',
      responsable: 'Manager',
      dateReunion: '2024-01-20T10:00:00',
      typeReunion: 'Manager',
      actions: ['2'],
      notes: 'Préparation présentation pour le comité de direction'
    },
    {
      id: '3',
      titre: 'Performance équipe',
      description: 'Évaluation des performances et objectifs individuels',
      statut: 'Fermé',
      responsable: 'Manager',
      dateReunion: '2024-01-10T16:00:00',
      typeReunion: 'Manager',
      actions: [],
      notes: 'Entretiens individuels planifiés pour février'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Fermé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En cours': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Ouvert': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Fermé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Ouvert': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSujets = sujets.filter(sujet => {
    const matchesSearch = sujet.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sujet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatut === '' || sujet.statut === filterStatut;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const handleDeleteSujet = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sujet ?')) {
      setSujets(sujets.filter(sujet => sujet.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Réunions Manager" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Sujets Manager</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouveau Sujet</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sujets Ouverts</p>
              <p className="text-2xl font-bold text-gray-900">
                {sujets.filter(s => s.statut === 'Ouvert').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">En Cours</p>
              <p className="text-2xl font-bold text-gray-900">
                {sujets.filter(s => s.statut === 'En cours').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Fermés</p>
              <p className="text-2xl font-bold text-gray-900">
                {sujets.filter(s => s.statut === 'Fermé').length}
              </p>
            </div>
          </div>
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
                placeholder="Rechercher un sujet..."
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
                <option value="Ouvert">Ouvert</option>
                <option value="En cours">En cours</option>
                <option value="Fermé">Fermé</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sujets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredSujets.length} sujet(s) trouvé(s)
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSujets.map((sujet) => (
            <div key={sujet.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatutIcon(sujet.statut)}
                    <h4 className="text-lg font-semibold text-gray-900">{sujet.titre}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(sujet.statut)}`}>
                      {sujet.statut}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{sujet.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        <strong>Réunion:</strong> {formatDate(sujet.dateReunion)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        <strong>Actions liées:</strong> {sujet.actions.length}
                      </span>
                    </div>
                  </div>

                  {sujet.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Notes:</strong> {sujet.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSujet(sujet.id)}
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

      {filteredSujets.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun sujet trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer un nouveau sujet de réunion.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReunionsManager;