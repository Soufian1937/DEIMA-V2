import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Mail,
  Calendar
} from 'lucide-react';
import ConfigurationSection from './ConfigurationSection';
import ActionModal from './ActionModal';
import ReunionModal from './ReunionModal';
import RapportModal from './RapportModal';
import ExportButtons from './ExportButtons';
import { Action } from '../types';

const Dashboard: React.FC = () => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showReunionModal, setShowReunionModal] = useState(false);
  const [showRapportModal, setShowRapportModal] = useState(false);

  const handleSaveAction = (action: Omit<Action, 'id'>) => {
    console.log('Nouvelle action créée:', action);
    alert('Action créée avec succès !');
  };

  const handleSaveReunion = (reunion: any) => {
    console.log('Réunion planifiée:', reunion);
    alert('Réunion planifiée avec succès !');
  };

  const handleGenerateRapport = (rapport: any) => {
    console.log('Rapport généré:', rapport);
  };
  const stats = [
    {
      title: 'Actions Totales',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      title: 'Actions En Retard',
      value: '3',
      change: '-25%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Actions Terminées',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Emails Non Traités',
      value: '7',
      change: '+2',
      changeType: 'neutral',
      icon: Mail,
      color: 'bg-orange-500'
    }
  ];

  const recentActions = [
    {
      id: '1',
      titre: 'Mise à jour documentation',
      responsable: 'Marie Dubois',
      statut: 'En cours',
      echeance: '2024-01-15',
      priorite: 'Haute'
    },
    {
      id: '2',
      titre: 'Formation équipe sécurité',
      responsable: 'Jean Martin',
      statut: 'À faire',
      echeance: '2024-01-20',
      priorite: 'Moyenne'
    },
    {
      id: '3',
      titre: 'Audit qualité processus',
      responsable: 'Sophie Laurent',
      statut: 'Terminé',
      echeance: '2024-01-10',
      priorite: 'Haute'
    }
  ];

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

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Tableau de Bord" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h2>
        <div className="flex items-center space-x-4">
          <ExportButtons type="all" data={{}} />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Actions Récentes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{action.titre}</h4>
                  <p className="text-sm text-gray-600 mt-1">Responsable: {action.responsable}</p>
                  <p className="text-sm text-gray-500 mt-1">Échéance: {action.echeance}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioriteColor(action.priorite)}`}>
                    {action.priorite}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(action.statut)}`}>
                    {action.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Nouvelle Action</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Créer une nouvelle action pour votre équipe</p>
          <button 
            onClick={() => setShowActionModal(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer Action
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Planifier Réunion</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Organiser une réunion avec votre équipe</p>
          <button 
            onClick={() => setShowReunionModal(true)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Planifier
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Générer Rapport</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Créer un rapport d'avancement</p>
          <button 
            onClick={() => setShowRapportModal(true)}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Générer
          </button>
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        onSave={handleSaveAction}
      />
      
      <ReunionModal
        isOpen={showReunionModal}
        onClose={() => setShowReunionModal(false)}
        onSave={handleSaveReunion}
      />
      
      <RapportModal
        isOpen={showRapportModal}
        onClose={() => setShowRapportModal(false)}
        onGenerate={handleGenerateRapport}
      />
    </div>
  );
};

export default Dashboard;