import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import ConfigurationSection from './ConfigurationSection';
import ExportButtons from './ExportButtons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Rapports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedType, setSelectedType] = useState('actions');

  // Données d'exemple pour les rapports
  const rapportData = {
    actions: {
      total: 24,
      terminees: 18,
      enCours: 3,
      enRetard: 3,
      nouvelles: 5
    },
    equipe: {
      membres: 8,
      actionsParMembre: 3,
      tauxCompletion: 75,
      performance: 85
    },
    reunions: {
      totalSujets: 12,
      sujetsOuverts: 4,
      sujetsEnCours: 3,
      sujetsFermes: 5
    }
  };

// const statsData = {
  //   actions: {
  //     total: 24,
  //     terminees: 18,
  //     enCours: 3,
  //     enRetard: 3,
  //     nouvelles: 5
  //   },
  //   equipe: {
  //     membres: 8,
  //     actionsParMembre: 3,
  //     tauxCompletion: 75,
  //     performance: 85
  //   },
  //   reunions: {
  //     totalSujets: 12,
  //     sujetsOuverts: 4,
  //     sujetsEnCours: 3,
  //     sujetsFermes: 5
  //   }
  // };

  const chartData = [
    { name: 'Terminées', value: 18, color: '#10B981' },
    { name: 'En cours', value: 3, color: '#3B82F6' },
    { name: 'En retard', value: 3, color: '#EF4444' }
  ];

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Configuration du document
      doc.setFontSize(20);
      doc.text('Direction des études - Rapport Analytics', 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Période: ${getPeriodLabel()}`, 20, 35);
      doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 20, 45);
      
      let yPos = 60;
      
      // Section Actions
      doc.setFontSize(16);
      doc.text('Résumé des Actions', 20, yPos);
      yPos += 15;
      
      const actionsData = [
        ['Métrique', 'Valeur'],
        ['Total Actions', rapportData.actions.total.toString()],
        ['Actions Terminées', rapportData.actions.terminees.toString()],
        ['Actions En Cours', rapportData.actions.enCours.toString()],
        ['Actions En Retard', rapportData.actions.enRetard.toString()],
        ['Nouvelles Actions', rapportData.actions.nouvelles.toString()]
      ];
      
      (doc as any).autoTable({
        head: [actionsData[0]],
        body: actionsData.slice(1),
        startY: yPos,
        margin: { left: 20 },
        theme: 'striped'
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 20;
      
      // Section Équipe
      doc.setFontSize(16);
      doc.text('Performance Équipe', 20, yPos);
      yPos += 15;
      
      const equipeData = [
        ['Métrique', 'Valeur'],
        ['Nombre de Membres', rapportData.equipe.membres.toString()],
        ['Actions par Membre', rapportData.equipe.actionsParMembre.toString()],
        ['Taux de Complétion', rapportData.equipe.tauxCompletion.toString() + '%'],
        ['Performance Globale', rapportData.equipe.performance.toString() + '%']
      ];
      
      (doc as any).autoTable({
        head: [equipeData[0]],
        body: equipeData.slice(1),
        startY: yPos,
        margin: { left: 20 },
        theme: 'striped'
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 20;
      
      // Section Réunions
      doc.setFontSize(16);
      doc.text('Suivi des Réunions', 20, yPos);
      yPos += 15;
      
      const reunionsData = [
        ['Métrique', 'Valeur'],
        ['Total Sujets', rapportData.reunions.totalSujets.toString()],
        ['Sujets Ouverts', rapportData.reunions.sujetsOuverts.toString()],
        ['Sujets En Cours', rapportData.reunions.sujetsEnCours.toString()],
        ['Sujets Fermés', rapportData.reunions.sujetsFermes.toString()]
      ];
      
      (doc as any).autoTable({
        head: [reunionsData[0]],
        body: reunionsData.slice(1),
        startY: yPos,
        margin: { left: 20 },
        theme: 'striped'
      });
      
      // Sauvegarder le PDF
      const fileName = `Rapport_Analytics_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      alert('Rapport PDF téléchargé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du rapport PDF.');
    }
  };

  const handleExportExcel = () => {
    try {
      // Créer les données pour Excel
      const actionsRapport = [
        { Métrique: 'Total Actions', Valeur: rapportData.actions.total },
        { Métrique: 'Actions Terminées', Valeur: rapportData.actions.terminees },
        { Métrique: 'Actions En Cours', Valeur: rapportData.actions.enCours },
        { Métrique: 'Actions En Retard', Valeur: rapportData.actions.enRetard },
        { Métrique: 'Nouvelles Actions', Valeur: rapportData.actions.nouvelles }
      ];
      
      const equipeRapport = [
        { Métrique: 'Nombre de Membres', Valeur: rapportData.equipe.membres },
        { Métrique: 'Actions par Membre', Valeur: rapportData.equipe.actionsParMembre },
        { Métrique: 'Taux de Complétion (%)', Valeur: rapportData.equipe.tauxCompletion },
        { Métrique: 'Performance Globale (%)', Valeur: rapportData.equipe.performance }
      ];
      
      const reunionsRapport = [
        { Métrique: 'Total Sujets', Valeur: rapportData.reunions.totalSujets },
        { Métrique: 'Sujets Ouverts', Valeur: rapportData.reunions.sujetsOuverts },
        { Métrique: 'Sujets En Cours', Valeur: rapportData.reunions.sujetsEnCours },
        { Métrique: 'Sujets Fermés', Valeur: rapportData.reunions.sujetsFermes }
      ];
      
      // Créer le classeur Excel
      const workbook = XLSX.utils.book_new();
      
      // Feuille Actions
      const wsActions = XLSX.utils.json_to_sheet(actionsRapport);
      XLSX.utils.book_append_sheet(workbook, wsActions, 'Rapport Actions');
      
      // Feuille Équipe
      const wsEquipe = XLSX.utils.json_to_sheet(equipeRapport);
      XLSX.utils.book_append_sheet(workbook, wsEquipe, 'Rapport Équipe');
      
      // Feuille Réunions
      const wsReunions = XLSX.utils.json_to_sheet(reunionsRapport);
      XLSX.utils.book_append_sheet(workbook, wsReunions, 'Rapport Réunions');
      
      // Feuille Résumé
      const resume = [
        { Section: 'Actions', 'Taux Complétion (%)': Math.round((rapportData.actions.terminees / rapportData.actions.total) * 100) },
        { Section: 'Équipe', 'Performance (%)': rapportData.equipe.performance },
        { Section: 'Réunions', 'Taux Fermeture (%)': Math.round((rapportData.reunions.sujetsFermes / rapportData.reunions.totalSujets) * 100) }
      ];
      const wsResume = XLSX.utils.json_to_sheet(resume);
      XLSX.utils.book_append_sheet(workbook, wsResume, 'Résumé');
      
      // Sauvegarder le fichier
      const fileName = `Rapport_Analytics_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      alert('Rapport Excel téléchargé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération du rapport Excel:', error);
      alert('Erreur lors de la génération du rapport Excel.');
    }
  };
  
  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week': return 'Cette semaine';
      case 'month': return 'Ce mois';
      case 'quarter': return 'Ce trimestre';
      case 'year': return 'Cette année';
      default: return 'Ce mois';
    }
  };

  const renderActionChart = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Actions</h3>
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{item.value}</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(item.value / 24) * 100}%`,
                    backgroundColor: item.color 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Taux de Completion</p>
            <p className="text-2xl font-bold text-gray-900">75%</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            +5% vs mois dernier
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Performance Équipe</p>
            <p className="text-2xl font-bold text-gray-900">85%</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            +3% vs mois dernier
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Délai Moyen</p>
            <p className="text-2xl font-bold text-gray-900">5.2j</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-red-600">
            <AlertTriangle size={16} className="mr-1" />
            +0.8j vs mois dernier
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Actions/Membre</p>
            <p className="text-2xl font-bold text-gray-900">3.0</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            Équilibré
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ConfigurationSection title="Rapports & Analytics" />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Rapports & Analytics</h2>
        <div className="flex items-center space-x-3">
          <ExportButtons type="all" data={{}} />
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download size={20} />
            <span>PDF</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Période:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="actions">Actions</option>
              <option value="equipe">Équipe</option>
              <option value="reunions">Réunions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      {renderPerformanceMetrics()}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderActionChart()}
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution Mensuelle</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Janvier</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Décembre</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                </div>
                <span className="text-sm font-medium">80%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Novembre</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
                </div>
                <span className="text-sm font-medium">67%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Rapports Détaillés</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Rapport Actions</h4>
                  <p className="text-sm text-gray-600">Détail complet des actions</p>
                </div>
              </div>
              <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                Générer
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Rapport Équipe</h4>
                  <p className="text-sm text-gray-600">Performance par membre</p>
                </div>
              </div>
              <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors">
                Générer
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Rapport Réunions</h4>
                  <p className="text-sm text-gray-600">Suivi des sujets</p>
                </div>
              </div>
              <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors">
                Générer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapports;