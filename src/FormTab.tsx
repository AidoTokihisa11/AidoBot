import React, { useState, useCallback, useMemo } from 'react';
import './FormTab.css';

interface FormData {
  // Section 1: Profil de l'utilisateur
  discordId: string;
  usageFrequency: string;
  
  // Section 2: Performance et fonctionnalités du Bot
  botFeaturesPriority: {
    moderation: number;
    roleManagement: number;
    utilities: number;
    integrations: number;
    games: number;
  };
  botLatency: string;
  botLatencyDetails: string;
  uxImprovements: string;
  
  // Section 3: Système de tickets
  ticketProcessRating: {
    easeOfOpening: number;
    processingSpeed: number;
    responseClarity: number;
  };
  ticketImprovements: string[];
  ticketImprovementsOther: string;
  idealTicketChannel: string;
  
  // Section 4: Architecture du serveur
  commonProblems: string[];
  urgentModifications: string;
  newChannelsNeeded: string[];
  
  // Section 5: Design et embeds
  embedsEvaluation: {
    readability: number;
    readabilityComment: string;
    infoRelevance: number;
    infoRelevanceComment: string;
  };
  ticketElements: string[];
  
  // Section 6: Innovations
  revolutionaryFeature: string;
  freeComments: string;
  
  // Contact pour l'envoi par email
  email: string;
}

const FormTab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    discordId: '',
    usageFrequency: '',
    botFeaturesPriority: {
      moderation: 0,
      roleManagement: 0,
      utilities: 0,
      integrations: 0,
      games: 0
    },
    botLatency: '',
    botLatencyDetails: '',
    uxImprovements: '',
    ticketProcessRating: {
      easeOfOpening: 0,
      processingSpeed: 0,
      responseClarity: 0
    },
    ticketImprovements: [],
    ticketImprovementsOther: '',
    idealTicketChannel: '',
    commonProblems: [],
    urgentModifications: '',
    newChannelsNeeded: [],
    embedsEvaluation: {
      readability: 0,
      readabilityComment: '',
      infoRelevance: 0,
      infoRelevanceComment: ''
    },
    ticketElements: [],
    revolutionaryFeature: '',
    freeComments: '',
    email: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 7;

  // Constantes optimisées avec useMemo
  const usageFrequencyOptions = useMemo(() => [
    { value: 'daily', label: 'Quotidienne', icon: 'fas fa-calendar-day' },
    { value: 'weekly', label: 'Hebdomadaire', icon: 'fas fa-calendar-week' },
    { value: 'occasional', label: 'Occasionnelle', icon: 'fas fa-sync-alt' },
    { value: 'new', label: 'Je suis nouveau', icon: 'fas fa-user-plus' }
  ], []);

  const botFeatures = useMemo(() => [
    { key: 'moderation', label: 'Système de modération avancée', icon: 'fas fa-shield-alt' },
    { key: 'roleManagement', label: 'Gestion des rôles', icon: 'fas fa-users-cog' },
    { key: 'utilities', label: 'Commandes utilitaires', icon: 'fas fa-tools' },
    { key: 'integrations', label: 'Intégrations', icon: 'fas fa-link' },
    { key: 'games', label: 'Mini-jeux communautaires', icon: 'fas fa-gamepad' }
  ], []);

  const latencyOptions = useMemo(() => [
    { value: 'excellent', label: 'Excellente (<1s)', icon: 'fas fa-check-circle text-green' },
    { value: 'acceptable', label: 'Acceptable (1-3s)', icon: 'fas fa-exclamation-circle text-yellow' },
    { value: 'problematic', label: 'Problématique (>3s)', icon: 'fas fa-times-circle text-red' }
  ], []);

  const ratingAspects = useMemo(() => [
    { key: 'easeOfOpening', label: 'Facilité d\'ouverture', icon: 'fas fa-door-open' },
    { key: 'processingSpeed', label: 'Rapidité de traitement', icon: 'fas fa-tachometer-alt' },
    { key: 'responseClarity', label: 'Clarté des réponses', icon: 'fas fa-comments' }
  ], []);

  const ticketImprovements = useMemo(() => [
    { value: 'categorization', label: 'Catégorisation des tickets', icon: 'fas fa-folder' },
    { value: 'notifications', label: 'Notifications push pour le staff', icon: 'fas fa-bell' },
    { value: 'tracking', label: 'Intégration système de suivi', icon: 'fas fa-chart-line' }
  ], []);

  const channelOptions = useMemo(() => [
    { value: 'public', label: '#support-tickets (public)', icon: 'fas fa-globe' },
    { value: 'private', label: 'Salon privé dédié', icon: 'fas fa-lock' },
    { value: 'hybrid', label: 'Système hybride', icon: 'fas fa-exchange-alt' }
  ], []);

  const commonProblemsOptions = useMemo(() => [
    { value: 'roles', label: 'Rôles mal attribués', icon: 'fas fa-user-tag' },
    { value: 'channels', label: 'Salons mal organisés', icon: 'fas fa-th-large' },
    { value: 'rules', label: 'Règlement ambigu', icon: 'fas fa-gavel' },
    { value: 'none', label: 'Aucun problème', icon: 'fas fa-check-circle' }
  ], []);

  const newChannelsOptions = useMemo(() => [
    { value: 'debates', label: '#debats-moderés', icon: 'fas fa-balance-scale' },
    { value: 'projects', label: '#projets-collaboratifs', icon: 'fas fa-handshake' },
    { value: 'vocal247', label: '#vocal-24/7', icon: 'fas fa-volume-up' }
  ], []);

  const ticketElementsOptions = useMemo(() => [
    { value: 'history', label: 'Historique des modifications', icon: 'fas fa-history' },
    { value: 'estimation', label: 'Estimation temps de résolution', icon: 'fas fa-clock' },
    { value: 'satisfaction', label: 'Score de satisfaction', icon: 'fas fa-smile' }
  ], []);

  const handleInputChange = useCallback((field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field as string]) {
      setErrors(prev => ({
        ...prev,
        [field as string]: ''
      }));
    }
  }, [errors]);

  const handleArrayChange = useCallback((field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: checked 
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value)
      };
    });
  }, []);

  const handleRatingChange = useCallback((section: string, field: string, rating: number | string) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof FormData];
      if (typeof sectionData === 'object' && sectionData !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: rating
          }
        };
      }
      return prev;
    });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.usageFrequency) {
          newErrors.usageFrequency = 'Veuillez sélectionner votre fréquence d\'utilisation';
        }
        break;
      case 2:
        if (!formData.botLatency) {
          newErrors.botLatency = 'Veuillez évaluer la latence du bot';
        }
        break;
      case 3:
        if (!formData.idealTicketChannel) {
          newErrors.idealTicketChannel = 'Veuillez sélectionner votre préférence pour les tickets';
        }
        break;
      case 7:
        if (!formData.email) {
          newErrors.email = 'Veuillez saisir votre email pour recevoir les résultats';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Format d\'email invalide';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.usageFrequency, formData.botLatency, formData.idealTicketChannel, formData.email]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  }, [currentStep, validateStep, totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (validateStep(currentStep)) {
      try {
        // Simulation d'envoi par email
        console.log('Données du formulaire:', formData);
        
        // Ici, vous pourriez implémenter l'envoi par email
        // Par exemple avec EmailJS ou une API backend
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
      }
    }
  }, [currentStep, validateStep, formData]);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      discordId: '',
      usageFrequency: '',
      botFeaturesPriority: {
        moderation: 0,
        roleManagement: 0,
        utilities: 0,
        integrations: 0,
        games: 0
      },
      botLatency: '',
      botLatencyDetails: '',
      uxImprovements: '',
      ticketProcessRating: {
        easeOfOpening: 0,
        processingSpeed: 0,
        responseClarity: 0
      },
      ticketImprovements: [],
      ticketImprovementsOther: '',
      idealTicketChannel: '',
      commonProblems: [],
      urgentModifications: '',
      newChannelsNeeded: [],
      embedsEvaluation: {
        readability: 0,
        readabilityComment: '',
        infoRelevance: 0,
        infoRelevanceComment: ''
      },
      ticketElements: [],
      revolutionaryFeature: '',
      freeComments: '',
      email: ''
    });
    setErrors({});
  }, []);

  const renderStarRating = useCallback((rating: number, onChange: (rating: number) => void) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-search"></i> Section 1 : Profil de l'Utilisateur</h3>
              <p>Aidez-nous à mieux comprendre votre utilisation du serveur Discord</p>
            </div>
            
            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fab fa-discord"></i></span>
                Identifiant Discord (optionnel)
              </label>
              <input
                type="text"
                className="field-input"
                value={formData.discordId}
                onChange={(e) => handleInputChange('discordId', e.target.value)}
                placeholder="Votre pseudo Discord"
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-clock"></i></span>
                Fréquence d'utilisation du serveur
                <span className="required">*</span>
              </label>
              <div className="radio-group">
                {usageFrequencyOptions.map(option => (
                  <label key={option.value} className="radio-label">
                    <input
                      type="radio"
                      name="usageFrequency"
                      value={option.value}
                      checked={formData.usageFrequency === option.value}
                      onChange={(e) => handleInputChange('usageFrequency', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.usageFrequency && <div className="field-error">{errors.usageFrequency}</div>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-robot"></i> Section 2 : Performance et Fonctionnalités du Bot</h3>
              <p>Évaluez les fonctionnalités actuelles et proposez des améliorations</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-sort-numeric-down"></i></span>
                Classer ces fonctionnalités par ordre de priorité (1 = Priorité max, 5 = Non nécessaire)
              </label>
              <div className="priority-grid">
                {botFeatures.map(feature => (
                  <div key={feature.key} className="priority-item">
                    <div className="priority-header">
                      <span className="priority-icon"><i className={feature.icon}></i></span>
                      <span>{feature.label}</span>
                    </div>
                    <select
                      className="priority-select"
                      value={formData.botFeaturesPriority[feature.key as keyof typeof formData.botFeaturesPriority]}
                      onChange={(e) => handleRatingChange('botFeaturesPriority', feature.key, parseInt(e.target.value))}
                    >
                      <option value={0}>Sélectionner</option>
                      <option value={1}>1 - Priorité maximale</option>
                      <option value={2}>2 - Importante</option>
                      <option value={3}>3 - Modérée</option>
                      <option value={4}>4 - Faible</option>
                      <option value={5}>5 - Non nécessaire</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-bolt"></i></span>
                Latence perçue du bot
                <span className="required">*</span>
              </label>
              <div className="radio-group">
                {latencyOptions.map(option => (
                  <label key={option.value} className="radio-label">
                    <input
                      type="radio"
                      name="botLatency"
                      value={option.value}
                      checked={formData.botLatency === option.value}
                      onChange={(e) => handleInputChange('botLatency', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.botLatency && <div className="field-error">{errors.botLatency}</div>}
            </div>

            {formData.botLatency === 'problematic' && (
              <div className="form-field">
                <label className="field-label">
                  <span className="field-icon"><i className="fas fa-edit"></i></span>
                  Précisez les problèmes de latence
                </label>
                <textarea
                  className="field-input field-textarea"
                  value={formData.botLatencyDetails}
                  onChange={(e) => handleInputChange('botLatencyDetails', e.target.value)}
                  placeholder="Décrivez les problèmes de latence rencontrés..."
                />
              </div>
            )}

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-lightbulb"></i></span>
                Suggestions d'amélioration de l'UX
              </label>
              <textarea
                className="field-input field-textarea"
                value={formData.uxImprovements}
                onChange={(e) => handleInputChange('uxImprovements', e.target.value)}
                placeholder="Messages d'erreur, aide contextuelle, améliorations diverses..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-ticket-alt"></i> Section 3 : Système de Tickets</h3>
              <p>Évaluez le système de tickets actuel et proposez des améliorations</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-star"></i></span>
                Évaluation du processus actuel (1 = Médiocre, 5 = Excellent)
              </label>
              <div className="rating-grid">
                {ratingAspects.map(aspect => (
                  <div key={aspect.key} className="rating-item">
                    <div className="rating-header">
                      <span className="rating-icon"><i className={aspect.icon}></i></span>
                      <span>{aspect.label}</span>
                    </div>
                    {renderStarRating(
                      formData.ticketProcessRating[aspect.key as keyof typeof formData.ticketProcessRating],
                      (rating) => handleRatingChange('ticketProcessRating', aspect.key, rating)
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-wrench"></i></span>
                Améliorations souhaitées (choix multiples)
              </label>
              <div className="checkbox-grid">
                {ticketImprovements.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.ticketImprovements.includes(option.value)}
                      onChange={(e) => handleArrayChange('ticketImprovements', option.value, e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-comment-alt"></i></span>
                Autre amélioration
              </label>
              <input
                type="text"
                className="field-input"
                value={formData.ticketImprovementsOther}
                onChange={(e) => handleInputChange('ticketImprovementsOther', e.target.value)}
                placeholder="Décrivez une autre amélioration souhaitée..."
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-home"></i></span>
                Salon idéal pour les tickets
                <span className="required">*</span>
              </label>
              <div className="radio-group">
                {channelOptions.map(option => (
                  <label key={option.value} className="radio-label">
                    <input
                      type="radio"
                      name="idealTicketChannel"
                      value={option.value}
                      checked={formData.idealTicketChannel === option.value}
                      onChange={(e) => handleInputChange('idealTicketChannel', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.idealTicketChannel && <div className="field-error">{errors.idealTicketChannel}</div>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-server"></i> Section 4 : Architecture du Serveur</h3>
              <p>Identifiez les problèmes actuels et proposez des améliorations</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-exclamation-triangle"></i></span>
                Problèmes fréquents rencontrés
              </label>
              <div className="checkbox-grid">
                {commonProblemsOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.commonProblems.includes(option.value)}
                      onChange={(e) => handleArrayChange('commonProblems', option.value, e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-fire"></i></span>
                Modifications urgentes à apporter
              </label>
              <textarea
                className="field-input field-textarea"
                value={formData.urgentModifications}
                onChange={(e) => handleInputChange('urgentModifications', e.target.value)}
                placeholder="Décrivez les modifications prioritaires..."
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-plus-circle"></i></span>
                Nouveaux salons nécessaires
              </label>
              <div className="checkbox-grid">
                {newChannelsOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.newChannelsNeeded.includes(option.value)}
                      onChange={(e) => handleArrayChange('newChannelsNeeded', option.value, e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-palette"></i> Section 5 : Design et Embeds</h3>
              <p>Évaluez les éléments visuels et proposez des améliorations</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-chart-bar"></i></span>
                Évaluation des embeds existants
              </label>
              <div className="embed-evaluation">
                <div className="eval-item">
                  <div className="eval-header">
                    <span className="eval-icon"><i className="fas fa-eye"></i></span>
                    <span>Lisibilité</span>
                  </div>
                  {renderStarRating(
                    formData.embedsEvaluation.readability,
                    (rating) => handleRatingChange('embedsEvaluation', 'readability', rating)
                  )}
                  <textarea
                    className="eval-comment"
                    value={formData.embedsEvaluation.readabilityComment}
                    onChange={(e) => handleRatingChange('embedsEvaluation', 'readabilityComment', e.target.value)}
                    placeholder="Commentaire sur la lisibilité..."
                  />
                </div>
                <div className="eval-item">
                  <div className="eval-header">
                    <span className="eval-icon"><i className="fas fa-info-circle"></i></span>
                    <span>Pertinence des infos</span>
                  </div>
                  {renderStarRating(
                    formData.embedsEvaluation.infoRelevance,
                    (rating) => handleRatingChange('embedsEvaluation', 'infoRelevance', rating)
                  )}
                  <textarea
                    className="eval-comment"
                    value={formData.embedsEvaluation.infoRelevanceComment}
                    onChange={(e) => handleRatingChange('embedsEvaluation', 'infoRelevanceComment', e.target.value)}
                    placeholder="Commentaire sur la pertinence..."
                  />
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-plus"></i></span>
                Éléments à ajouter dans les tickets
              </label>
              <div className="checkbox-grid">
                {ticketElementsOptions.map(option => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.ticketElements.includes(option.value)}
                      onChange={(e) => handleArrayChange('ticketElements', option.value, e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-icon"><i className={option.icon}></i></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-rocket"></i> Section 6 : Innovations</h3>
              <p>Proposez des idées révolutionnaires pour améliorer l'expérience</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-magic"></i></span>
                Fonctionnalité révolutionnaire à implémenter
              </label>
              <textarea
                className="field-input field-textarea"
                value={formData.revolutionaryFeature}
                onChange={(e) => handleInputChange('revolutionaryFeature', e.target.value)}
                placeholder="Décrivez une fonctionnalité innovante qui pourrait révolutionner l'expérience utilisateur..."
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-comment-dots"></i></span>
                Commentaires libres
              </label>
              <textarea
                className="field-input field-textarea"
                value={formData.freeComments}
                onChange={(e) => handleInputChange('freeComments', e.target.value)}
                placeholder="Partagez vos idées, suggestions ou tout autre commentaire..."
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="form-section">
            <div className="section-header">
              <h3><i className="fas fa-envelope"></i> Finalisation</h3>
              <p>Saisissez votre email pour recevoir le résumé de vos réponses</p>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon"><i className="fas fa-at"></i></span>
                Adresse email
                <span className="required">*</span>
              </label>
              <input
                type="email"
                className="field-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="votre@email.com"
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="form-summary">
              <h4><i className="fas fa-clipboard-check"></i> Résumé de vos réponses</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Fréquence d'utilisation:</span>
                  <span className="summary-value">{formData.usageFrequency}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Latence du bot:</span>
                  <span className="summary-value">{formData.botLatency}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Canal tickets préféré:</span>
                  <span className="summary-value">{formData.idealTicketChannel}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Problèmes identifiés:</span>
                  <span className="summary-value">{formData.commonProblems.length} problème(s)</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="formtab-container">
        <div className="form-success">
          <div className="success-animation">
            <div className="check-mark">✓</div>
          </div>
          <h2>Questionnaire envoyé avec succès !</h2>
          <p>Merci pour votre participation ! Vos réponses ont été envoyées à l'équipe d'administration.</p>
          <p>Vous recevrez un résumé de vos réponses par email à l'adresse : <strong>{formData.email}</strong></p>
          <button 
            className="restart-btn"
            onClick={resetForm}
          >
            Nouveau questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="formtab-container">
      <div className="form-header">
        <h2><i className="fas fa-poll"></i> Questionnaire d'Optimisation du Serveur Discord</h2>
        <p>Destiné aux membres et contributeurs actifs - Réponses anonymisées si besoin</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          Étape {currentStep} sur {totalSteps}
        </div>
      </div>

      <div className="form-steps">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i + 1}
            className={`step ${i + 1 < currentStep ? 'completed' : ''} ${i + 1 === currentStep ? 'active' : ''}`}
          >
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="innovative-form">
        {renderStep()}
      </div>

      <div className="form-actions">
        {currentStep > 1 && (
          <button
            type="button"
            className="btn-secondary"
            onClick={prevStep}
          >
            ← Précédent
          </button>
        )}
        
        {currentStep < totalSteps ? (
          <button
            type="button"
            className="btn-primary"
            onClick={nextStep}
          >
            Suivant →
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
          >
            Envoyer le questionnaire
          </button>
        )}
      </div>
    </div>
  );
};

export default FormTab;
