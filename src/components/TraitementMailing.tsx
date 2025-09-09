import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  Clock,
  Send,
  Reply
} from 'lucide-react';
import { Email } from '../types';
import ConfigurationSection from './ConfigurationSection';
import ExportButtons from './ExportButtons';
import EmailModal from './EmailModal';

const TraitementMailing: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      expediteur: 'client@entreprise.com',
      destinataire: 'manager@monequipe.com',
      sujet: 'Problème de livraison urgent',
      contenu: 'Bonjour, nous avons un problème urgent avec la livraison du projet X. Pouvez-vous nous aider ?',
      dateReception: '2024-01-12T10:30:00',
      actionAssociee: '1',
      traite: false
    },
    {
      id: '2',
      expediteur: 'fournisseur@partenaire.com',
      destinataire: 'manager@monequipe.com',
      sujet: 'Mise à jour des spécifications',
      contenu: 'Les nouvelles spécifications sont disponibles. Merci de les valider avant vendredi.',
      dateReception: '2024-01-12T14:15:00',
      actionAssociee: '2',
      traite: true
    },
    {
      id: '3',
      expediteur: 'direction@entreprise.com',
      destinataire: 'manager@monequipe.com',
      sujet: 'Réunion stratégique mensuelle',
      contenu: 'Rappel pour la réunion stratégique de demain à 14h. Merci de préparer le rapport d\'avancement.',
      dateReception: '2024-01-11T16:45:00',
      traite: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTraite, setFilterTraite] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.expediteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTraite === '' || 
                         (filterTraite === 'traite' && email.traite) ||
                         (filterTraite === 'non-traite' && !email.traite);
    return matchesSearch && matchesFilter;
  });

  const handleMarkAsProcessed = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, traite: true } : email
    ));
  };

  const handleCreateAction = (email: Email) => {
    const actionTitle = `Action: ${email.sujet}`;
    const actionDescription = `Action créée depuis l'email de ${email.expediteur}:\n\n${email.contenu}`;
    
    // Simuler la création d'une action
    alert(`Action créée: "${actionTitle}"\n\nDescription: ${actionDescription.substring(0, 100)}...`);
    
    // Marquer l'email comme traité
    handleMarkAsProcessed(email.id);
  };

  const handleSendEmail = (emailData: any) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      expediteur: 'manager@monequipe.com',
      destinataire: emailData.destinataire,
      sujet: emailData.sujet,
      contenu: emailData.contenu,
      dateReception: new Date().toISOString(),
      traite: true
    };
    
    setEmails([newEmail, ...emails]);
    alert('Email envoyé avec succès !');
  };

  const handleReplyEmail = (originalEmail: Email, replyData: any) => {
    const replyEmail: Email = {
      id: Date.now().toString(),
      expediteur: 'manager@monequipe.com',
      destinataire: originalEmail.expediteur,
      sujet: `Re: ${originalEmail.sujet}`,
      contenu: replyData.contenu,
      dateReception: new Date().toISOString(),
      traite: true
    };
    
    setEmails([replyEmail, ...emails]);
    alert('Réponse envoyée avec succès !');
  };

  const getEmailIcon = (traite: boolean) => {
    return traite ? 
      <CheckCircle className="w-5 h-5 text-green-600" /> : 
      <Clock className="w-5 h-5 text-orange-600" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Traitement Mailing" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Traitement Mailing</h2>
        <div className="flex items-center space-x-3">
          <ExportButtons type="emails" data={{ emails }} />
          <button
            onClick={() => setShowComposeModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Send size={20} />
            <span>Nouveau Mail</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emails</p>
              <p className="text-2xl font-bold text-gray-900">{emails.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Non Traités</p>
              <p className="text-2xl font-bold text-gray-900">
                {emails.filter(e => !e.traite).length}
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
              <p className="text-sm font-medium text-gray-600">Traités</p>
              <p className="text-2xl font-bold text-gray-900">
                {emails.filter(e => e.traite).length}
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
                placeholder="Rechercher un email..."
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
                value={filterTraite}
                onChange={(e) => setFilterTraite(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les emails</option>
                <option value="non-traite">Non traités</option>
                <option value="traite">Traités</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Emails List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredEmails.length} email(s) trouvé(s)
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEmails.map((email) => (
            <div key={email.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getEmailIcon(email.traite)}
                    <h4 className="text-lg font-semibold text-gray-900">{email.sujet}</h4>
                    {!email.traite && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Non traité
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="text-sm text-gray-600">
                      <strong>De:</strong> {email.expediteur}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Reçu le:</strong> {formatDate(email.dateReception)}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{email.contenu}</p>

                  {email.actionAssociee && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-blue-800">
                        <strong>Action associée:</strong> Action #{email.actionAssociee}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {!email.traite && (
                    <button
                      onClick={() => handleMarkAsProcessed(email.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Marquer traité
                    </button>
                  )}
                  <button
                    onClick={() => handleCreateAction(email)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus size={14} />
                    <span>Action</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEmail(email);
                      setShowReplyModal(true);
                    }}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1"
                  >
                    <Reply size={14} />
                    <span>Répondre</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredEmails.length === 0 && (
        <div className="text-center py-12">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun email trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucun email ne correspond à vos critères de recherche.
          </p>
        </div>
      )}

      {/* Modals */}
      <EmailModal
        isOpen={showComposeModal}
        onClose={() => setShowComposeModal(false)}
        onSend={handleSendEmail}
        type="compose"
      />
      
      <EmailModal
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedEmail(null);
        }}
        onSend={(data) => selectedEmail && handleReplyEmail(selectedEmail, data)}
        type="reply"
        originalEmail={selectedEmail}
      />
    </div>
  );
};

export default TraitementMailing;