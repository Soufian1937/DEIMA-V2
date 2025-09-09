import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { ObjectifIndividuel } from '../types';
import ConfigurationSection from './ConfigurationSection';
import ObjectifModal from './ObjectifModal';
import ExportButtons from './ExportButtons';

const ObjectifsIndividuels: React.FC = () => {
  const [objectifs, setObjectifs] = useState<ObjectifIndividuel[]>([
    {
      id: '1',
      titre: 'Certification AWS Solutions Architect',
      description: 'Obtenir la certification AWS Solutions Architect Associate pour renforcer les compétences cloud',
      membreId: '1',
      membreNom: 'Marie Dubois',
      dateCreation: '2024-01-01',
      dateEcheance: '2024-06-30',
      statut: 'En cours',
      priorite: 'Haute',
      progression: 45,
      type: 'Développement',
      trimestre: 'Q2',
      notes: 'Formation en ligne commencée, examen prévu en juin',
      jalons: ['Formation théorique', 'Labs pratiques', 'Examen blanc', 'Certification finale']
    },
    {
      id: '2',
      titre: 'Leadership d\'équipe projet X',
      description: 'Prendre la responsabilité du leadership sur le projet X et développer les compétences managériales',
      membreId: '2',
      membreNom: 'Jean Martin',
      dateCreation: '2024-01-01',
      dateEcheance: '2024-12-31',
      statut: 'En cours',
      priorite: 'Haute',
      progression: 30,
      type: 'Stratégique',
      trimestre: 'Q4',
      notes: 'Projet assigné, formation management prévue Q2',
      jalons: ['Formation management', 'Prise de responsabilité', 'Évaluation mi-parcours', 'Bilan final']
    },
    {
      id: '3',
      titre: 'Optimisation processus qualité',
      description: 'Améliorer les processus qualité de 20% et réduire les défauts',
      membreId: '3',
      membreNom: 'Sophie Laurent',
      dateCreation: '2024-01-01',
      dateEcheance: '2024-09-30',
      statut: 'Non commencé',
      priorite: 'Moyenne',
      progression: 0,
      type: 'Opérationnel',
      trimestre: 'Q3',
      notes: 'Analyse préliminaire à effectuer',
      jalons: ['Analyse actuelle', 'Plan d\'amélioration', 'Mise en œuvre', 'Mesure résultats']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterTrimestre, setFilterTrimestre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingObjectif, setEditingObjectif] = useState<ObjectifIndividuel | null>(null);

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Stratégique': return 'bg-purple-100 text-purple-800';
      case 'Opérationnel': return 'bg-blue-100 text-blue-800';
      case 'Développement': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredObjectifs = objectifs.filter(objectif => {
    const matchesSearch = objectif.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         objectif.membreNom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filterStatut === '' || objectif.statut === filterStatut;
    const matchesTrimestre = filterTrimestre === '' || objectif.trimestre === filterTrimestre;
    return matchesSearch && matchesStatut && matchesTrimestre;
  });

  const handleNewObjectif = () => {
    setEditingObjectif(null);
    setShowModal(true);
  };

  const handleEditObjectif = (objectif: ObjectifIndividuel) => {
    setEditingObjectif(objectif);
    setShowModal(true);
  };

  const handleSaveObjectif = (objectifData: Omit<ObjectifIndividuel, 'id'>) => {
    if (editingObjectif) {
      setObjectifs(objectifs.map(objectif => 
        objectif.id === editingObjectif.id 
          ? { ...objectifData, id: editingObjectif.id }
          : objectif
      ));
      alert('Objectif modifié avec succès !');
    } else {
      const newObjectif: ObjectifIndividuel = {
        ...objectifData,
        id: Date.now().toString()
      };
      setObjectifs([...objectifs, newObjectif]);
      alert('Objectif créé avec succès !');
    }
    setEditingObjectif(null);
  };

  const handleDeleteObjectif = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      setObjectifs(objectifs.filter(objectif => objectif.id !== id));
      alert('Objectif supprimé avec succès !');
    }
  };

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Objectifs Individuels" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Objectifs Individuels</h2>
        <div className="flex items-center space-x-3">
          <ExportButtons type="all" data={{}} />
          <button
            onClick={handleNewObjectif}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nouvel Objectif</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Objectifs</p>
              <p className="text-2xl font-bold text-gray-900">{objectifs.length}</p>
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
                {objectifs.filter(o => o.statut === 'En cours').length}
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
              <p className="text-sm font-medium text-gray-600">Terminés</p>
              <p className="text-2xl font-bold text-gray-900">
                {objectifs.filter(o => o.statut === 'Terminé').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Progression Moy.</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(objectifs.reduce((acc, o) => acc + o.progression, 0) / objectifs.length)}%
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
                placeholder="Rechercher un objectif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="Non commencé">Non commencé</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-400" />
              <select
                value={filterTrimestre}
                onChange={(e) => setFilterTrimestre(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Tous les trimestres</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Objectifs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredObjectifs.length} objectif(s) trouvé(s)
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredObjectifs.map((objectif) => (
            <div key={objectif.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatutIcon(objectif.statut)}
                    <h4 className="text-lg font-semibold text-gray-900">{objectif.titre}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioriteColor(objectif.priorite)}`}>
                      {objectif.priorite}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(objectif.type)}`}>
                      {objectif.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{objectif.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        <strong>Assigné à:</strong> {objectif.membreNom}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Trimestre:</strong> {objectif.trimestre}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Échéance:</strong> {new Date(objectif.dateEcheance).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-medium text-gray-900">{objectif.progression}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${objectif.progression}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Jalons */}
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Jalons:</h5>
                    <div className="flex flex-wrap gap-2">
                      {objectif.jalons.map((jalon, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {jalon}
                        </span>
                      ))}
                    </div>
                  </div>

                  {objectif.notes && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-800">
                        <strong>Notes:</strong> {objectif.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(objectif.statut)}`}>
                    {objectif.statut}
                  </span>
                  <button
                    onClick={() => handleEditObjectif(objectif)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteObjectif(objectif.id)}
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

      {filteredObjectifs.length === 0 && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun objectif trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer un nouvel objectif individuel pour votre équipe.
          </p>
        </div>
      )}

      {/* Modal */}
      <ObjectifModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingObjectif(null);
        }}
        onSave={handleSaveObjectif}
        editingObjectif={editingObjectif}
      />
    </div>
  );
};

export default ObjectifsIndividuels;