import React, { useState, useEffect } from 'react';
import { X, Send, Mail } from 'lucide-react';
import { Email } from '../types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: any) => void;
  type: 'compose' | 'reply';
  originalEmail?: Email | null;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSend, type, originalEmail }) => {
  const [formData, setFormData] = useState({
    destinataire: '',
    sujet: '',
    contenu: ''
  });

  useEffect(() => {
    if (type === 'reply' && originalEmail) {
      setFormData({
        destinataire: originalEmail.expediteur,
        sujet: `Re: ${originalEmail.sujet}`,
        contenu: `\n\n--- Message original ---\nDe: ${originalEmail.expediteur}\nSujet: ${originalEmail.sujet}\nDate: ${new Date(originalEmail.dateReception).toLocaleString('fr-FR')}\n\n${originalEmail.contenu}`
      });
    } else {
      setFormData({
        destinataire: '',
        sujet: '',
        contenu: ''
      });
    }
  }, [type, originalEmail, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(formData);
    setFormData({
      destinataire: '',
      sujet: '',
      contenu: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Mail size={24} />
            <span>{type === 'compose' ? 'Nouveau message' : 'Répondre'}</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Destinataire *</label>
            <input
              type="email"
              required
              value={formData.destinataire}
              onChange={(e) => setFormData({ ...formData, destinataire: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@exemple.com"
              disabled={type === 'reply'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sujet *</label>
            <input
              type="text"
              required
              value={formData.sujet}
              onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Objet du message"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea
              required
              rows={12}
              value={formData.contenu}
              onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre message..."
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send size={16} />
              <span>{type === 'compose' ? 'Envoyer' : 'Répondre'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;