import { useState, useCallback, useEffect } from 'react';

interface ModuleState {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  category: 'core' | 'moderation' | 'entertainment' | 'utility' | 'stream' | 'management';
  icon: string;
  status: 'active' | 'inactive' | 'updating';
  commands?: string[];
  permissions?: string[];
}

interface SystemStats {
  serversActive: number;
  users: number;
  commandsToday: number;
  uptime: number;
  messagesProcessed: number;
  commandsExecuted: number;
  moderationActions: number;
  ticketsResolved: number;
}

interface StreamerData {
  id: string;
  username: string;
  platform: 'twitch' | 'youtube';
  isLive: boolean;
  viewers?: number;
  game?: string;
  title?: string;
  thumbnail?: string;
}

interface TicketData {
  id: string;
  title: string;
  author: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  lastUpdate: Date;
}

interface Command {
  name: string;
  description: string;
  usage: string;
  category: string;
  enabled: boolean;
  cooldown?: number;
  permissions?: string[];
}

export const ModernAidoBotPanel = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'modules' | 'analytics' | 'settings'>('dashboard');
  const [systemStats, setSystemStats] = useState<SystemStats>({
    serversActive: 3,
    users: 20,
    commandsToday: 247,
    uptime: 99.8,
    messagesProcessed: 15420,
    commandsExecuted: 892,
    moderationActions: 12,
    ticketsResolved: 8
  });

  const [streamers, setStreamers] = useState<StreamerData[]>([
    {
      id: '1',
      username: 'StreamerPro',
      platform: 'twitch',
      isLive: true,
      viewers: 1250,
      game: 'Valorant',
      title: 'Ranked Gameplay - Road to Radiant!',
      thumbnail: 'https://via.placeholder.com/300x169'
    },
    {
      id: '2',
      username: 'GamerYT',
      platform: 'youtube',
      isLive: false,
      game: 'Minecraft',
      title: 'Building the Ultimate Castle'
    }
  ]);

  const [tickets, setTickets] = useState<TicketData[]>([
    {
      id: 'T001',
      title: 'Problème de rôles automatiques',
      author: 'User123',
      status: 'open',
      priority: 'high',
      category: 'Technique',
      createdAt: new Date('2025-01-20T10:30:00'),
      lastUpdate: new Date('2025-01-20T14:15:00')
    },
    {
      id: 'T002',
      title: 'Demande de nouveau salon',
      author: 'Moderator456',
      status: 'in-progress',
      priority: 'medium',
      category: 'Demande',
      createdAt: new Date('2025-01-19T16:20:00'),
      lastUpdate: new Date('2025-01-20T09:45:00')
    }
  ]);

  const [commands] = useState<Command[]>([
    {
      name: 'ban',
      description: 'Bannir un utilisateur du serveur',
      usage: '/ban @utilisateur [raison]',
      category: 'Modération',
      enabled: true,
      cooldown: 5,
      permissions: ['BAN_MEMBERS']
    },
    {
      name: 'kick',
      description: 'Expulser un utilisateur du serveur',
      usage: '/kick @utilisateur [raison]',
      category: 'Modération',
      enabled: true,
      cooldown: 3,
      permissions: ['KICK_MEMBERS']
    },
    {
      name: 'mute',
      description: 'Rendre muet un utilisateur',
      usage: '/mute @utilisateur [durée] [raison]',
      category: 'Modération',
      enabled: true,
      cooldown: 2,
      permissions: ['MANAGE_ROLES']
    },
    {
      name: 'warn',
      description: 'Avertir un utilisateur',
      usage: '/warn @utilisateur <raison>',
      category: 'Modération',
      enabled: true,
      permissions: ['MANAGE_MESSAGES']
    },
    {
      name: 'ticket',
      description: 'Créer un nouveau ticket de support',
      usage: '/ticket <sujet>',
      category: 'Support',
      enabled: true
    },
    {
      name: 'embed',
      description: 'Créer un message embed personnalisé',
      usage: '/embed <titre> <description>',
      category: 'Utilitaires',
      enabled: true,
      permissions: ['MANAGE_MESSAGES']
    },
    {
      name: 'stream',
      description: 'Annoncer un stream en cours',
      usage: '/stream <plateforme> <nom_streamer>',
      category: 'Divertissement',
      enabled: true
    }
  ]);

  const [modules, setModules] = useState<ModuleState[]>([
    // CORE MODULES
    {
      id: 'auto-moderation',
      name: 'Modération Automatique',
      enabled: true,
      description: 'Modération automatique intelligente avec détection de spam, liens malveillants et contenu inapproprié',
      category: 'moderation',
      icon: 'fas fa-shield-alt',
      status: 'active',
      commands: ['automod', 'filter', 'antiraid'],
      permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']
    },
    {
      id: 'welcome-system',
      name: 'Système d\'Accueil',
      enabled: true,
      description: 'Messages de bienvenue personnalisés, attribution automatique de rôles et système d\'onboarding',
      category: 'core',
      icon: 'fas fa-hand-wave',
      status: 'active',
      commands: ['welcome', 'goodbye', 'autorole'],
      permissions: ['MANAGE_ROLES']
    },
    {
      id: 'ticket-system',
      name: 'Système de Tickets',
      enabled: true,
      description: 'Gestion complète des tickets de support avec catégorisation automatique et attribution au staff',
      category: 'management',
      icon: 'fas fa-ticket-alt',
      status: 'active',
      commands: ['ticket', 'close', 'claim', 'transcript'],
      permissions: ['MANAGE_CHANNELS']
    },
    {
      id: 'embed-builder',
      name: 'Créateur d\'Embeds',
      enabled: true,
      description: 'Outil avancé pour créer des messages embed personnalisés avec boutons interactifs',
      category: 'utility',
      icon: 'fas fa-code',
      status: 'active',
      commands: ['embed', 'announcement', 'poll'],
      permissions: ['MANAGE_MESSAGES']
    },
    {
      id: 'stream-notifications',
      name: 'Notifications de Stream',
      enabled: true,
      description: 'Système de notification automatique pour Twitch et YouTube avec messages personnalisés',
      category: 'stream',
      icon: 'fas fa-video',
      status: 'active',
      commands: ['addstream', 'removestream', 'streamlist'],
      permissions: ['MANAGE_WEBHOOKS']
    },
    {
      id: 'music-player',
      name: 'Lecteur Musical',
      enabled: false,
      description: 'Lecteur audio haute qualité pour YouTube, Spotify avec queue avancée et effets',
      category: 'entertainment',
      icon: 'fas fa-music',
      status: 'inactive',
      commands: ['play', 'pause', 'skip', 'queue', 'volume'],
      permissions: ['CONNECT', 'SPEAK']
    },
    {
      id: 'economy-system',
      name: 'Système Économique',
      enabled: true,
      description: 'Monnaie virtuelle complète avec boutique, paris et système de récompenses',
      category: 'entertainment',
      icon: 'fas fa-coins',
      status: 'active',
      commands: ['balance', 'daily', 'shop', 'bet', 'transfer'],
      permissions: ['MANAGE_ROLES']
    },
    {
      id: 'logging-system',
      name: 'Journalisation Avancée',
      enabled: false,
      description: 'Enregistrement complet de toutes les activités du serveur avec analytics détaillés',
      category: 'utility',
      icon: 'fas fa-clipboard-list',
      status: 'inactive',
      commands: ['logs', 'audit', 'search'],
      permissions: ['VIEW_AUDIT_LOG']
    },
    {
      id: 'role-management',
      name: 'Gestion des Rôles',
      enabled: true,
      description: 'Système avancé de gestion des rôles avec auto-attribution et hiérarchie',
      category: 'management',
      icon: 'fas fa-users-cog',
      status: 'active',
      commands: ['role', 'autorole', 'reactionrole'],
      permissions: ['MANAGE_ROLES']
    },
    {
      id: 'giveaway-system',
      name: 'Système de Concours',
      enabled: false,
      description: 'Création et gestion de concours avec sélection automatique des gagnants',
      category: 'entertainment',
      icon: 'fas fa-gift',
      status: 'inactive',
      commands: ['giveaway', 'reroll', 'end'],
      permissions: ['MANAGE_MESSAGES']
    }
  ]);

  // Mise à jour automatique des stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        users: Math.max(15, prev.users + Math.floor(Math.random() * 3) - 1),
        commandsToday: prev.commandsToday + Math.floor(Math.random() * 5),
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 20),
        commandsExecuted: prev.commandsExecuted + Math.floor(Math.random() * 3),
        moderationActions: prev.moderationActions + (Math.random() > 0.9 ? 1 : 0),
        ticketsResolved: prev.ticketsResolved + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleModule = useCallback((moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            enabled: !module.enabled, 
            status: !module.enabled ? 'active' : 'inactive' 
          }
        : module
    ));
  }, []);

  const removeStreamer = useCallback((streamerId: string) => {
    setStreamers(prev => prev.filter(s => s.id !== streamerId));
  }, []);

  const updateTicketStatus = useCallback((ticketId: string, status: TicketData['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status, lastUpdate: new Date() }
        : ticket
    ));
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'var(--tawny)';
      case 'moderation': return 'var(--cocoa-brown)';
      case 'entertainment': return 'var(--princeton-orange)';
      case 'utility': return 'var(--selective-yellow)';
      case 'stream': return 'var(--xanthous)';
      case 'management': return 'var(--tawny)';
      default: return 'var(--text-secondary)';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core': return 'Essentiel';
      case 'moderation': return 'Modération';
      case 'entertainment': return 'Divertissement';
      case 'utility': return 'Utilitaires';
      case 'stream': return 'Streaming';
      case 'management': return 'Gestion';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#65a30d';
      default: return 'var(--text-secondary)';
    }
  };

  const renderDashboard = () => (
    <div className="aidobot-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Centre de Contrôle AidoBot</h1>
          <p>Supervisez et gérez votre bot Discord en temps réel</p>
        </div>
        <div className="dashboard-status">
          <div className="status-indicator active">
            <div className="status-dot"></div>
            <span>Bot opérationnel</span>
          </div>
        </div>
      </div>

      {/* Stats principales améliorées */}
      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-server"></i>
          </div>
          <div className="stat-content">
            <h3>{systemStats.serversActive}</h3>
            <p>Serveurs actifs</p>
            <small className="stat-trend">+2 cette semaine</small>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{systemStats.users}</h3>
            <p>Utilisateurs connectés</p>
            <small className="stat-trend">↗ +15% vs hier</small>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-terminal"></i>
          </div>
          <div className="stat-content">
            <h3>{systemStats.commandsToday}</h3>
            <p>Commandes aujourd'hui</p>
            <small className="stat-trend">Peak: 1.2k/h</small>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{systemStats.uptime}%</h3>
            <p>Temps de fonctionnement</p>
            <small className="stat-trend">24/7 depuis 30j</small>
          </div>
        </div>
      </div>

      {/* Stats détaillées */}
      <div className="detailed-stats">
        <h2>Activité en temps réel</h2>
        <div className="stats-grid">
          <div className="detailed-stat-card">
            <div className="stat-header">
              <h3><i className="fas fa-comments"></i> Messages</h3>
              <span className="stat-number">{systemStats.messagesProcessed.toLocaleString()}</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <span>Traités aujourd'hui</span>
            </div>
          </div>
          
          <div className="detailed-stat-card">
            <div className="stat-header">
              <h3><i className="fas fa-cogs"></i> Commandes</h3>
              <span className="stat-number">{systemStats.commandsExecuted}</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
              <span>Exécutées avec succès</span>
            </div>
          </div>

          <div className="detailed-stat-card">
            <div className="stat-header">
              <h3><i className="fas fa-shield"></i> Modération</h3>
              <span className="stat-number">{systemStats.moderationActions}</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '25%'}}></div>
              </div>
              <span>Actions automatiques</span>
            </div>
          </div>

          <div className="detailed-stat-card">
            <div className="stat-header">
              <h3><i className="fas fa-ticket-alt"></i> Support</h3>
              <span className="stat-number">{systemStats.ticketsResolved}</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '90%'}}></div>
              </div>
              <span>Tickets résolus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Streamers en live */}
      <div className="live-streams-section">
        <div className="section-header">
          <h2><i className="fas fa-video"></i> Streamers en direct</h2>
          <button className="btn-add-stream" onClick={() => {
            // Exemple d'ajout d'un nouveau streamer
            const newStreamer = {
              id: Date.now().toString(),
              username: 'NouveauStreamer',
              platform: 'twitch' as const,
              isLive: false,
              game: 'À définir',
              title: 'Nouveau stream'
            };
            setStreamers(prev => [...prev, newStreamer]);
          }}>
            <i className="fas fa-plus"></i> Ajouter un streamer
          </button>
        </div>
        <div className="streams-grid">
          {streamers.filter(s => s.isLive).map(streamer => (
            <div key={streamer.id} className="stream-card live">
              <div className="stream-thumbnail">
                <img src={streamer.thumbnail || 'https://via.placeholder.com/300x169'} alt="Stream" />
                <div className="live-badge">
                  <i className="fas fa-circle"></i> EN DIRECT
                </div>
                <div className="viewer-count">
                  <i className="fas fa-eye"></i> {streamer.viewers?.toLocaleString()}
                </div>
              </div>
              <div className="stream-info">
                <h4>{streamer.username}</h4>
                <p className="stream-title">{streamer.title}</p>
                <div className="stream-meta">
                  <span className={`platform ${streamer.platform}`}>
                    <i className={`fab fa-${streamer.platform}`}></i> {streamer.platform}
                  </span>
                  <span className="game">{streamer.game}</span>
                </div>
                <button className="stream-action-btn" onClick={() => removeStreamer(streamer.id)}>
                  <i className="fas fa-bell"></i> Notifications activées
                </button>
              </div>
            </div>
          ))}
          {streamers.filter(s => !s.isLive).map(streamer => (
            <div key={streamer.id} className="stream-card offline">
              <div className="stream-info">
                <h4>{streamer.username}</h4>
                <p className="stream-status">Hors ligne</p>
                <div className="stream-meta">
                  <span className={`platform ${streamer.platform}`}>
                    <i className={`fab fa-${streamer.platform}`}></i> {streamer.platform}
                  </span>
                </div>
                <button className="stream-action-btn secondary" onClick={() => removeStreamer(streamer.id)}>
                  <i className="fas fa-times"></i> Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Tickets récents */}
      <div className="recent-tickets-section">
        <div className="section-header">
          <h2><i className="fas fa-ticket-alt"></i> Tickets récents</h2>
          <button className="btn-view-all">
            <i className="fas fa-external-link-alt"></i> Voir tous
          </button>
        </div>
        <div className="tickets-list">
          {tickets.slice(0, 3).map(ticket => (
            <div key={ticket.id} className={`ticket-item ${ticket.status}`}>
              <div className="ticket-priority" style={{backgroundColor: getPriorityColor(ticket.priority)}}></div>
              <div className="ticket-content">
                <div className="ticket-header">
                  <h4>#{ticket.id} - {ticket.title}</h4>
                  <span className={`status-badge ${ticket.status}`}>
                    {ticket.status === 'open' && 'Ouvert'}
                    {ticket.status === 'in-progress' && 'En cours'}
                    {ticket.status === 'closed' && 'Fermé'}
                  </span>
                </div>
                <div className="ticket-meta">
                  <span><i className="fas fa-user"></i> {ticket.author}</span>
                  <span><i className="fas fa-tag"></i> {ticket.category}</span>
                  <span><i className="fas fa-clock"></i> {ticket.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="ticket-actions">
                <button 
                  className="ticket-action-btn"
                  onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
                  disabled={ticket.status !== 'open'}
                >
                  <i className="fas fa-play"></i>
                </button>
                <button 
                  className="ticket-action-btn"
                  onClick={() => updateTicketStatus(ticket.id, 'closed')}
                  disabled={ticket.status === 'closed'}
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides améliorées */}
      <div className="quick-actions">
        <h2>Actions rapides</h2>
        <div className="action-grid">
          <button className="action-card primary" onClick={() => setActiveTab('modules')}>
            <i className="fas fa-puzzle-piece"></i>
            <h3>Gérer les modules</h3>
            <p>Activer ou configurer les fonctionnalités du bot</p>
            <span className="action-badge">{modules.filter(m => m.enabled).length} actifs</span>
          </button>
          <button className="action-card" onClick={() => setActiveTab('analytics')}>
            <i className="fas fa-chart-line"></i>
            <h3>Analytics avancées</h3>
            <p>Tableaux de bord et métriques détaillées</p>
            <span className="action-badge">Temps réel</span>
          </button>
          <button className="action-card">
            <i className="fas fa-code"></i>
            <h3>Créer un embed</h3>
            <p>Générateur visuel d'embeds personnalisés</p>
            <span className="action-badge">Nouveau</span>
          </button>
          <button className="action-card">
            <i className="fas fa-gavel"></i>
            <h3>Actions de modération</h3>
            <p>Outils rapides pour modérer votre serveur</p>
            <span className="action-badge">{systemStats.moderationActions} aujourd'hui</span>
          </button>
          <button className="action-card" onClick={() => setActiveTab('settings')}>
            <i className="fas fa-cog"></i>
            <h3>Configuration avancée</h3>
            <p>Paramètres système et personnalisation</p>
            <span className="action-badge">Sécurisé</span>
          </button>
          <button className="action-card">
            <i className="fas fa-download"></i>
            <h3>Logs & Backups</h3>
            <p>Télécharger les logs et sauvegardes</p>
            <span className="action-badge">Auto</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div className="aidobot-modules">
      <div className="modules-header">
        <h1>Gestion des modules</h1>
        <p>Contrôlez toutes les fonctionnalités de votre bot Discord</p>
        <div className="modules-stats">
          <span className="modules-stat">
            <i className="fas fa-check-circle"></i>
            {modules.filter(m => m.enabled).length} modules actifs
          </span>
          <span className="modules-stat">
            <i className="fas fa-times-circle"></i>
            {modules.filter(m => !m.enabled).length} modules inactifs
          </span>
        </div>
      </div>

      <div className="modules-categories">
        {['core', 'moderation', 'management', 'stream', 'entertainment', 'utility'].map(category => (
          <div key={category} className="category-section">
            <div className="category-header">
              <h2 style={{ color: getCategoryColor(category) }}>
                {getCategoryLabel(category)}
              </h2>
              <div className="category-info">
                <span className="module-count">
                  {modules.filter(m => m.category === category).length} modules
                </span>
                <span className="active-count">
                  {modules.filter(m => m.category === category && m.enabled).length} actifs
                </span>
              </div>
            </div>
            
            <div className="modules-grid">
              {modules.filter(m => m.category === category).map(module => (
                <div key={module.id} className={`module-card ${module.enabled ? 'enabled' : 'disabled'}`}>
                  <div className="module-header">
                    <div className="module-icon" style={{ background: getCategoryColor(category) }}>
                      <i className={module.icon}></i>
                    </div>
                    <div className="module-info">
                      <h3>{module.name}</h3>
                      <span className={`status-badge ${module.status}`}>
                        {module.status === 'active' ? 'Actif' : module.status === 'updating' ? 'Mise à jour' : 'Inactif'}
                      </span>
                    </div>
                    <label className="module-toggle">
                      <input
                        type="checkbox"
                        checked={module.enabled}
                        onChange={() => toggleModule(module.id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <p className="module-description">{module.description}</p>
                  
                  {module.commands && (
                    <div className="module-commands">
                      <h4><i className="fas fa-terminal"></i> Commandes disponibles</h4>
                      <div className="commands-list">
                        {module.commands.map(cmd => (
                          <span key={cmd} className="command-tag">/{cmd}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {module.permissions && (
                    <div className="module-permissions">
                      <h4><i className="fas fa-key"></i> Permissions requises</h4>
                      <div className="permissions-list">
                        {module.permissions.map(perm => (
                          <span key={perm} className="permission-tag">{perm}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="module-actions">
                    <button className="module-action-btn">
                      <i className="fas fa-cog"></i> Configurer
                    </button>
                    {module.enabled && (
                      <button className="module-action-btn">
                        <i className="fas fa-chart-bar"></i> Statistiques
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="modules-tools">
        <h2>Outils de gestion</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <i className="fas fa-download"></i>
            <h3>Importer configuration</h3>
            <p>Charger une configuration existante</p>
            <button className="tool-btn">Importer</button>
          </div>
          <div className="tool-card">
            <i className="fas fa-upload"></i>
            <h3>Exporter configuration</h3>
            <p>Sauvegarder vos paramètres</p>
            <button className="tool-btn">Exporter</button>
          </div>
          <div className="tool-card">
            <i className="fas fa-undo"></i>
            <h3>Réinitialiser</h3>
            <p>Revenir aux paramètres par défaut</p>
            <button className="tool-btn danger">Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="aidobot-analytics">
      <div className="analytics-header">
        <h1>Analytics & Métriques</h1>
        <p>Analyse approfondie des performances de votre bot</p>
        <div className="analytics-filters">
          <button className="filter-btn active">Aujourd'hui</button>
          <button className="filter-btn">7 jours</button>
          <button className="filter-btn">30 jours</button>
          <button className="filter-btn">Personnalisé</button>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="metric-card">
          <div className="metric-header">
            <h3>Commandes populaires</h3>
            <i className="fas fa-terminal"></i>
          </div>
          <div className="metric-chart">
            {commands.slice(0, 5).map((cmd, index) => (
              <div key={cmd.name} className="command-stat">
                <span className="command-name">/{cmd.name}</span>
                <div className="command-bar">
                  <div 
                    className="command-fill" 
                    style={{width: `${100 - (index * 15)}%`}}
                  ></div>
                </div>
                <span className="command-uses">{Math.floor(Math.random() * 500) + 100}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Performance système</h3>
            <i className="fas fa-tachometer-alt"></i>
          </div>
          <div className="performance-metrics">
            <div className="perf-item">
              <span className="perf-label">CPU</span>
              <div className="perf-bar">
                <div className="perf-fill cpu" style={{width: '25%'}}></div>
              </div>
              <span className="perf-value">25%</span>
            </div>
            <div className="perf-item">
              <span className="perf-label">RAM</span>
              <div className="perf-bar">
                <div className="perf-fill ram" style={{width: '42%'}}></div>
              </div>
              <span className="perf-value">42%</span>
            </div>
            <div className="perf-item">
              <span className="perf-label">Réseau</span>
              <div className="perf-bar">
                <div className="perf-fill network" style={{width: '18%'}}></div>
              </div>
              <span className="perf-value">18%</span>
            </div>
            <div className="perf-item">
              <span className="perf-label">Stockage</span>
              <div className="perf-bar">
                <div className="perf-fill storage" style={{width: '65%'}}></div>
              </div>
              <span className="perf-value">65%</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Activité utilisateurs</h3>
            <i className="fas fa-users"></i>
          </div>
          <div className="user-activity-chart">
            <div className="activity-timeline">
              {[...Array(24)].map((_, hour) => (
                <div key={hour} className="hour-bar">
                  <div 
                    className="activity-fill"
                    style={{height: `${Math.random() * 80 + 10}%`}}
                    title={`${hour}h: ${Math.floor(Math.random() * 50)} utilisateurs`}
                  ></div>
                  <span className="hour-label">{hour}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Modération automatique</h3>
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="moderation-stats">
            <div className="mod-stat">
              <i className="fas fa-ban"></i>
              <div>
                <span className="mod-number">24</span>
                <span className="mod-label">Messages supprimés</span>
              </div>
            </div>
            <div className="mod-stat">
              <i className="fas fa-user-times"></i>
              <div>
                <span className="mod-number">3</span>
                <span className="mod-label">Utilisateurs sanctionnés</span>
              </div>
            </div>
            <div className="mod-stat">
              <i className="fas fa-link"></i>
              <div>
                <span className="mod-number">12</span>
                <span className="mod-label">Liens bloqués</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-analytics">
        <div className="analytics-section">
          <h2>Rapport d'activité détaillé</h2>
          <div className="activity-report">
            <div className="report-card">
              <h3>Commandes les plus utilisées</h3>
              <div className="top-commands">
                {commands.filter(cmd => cmd.enabled).slice(0, 3).map((cmd, index) => (
                  <div key={cmd.name} className="top-command">
                    <span className="rank">#{index + 1}</span>
                    <div className="command-info">
                      <strong>/{cmd.name}</strong>
                      <p>{cmd.description}</p>
                    </div>
                    <span className="usage-count">{Math.floor(Math.random() * 200) + 50} utilisations</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-card">
              <h3>Tendances hebdomadaires</h3>
              <div className="weekly-trends">
                <div className="trend-item positive">
                  <i className="fas fa-arrow-up"></i>
                  <div>
                    <span>+15%</span>
                    <p>Nouvelles connexions</p>
                  </div>
                </div>
                <div className="trend-item positive">
                  <i className="fas fa-arrow-up"></i>
                  <div>
                    <span>+23%</span>
                    <p>Messages envoyés</p>
                  </div>
                </div>
                <div className="trend-item negative">
                  <i className="fas fa-arrow-down"></i>
                  <div>
                    <span>-8%</span>
                    <p>Actions de modération</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-card">
              <h3>Heures de pointe</h3>
              <div className="peak-hours">
                <div className="peak-hour">
                  <span className="time">20h - 22h</span>
                  <div className="peak-bar">
                    <div className="peak-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="peak-percentage">90%</span>
                </div>
                <div className="peak-hour">
                  <span className="time">14h - 16h</span>
                  <div className="peak-bar">
                    <div className="peak-fill" style={{width: '65%'}}></div>
                  </div>
                  <span className="peak-percentage">65%</span>
                </div>
                <div className="peak-hour">
                  <span className="time">09h - 11h</span>
                  <div className="peak-bar">
                    <div className="peak-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="peak-percentage">45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-section">
          <h2>Insights & Recommandations</h2>
          <div className="insights-grid">
            <div className="insight-card success">
              <i className="fas fa-lightbulb"></i>
              <h4>Excellente performance</h4>
              <p>Votre bot répond en moyenne en moins de 50ms. La latence est optimale pour une expérience utilisateur fluide.</p>
            </div>
            <div className="insight-card warning">
              <i className="fas fa-exclamation-triangle"></i>
              <h4>Pic d'activité détecté</h4>
              <p>Le trafic augmente de 25% entre 20h et 22h. Considérez l'activation de l'auto-scaling pour ces périodes.</p>
            </div>
            <div className="insight-card info">
              <i className="fas fa-chart-line"></i>
              <h4>Croissance constante</h4>
              <p>+15% d'utilisateurs actifs cette semaine. Votre communauté grandit sainement !</p>
            </div>
          </div>
        </div>
      </div>

      <div className="export-section">
        <h2>Exporter les données</h2>
        <div className="export-options">
          <button className="export-btn">
            <i className="fas fa-file-csv"></i>
            Exporter en CSV
          </button>
          <button className="export-btn">
            <i className="fas fa-file-pdf"></i>
            Rapport PDF
          </button>
          <button className="export-btn">
            <i className="fas fa-file-excel"></i>
            Feuille Excel
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="aidobot-settings">
      <div className="settings-header">
        <h1>Configuration du bot</h1>
        <p>Paramètres avancés et configuration système</p>
      </div>

      <div className="settings-navigation">
        <div className="settings-nav-item active">
          <i className="fas fa-cog"></i>
          <span>Général</span>
        </div>
        <div className="settings-nav-item">
          <i className="fas fa-shield-alt"></i>
          <span>Modération</span>
        </div>
        <div className="settings-nav-item">
          <i className="fas fa-video"></i>
          <span>Streaming</span>
        </div>
        <div className="settings-nav-item">
          <i className="fas fa-ticket-alt"></i>
          <span>Support</span>
        </div>
        <div className="settings-nav-item">
          <i className="fas fa-code"></i>
          <span>Embeds</span>
        </div>
        <div className="settings-nav-item">
          <i className="fas fa-database"></i>
          <span>Base de données</span>
        </div>
      </div>

      <div className="settings-content">
        {/* Configuration générale */}
        <div className="settings-section active">
          <h2>Configuration générale</h2>
          
          <div className="setting-group">
            <h3>Paramètres du bot</h3>
            <div className="setting-item">
              <label>Préfixe des commandes</label>
              <input type="text" defaultValue="!" className="setting-input" />
              <small>Caractère utilisé avant les commandes (ex: !help)</small>
            </div>
            <div className="setting-item">
              <label>Nom d'affichage</label>
              <input type="text" defaultValue="AidoBot" className="setting-input" />
              <small>Nom affiché dans Discord</small>
            </div>
            <div className="setting-item">
              <label>Statut personnalisé</label>
              <input type="text" defaultValue="🎮 En train de gérer le serveur" className="setting-input" />
              <small>Message affiché sous le nom du bot</small>
            </div>
            <div className="setting-item">
              <label>Type d'activité</label>
              <select className="setting-select">
                <option value="playing">En train de jouer</option>
                <option value="listening">En train d'écouter</option>
                <option value="watching">En train de regarder</option>
                <option value="streaming">En stream</option>
              </select>
            </div>
          </div>

          <div className="setting-group">
            <h3>Permissions et sécurité</h3>
            <div className="setting-item">
              <label>Rôles administrateurs</label>
              <div className="roles-selector">
                <span className="role-tag">@Administrateur</span>
                <span className="role-tag">@Modérateur</span>
                <button className="add-role-btn">
                  <i className="fas fa-plus"></i> Ajouter
                </button>
              </div>
              <small>Rôles ayant accès aux commandes d'administration</small>
            </div>
            <div className="setting-item toggle-item">
              <label>Mode développeur</label>
              <label className="setting-toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
              <small>Active les logs détaillés et commandes de debug</small>
            </div>
            <div className="setting-item toggle-item">
              <label>Logs de sécurité</label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <small>Enregistre toutes les actions sensibles</small>
            </div>
          </div>

          <div className="setting-group">
            <h3>Canaux système</h3>
            <div className="setting-item">
              <label>Canal de logs</label>
              <select className="setting-select">
                <option value="">Sélectionner un canal</option>
                <option value="logs">#logs</option>
                <option value="admin-logs">#admin-logs</option>
                <option value="mod-logs">#mod-logs</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Canal d'accueil</label>
              <select className="setting-select">
                <option value="">Sélectionner un canal</option>
                <option value="welcome">#bienvenue</option>
                <option value="general">#général</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Canal des règles</label>
              <select className="setting-select">
                <option value="">Sélectionner un canal</option>
                <option value="rules">#règlement</option>
                <option value="info">#informations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Configuration modération */}
        <div className="settings-section">
          <h2>Configuration de modération</h2>
          
          <div className="setting-group">
            <h3>Auto-modération</h3>
            <div className="setting-item toggle-item">
              <label>Anti-spam</label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <small>Supprime automatiquement les messages répétitifs</small>
            </div>
            <div className="setting-item">
              <label>Limite de messages par minute</label>
              <input type="number" defaultValue="10" min="1" max="100" className="setting-input" />
            </div>
            <div className="setting-item toggle-item">
              <label>Filtre de mots interdits</label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <label>Liste des mots interdits</label>
              <textarea className="setting-textarea" placeholder="Entrez les mots séparés par des virgules"></textarea>
            </div>
            <div className="setting-item toggle-item">
              <label>Anti-raid</label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <small>Protection automatique contre les raids</small>
            </div>
          </div>

          <div className="setting-group">
            <h3>Sanctions automatiques</h3>
            <div className="auto-sanctions">
              <div className="sanction-rule">
                <span>3 avertissements</span>
                <i className="fas fa-arrow-right"></i>
                <select className="sanction-select">
                  <option value="mute">Mute 1h</option>
                  <option value="kick">Expulsion</option>
                  <option value="ban">Bannissement</option>
                </select>
              </div>
              <div className="sanction-rule">
                <span>Spam détecté</span>
                <i className="fas fa-arrow-right"></i>
                <select className="sanction-select">
                  <option value="delete">Suppression</option>
                  <option value="mute">Mute 10min</option>
                  <option value="warn">Avertissement</option>
                </select>
              </div>
              <div className="sanction-rule">
                <span>Lien malveillant</span>
                <i className="fas fa-arrow-right"></i>
                <select className="sanction-select">
                  <option value="ban">Bannissement</option>
                  <option value="kick">Expulsion</option>
                  <option value="mute">Mute 24h</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration streaming */}
        <div className="settings-section">
          <h2>Configuration streaming</h2>
          
          <div className="setting-group">
            <h3>Notifications de stream</h3>
            <div className="setting-item">
              <label>Canal d'annonces</label>
              <select className="setting-select">
                <option value="">Sélectionner un canal</option>
                <option value="streams">#streams</option>
                <option value="annonces">#annonces</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Rôle à mentionner</label>
              <select className="setting-select">
                <option value="">Aucun</option>
                <option value="stream-lovers">@Stream Lovers</option>
                <option value="everyone">@everyone</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Message d'annonce personnalisé</label>
              <textarea 
                className="setting-textarea" 
                defaultValue="🎮 {username} est maintenant en direct sur {platform} ! 
Regardez ici: {link}"
                placeholder="Variables: {username}, {platform}, {game}, {title}, {link}"
              ></textarea>
            </div>
          </div>

          <div className="setting-group">
            <h3>Streamers configurés</h3>
            <div className="streamers-list">
              {streamers.map(streamer => (
                <div key={streamer.id} className="streamer-config">
                  <div className="streamer-info">
                    <span className="streamer-name">{streamer.username}</span>
                    <span className={`platform-badge ${streamer.platform}`}>
                      <i className={`fab fa-${streamer.platform}`}></i>
                      {streamer.platform}
                    </span>
                    <span className={`status-indicator ${streamer.isLive ? 'live' : 'offline'}`}>
                      {streamer.isLive ? 'En direct' : 'Hors ligne'}
                    </span>
                  </div>
                  <div className="streamer-actions">
                    <button className="config-btn">
                      <i className="fas fa-cog"></i>
                    </button>
                    <button className="delete-btn" onClick={() => removeStreamer(streamer.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <button className="add-streamer-btn" onClick={() => {
                const newStreamer = {
                  id: Date.now().toString(),
                  username: 'NouveauStreamer',
                  platform: 'twitch' as const,
                  isLive: false,
                  game: 'À définir',
                  title: 'Configuration requise'
                };
                setStreamers(prev => [...prev, newStreamer]);
              }}>
                <i className="fas fa-plus"></i>
                Ajouter un streamer
              </button>
            </div>
          </div>
        </div>

        {/* Configuration tickets */}
        <div className="settings-section">
          <h2>Système de support</h2>
          
          <div className="setting-group">
            <h3>Configuration des tickets</h3>
            <div className="setting-item">
              <label>Catégorie pour les tickets</label>
              <select className="setting-select">
                <option value="">Sélectionner une catégorie</option>
                <option value="support">Support</option>
                <option value="tickets">Tickets</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Rôle support staff</label>
              <select className="setting-select">
                <option value="">Sélectionner un rôle</option>
                <option value="support">@Support</option>
                <option value="moderator">@Modérateur</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Message d'ouverture</label>
              <textarea 
                className="setting-textarea"
                defaultValue="Merci d'avoir ouvert un ticket ! Un membre du staff vous répondra bientôt.
Pour fermer ce ticket, utilisez la commande `!close`"
              ></textarea>
            </div>
            <div className="setting-item toggle-item">
              <label>Transcription automatique</label>
              <label className="setting-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <small>Sauvegarde automatiquement les conversations</small>
            </div>
          </div>

          <div className="setting-group">
            <h3>Catégories de tickets</h3>
            <div className="ticket-categories">
              <div className="category-item">
                <span>🔧 Support technique</span>
                <button className="edit-btn"><i className="fas fa-edit"></i></button>
              </div>
              <div className="category-item">
                <span>💡 Suggestion</span>
                <button className="edit-btn"><i className="fas fa-edit"></i></button>
              </div>
              <div className="category-item">
                <span>🚨 Signalement</span>
                <button className="edit-btn"><i className="fas fa-edit"></i></button>
              </div>
              <button className="add-category-btn" onClick={() => {
                // Logique pour ajouter une nouvelle catégorie
                console.log('Ajouter une nouvelle catégorie de ticket');
              }}>
                <i className="fas fa-plus"></i>
                Ajouter une catégorie
              </button>
            </div>
          </div>
        </div>

        {/* Sauvegarde et actions */}
        <div className="settings-actions">
          <button className="save-btn primary">
            <i className="fas fa-save"></i>
            Sauvegarder la configuration
          </button>
          <button className="export-btn">
            <i className="fas fa-download"></i>
            Exporter
          </button>
          <button className="import-btn">
            <i className="fas fa-upload"></i>
            Importer
          </button>
          <button className="reset-btn danger">
            <i className="fas fa-undo"></i>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modern-aidobot-panel">
      <div className="aidobot-nav">
        <div className="nav-brand">
          <i className="fas fa-robot"></i>
          <span>AidoBot Panel</span>
        </div>
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Tableau de bord</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            <i className="fas fa-puzzle-piece"></i>
            <span>Modules</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-line"></i>
            <span>Analyses</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i>
            <span>Paramètres</span>
          </button>
        </nav>
      </div>

      <div className="aidobot-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'modules' && renderModules()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};
