import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Mail,
  Award,
  TrendingUp
} from 'lucide-react';
import { MembreEquipe } from '../types';
import ConfigurationSection from './ConfigurationSection';
import MembreModal from './MembreModal';
import ExportButtons from './ExportButtons';

const GestionEquipe: React.FC = () => {
  const [membres, setMembres] = useState<MembreEquipe[]>([
    {
      id: '1',
      nom: 'Dubois',
      prenom: 'Marie',
      email: 'marie.dubois@entreprise.com',
      poste: 'Développeuse Senior',
      actionsAssignees: 5,
      actionsTerminees: 4
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Jean',
      email: 'jean.martin@entreprise.com',
      poste: 'Chef de Projet',
      actionsAssignees: 3,
      actionsTerminees: 2
    },
    {
      id: '3',
      nom: 'Laurent',
      prenom: 'Sophie',
      email: 'sophie.laurent@entreprise.com',
      poste: 'Analyste Qualité',
      actionsAssignees: 4,
      actionsTerminees: 4
    },
    {
      id: '4',
      nom: 'Durand',
      prenom: 'Pierre',
      email: 'pierre.durand@entreprise.com',
      poste: 'Développeur',
      actionsAssignees: 2,
      actionsTerminees: 1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMembre, setEditingMembre] = useState<MembreEquipe | null>(null);

  const filteredMembres = membres.filter(membre => {
    const fullName = `${membre.prenom} ${membre.nom}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
           membre.poste.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const calculatePerformance = (membre: MembreEquipe) => {
    if (membre.actionsAssignees === 0) return 0;
    return Math.round((membre.actionsTerminees / membre.actionsAssignees) * 100);
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-green-600 bg-green-100';
    if (performance >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleDeleteMembre = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setMembres(membres.filter(membre => membre.id !== id));
    }
  };

  const handleSendEmail = (email: string, nom: string, prenom: string) => {
    try {
      const subject = encodeURIComponent(`Contact - ${prenom} ${nom}`);
      const body = encodeURIComponent(`Bonjour ${prenom},\n\nJ'espère que vous allez bien.\n\nCordialement`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du client mail:', error);
      // Fallback: copier l'email dans le presse-papiers
      navigator.clipboard.writeText(email).then(() => {
        alert(`Email copié dans le presse-papiers: ${email}`);
      }).catch(() => {
        alert(`Email: ${email}`);
      });
    }
  };

  const handleEditMembre = (membre: MembreEquipe) => {
    setEditingMembre(membre);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMembre(null);
  };

  const handleSaveMembre = (membreData: Omit<MembreEquipe, 'id'>) => {
    if (editingMembre) {
      // Mode édition
      const updatedMembres = membres.map(membre => 
        membre.id === editingMembre.id 
          ? { ...membreData, id: editingMembre.id }
          : membre
      );
      setMembres(updatedMembres);
      alert('Membre modifié avec succès !');
    } else {
      // Mode ajout
      const newMembre: MembreEquipe = {
        ...membreData,
        id: Date.now().toString()
      };
      setMembres([...membres, newMembre]);
      alert('Membre ajouté avec succès !');
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Gestion d'Équipe" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Gestion d'Équipe</h2>
        <div className="flex items-center space-x-3">
          <ExportButtons type="equipe" data={{ membres }} />
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nouveau Membre</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Membres</p>
              <p className="text-2xl font-bold text-gray-900">{membres.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Performance Moy.</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(membres.reduce((acc, m) => acc + calculatePerformance(m), 0) / membres.length)}%
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
              <p className="text-sm font-medium text-gray-600">Actions Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {membres.reduce((acc, m) => acc + m.actionsAssignees, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Actions Terminées</p>
              <p className="text-2xl font-bold text-gray-900">
                {membres.reduce((acc, m) => acc + m.actionsTerminees, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembres.map((membre) => {
          const performance = calculatePerformance(membre);
          return (
            <div key={membre.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {membre.photo ? (
                    <img
                      src={membre.photo}
                      alt={`${membre.prenom} ${membre.nom}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {membre.prenom[0]}{membre.nom[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {membre.prenom} {membre.nom}
                    </h3>
                    <p className="text-sm text-gray-600">{membre.poste}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleSendEmail(membre.email, membre.nom, membre.prenom)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title={`Envoyer un email à ${membre.prenom} ${membre.nom}`}
                  >
                    <Mail size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditMembre(membre)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title={`Modifier ${membre.prenom} ${membre.nom}`}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteMembre(membre.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{membre.email}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{membre.actionsAssignees}</p>
                    <p className="text-xs text-gray-600">Assignées</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{membre.actionsTerminees}</p>
                    <p className="text-xs text-gray-600">Terminées</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Performance</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(performance)}`}>
                      {performance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        performance >= 80 ? 'bg-green-500' :
                        performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembres.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun membre trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucun membre ne correspond à vos critères de recherche.
          </p>
        </div>
      )}

      {/* Modal */}
      <MembreModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveMembre}
        membre={editingMembre}
        mode={editingMembre ? 'edit' : 'add'}
      />
    </div>
  );
};

export default GestionEquipe;