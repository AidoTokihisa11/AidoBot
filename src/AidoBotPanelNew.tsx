import { useState } from 'react';

type ModuleStates = {
  welcome: boolean;
  moderation: boolean;
  autoRole: boolean;
  music: boolean;
  games: boolean;
  economy: boolean;
};

export const AidoBotPanel = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [moduleStates, setModuleStates] = useState<ModuleStates>({
    welcome: true,
    moderation: true,
    autoRole: false,
    music: true,
    games: false,
    economy: true
  });

  const toggleModule = (module: keyof ModuleStates) => {
    setModuleStates(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'fas fa-chart-line' },
    { id: 'modules', label: 'Modules', icon: 'fas fa-puzzle-piece' },
    { id: 'moderation', label: 'Modération', icon: 'fas fa-shield-alt' },
    { id: 'automod', label: 'Auto-Modération', icon: 'fas fa-robot' },
    { id: 'logs', label: 'Logs', icon: 'fas fa-clipboard-list' },
    { id: 'welcome', label: 'Messages de bienvenue', icon: 'fas fa-hand-wave' },
    { id: 'roles', label: 'Gestion des rôles', icon: 'fas fa-users-cog' },
    { id: 'channels', label: 'Gestion des salons', icon: 'fas fa-hashtag' },
    { id: 'economy', label: 'Système économique', icon: 'fas fa-coins' },
    { id: 'music', label: 'Musique', icon: 'fas fa-music' },
    { id: 'games', label: 'Mini-jeux', icon: 'fas fa-gamepad' },
    { id: 'tickets', label: 'Système de tickets', icon: 'fas fa-ticket-alt' },
    { id: 'analytics', label: 'Analytiques', icon: 'fas fa-chart-bar' },
    { id: 'settings', label: 'Paramètres', icon: 'fas fa-cog' }
  ];

  const renderSidebar = () => (
    <div className="aidobot-sidebar">
      <div className="aidobot-logo">
        <div className="aidobot-logo-icon">
          <i className="fas fa-robot"></i>
        </div>
        <div className="aidobot-logo-text">
          <h3>AidoBot</h3>
          <p>Panel Administrateur</p>
        </div>
      </div>

      <div className="aidobot-menu">
        <div className="menu-section">
          <div className="menu-section-title">Principal</div>
          {menuItems.slice(0, 4).map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Fonctionnalités</div>
          {menuItems.slice(4, 8).map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Divertissement</div>
          {menuItems.slice(8, 12).map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Administration</div>
          {menuItems.slice(12).map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="aidobot-stats">
        <h4><i className="fas fa-chart-line"></i> Statistiques Live</h4>
        <div className="stat-row">
          <span>Serveurs actifs</span>
          <span className="stat-value">1,247</span>
        </div>
        <div className="stat-row">
          <span>Utilisateurs</span>
          <span className="stat-value">89,432</span>
        </div>
        <div className="stat-row">
          <span>Commandes/jour</span>
          <span className="stat-value">15,683</span>
        </div>
        <div className="stat-row">
          <span>Uptime</span>
          <span className="stat-value">99.9%</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Tableau de bord AidoBot</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-sync-alt"></i>
                  Actualiser
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-plus"></i>
                  Nouveau module
                </button>
              </div>
            </div>

            <div className="module-grid">
              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-hand-wave"></i> Messages de bienvenue</h3>
                  <div className="module-toggle">
                    <div 
                      className={`toggle-switch ${moduleStates.welcome ? 'active' : ''}`}
                      onClick={() => toggleModule('welcome')}
                    ></div>
                  </div>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <h4><i className="fas fa-cog"></i> Configuration</h4>
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Canal de bienvenue</label>
                        <select className="config-select">
                          <option>#général</option>
                          <option>#bienvenue</option>
                          <option>#nouveaux-membres</option>
                        </select>
                      </div>
                      <div className="config-item">
                        <label>Message personnalisé</label>
                        <input type="text" className="config-input" placeholder="Bienvenue {user} sur notre serveur !" />
                      </div>
                    </div>
                  </div>

                  <div className="embed-preview">
                    <div className="embed-header">
                      <i className="fas fa-hand-wave"></i>
                      <span>Nouveau membre</span>
                    </div>
                    <div className="embed-content">
                      <h4>Bienvenue sur notre serveur Discord !</h4>
                      <p>Salut <strong>@NouveauMembre</strong> ! Nous sommes ravis de t'accueillir parmi nous. N'hésite pas à consulter les règles et à te présenter !</p>
                    </div>
                    <div className="embed-footer">
                      <span>AidoBot • Aujourd'hui à 14:32</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-shield-alt"></i> Auto-Modération</h3>
                  <div className="module-toggle">
                    <div 
                      className={`toggle-switch ${moduleStates.moderation ? 'active' : ''}`}
                      onClick={() => toggleModule('moderation')}
                    ></div>
                  </div>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <h4><i className="fas fa-ban"></i> Filtres actifs</h4>
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Anti-spam</label>
                        <div className="toggle-switch active"></div>
                      </div>
                      <div className="config-item">
                        <label>Filtrage des mots interdits</label>
                        <div className="toggle-switch active"></div>
                      </div>
                      <div className="config-item">
                        <label>Anti-flood</label>
                        <div className="toggle-switch"></div>
                      </div>
                      <div className="config-item">
                        <label>Protection contre les raids</label>
                        <div className="toggle-switch active"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-users-cog"></i> Attribution automatique de rôles</h3>
                  <div className="module-toggle">
                    <div 
                      className={`toggle-switch ${moduleStates.autoRole ? 'active' : ''}`}
                      onClick={() => toggleModule('autoRole')}
                    ></div>
                  </div>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <h4><i className="fas fa-user-plus"></i> Nouveaux membres</h4>
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Rôle par défaut</label>
                        <select className="config-select">
                          <option>@Membre</option>
                          <option>@Visiteur</option>
                          <option>@Nouveau</option>
                        </select>
                      </div>
                      <div className="config-item">
                        <label>Délai d'attribution (minutes)</label>
                        <input type="number" className="config-input" placeholder="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-coins"></i> Système économique</h3>
                  <div className="module-toggle">
                    <div 
                      className={`toggle-switch ${moduleStates.economy ? 'active' : ''}`}
                      onClick={() => toggleModule('economy')}
                    ></div>
                  </div>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <h4><i className="fas fa-money-bill-wave"></i> Configuration monétaire</h4>
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Nom de la monnaie</label>
                        <input type="text" className="config-input" placeholder="AidoCoins" />
                      </div>
                      <div className="config-item">
                        <label>Gains par message</label>
                        <input type="number" className="config-input" placeholder="1-5" />
                      </div>
                      <div className="config-item">
                        <label>Bonus quotidien</label>
                        <input type="number" className="config-input" placeholder="100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="performance-monitor">
              <h4><i className="fas fa-tachometer-alt"></i> Monitoring des performances</h4>
              <div className="performance-grid">
                <div className="performance-item">
                  <div className="performance-value">23ms</div>
                  <div className="performance-label">Latence API</div>
                </div>
                <div className="performance-item">
                  <div className="performance-value">98%</div>
                  <div className="performance-label">Disponibilité</div>
                </div>
                <div className="performance-item">
                  <div className="performance-value">2.1GB</div>
                  <div className="performance-label">Mémoire utilisée</div>
                </div>
                <div className="performance-item">
                  <div className="performance-value">15.3k</div>
                  <div className="performance-label">Requêtes/h</div>
                </div>
                <div className="performance-item">
                  <div className="performance-value">1,247</div>
                  <div className="performance-label">Serveurs connectés</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modules':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Gestion des modules</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-download"></i>
                  Installer module
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-code"></i>
                  Créer un module
                </button>
              </div>
            </div>

            <div className="module-grid">
              {Object.entries(moduleStates).map(([key, isActive]) => (
                <div key={key} className="module-card">
                  <div className="module-header">
                    <h3>
                      <i className={
                        key === 'welcome' ? 'fas fa-hand-wave' :
                        key === 'moderation' ? 'fas fa-shield-alt' :
                        key === 'autoRole' ? 'fas fa-users-cog' :
                        key === 'music' ? 'fas fa-music' :
                        key === 'games' ? 'fas fa-gamepad' :
                        'fas fa-coins'
                      }></i>
                      {key === 'welcome' ? 'Messages de bienvenue' :
                       key === 'moderation' ? 'Modération automatique' :
                       key === 'autoRole' ? 'Attribution de rôles' :
                       key === 'music' ? 'Lecteur de musique' :
                       key === 'games' ? 'Mini-jeux' :
                       'Système économique'}
                    </h3>
                    <div className="module-toggle">
                      <div 
                        className={`toggle-switch ${isActive ? 'active' : ''}`}
                        onClick={() => toggleModule(key as keyof ModuleStates)}
                      ></div>
                    </div>
                  </div>
                  <div className="module-content">
                    <p>
                      {key === 'welcome' ? 'Accueillez les nouveaux membres avec des messages personnalisés' :
                       key === 'moderation' ? 'Protection automatique contre le spam et les contenus inappropriés' :
                       key === 'autoRole' ? 'Attribution automatique de rôles aux nouveaux membres' :
                       key === 'music' ? 'Diffusion de musique avec une interface intuitive' :
                       key === 'games' ? 'Mini-jeux interactifs pour divertir votre communauté' :
                       'Système de monnaie virtuelle avec boutique et classements'}
                    </p>
                    <div style={{marginTop: '1.5rem'}}>
                      <span style={{
                        color: isActive ? '#10b981' : '#ef4444', 
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        padding: '0.5rem 1rem',
                        background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '20px',
                        border: `1px solid ${isActive ? '#10b981' : '#ef4444'}`
                      }}>
                        {isActive ? '✓ Activé' : '✗ Désactivé'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'moderation':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Modération Avancée</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-ban"></i>
                  Bannir utilisateur
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-history"></i>
                  Historique sanctions
                </button>
              </div>
            </div>

            <div className="module-grid">
              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-gavel"></i> Actions rapides</h3>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Utilisateur à sanctionner</label>
                        <input type="text" className="config-input" placeholder="@Utilisateur#1234" />
                      </div>
                      <div className="config-item">
                        <label>Type de sanction</label>
                        <select className="config-select">
                          <option>Avertissement</option>
                          <option>Timeout 10min</option>
                          <option>Timeout 1h</option>
                          <option>Kick</option>
                          <option>Ban temporaire</option>
                          <option>Ban permanent</option>
                        </select>
                      </div>
                      <div className="config-item">
                        <label>Raison</label>
                        <input type="text" className="config-input" placeholder="Violation des règles" />
                      </div>
                    </div>
                    <button className="action-btn primary" style={{marginTop: '1rem'}}>
                      <i className="fas fa-hammer"></i>
                      Appliquer la sanction
                    </button>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-list-alt"></i> Sanctions récentes</h3>
                </div>
                <div className="module-content">
                  <div className="sanction-list">
                    <div className="sanction-item">
                      <div className="sanction-user">
                        <i className="fas fa-user"></i>
                        <span>TrollUser#9876</span>
                      </div>
                      <div className="sanction-type warning">Timeout 1h</div>
                      <div className="sanction-reason">Spam répétitif</div>
                      <div className="sanction-time">Il y a 30min</div>
                    </div>
                    <div className="sanction-item">
                      <div className="sanction-user">
                        <i className="fas fa-user"></i>
                        <span>BadUser#5432</span>
                      </div>
                      <div className="sanction-type error">Ban 7j</div>
                      <div className="sanction-reason">Contenu inapproprié</div>
                      <div className="sanction-time">Il y a 2h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'automod':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Auto-Modération IA</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-brain"></i>
                  Entraîner IA
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-shield-check"></i>
                  Test de protection
                </button>
              </div>
            </div>

            <div className="module-grid">
              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-robot"></i> Configuration IA</h3>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <h4><i className="fas fa-sliders-h"></i> Sensibilité de détection</h4>
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Détection de toxicité</label>
                        <input type="range" min="0" max="100" defaultValue="75" className="volume-slider" />
                        <span className="volume-value">75%</span>
                      </div>
                      <div className="config-item">
                        <label>Filtrage du spam</label>
                        <input type="range" min="0" max="100" defaultValue="90" className="volume-slider" />
                        <span className="volume-value">90%</span>
                      </div>
                      <div className="config-item">
                        <label>Détection de contenu NSFW</label>
                        <input type="range" min="0" max="100" defaultValue="95" className="volume-slider" />
                        <span className="volume-value">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-chart-pie"></i> Statistiques IA</h3>
                </div>
                <div className="module-content">
                  <div className="ai-stats">
                    <div className="stat-item">
                      <div className="stat-number">98.7%</div>
                      <div className="stat-label">Précision</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">1,247</div>
                      <div className="stat-label">Messages analysés/h</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">23</div>
                      <div className="stat-label">Menaces bloquées aujourd'hui</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Journal des événements</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-download"></i>
                  Exporter logs
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-filter"></i>
                  Filtrer
                </button>
              </div>
            </div>

            <div className="logs-container">
              <div className="logs-filters">
                <select className="config-select">
                  <option>Tous les événements</option>
                  <option>Modération</option>
                  <option>Connexions</option>
                  <option>Messages</option>
                  <option>Erreurs</option>
                </select>
                <input type="date" className="config-input" />
                <button className="action-btn">Rechercher</button>
              </div>

              <div className="logs-list">
                <div className="log-entry info">
                  <div className="log-time">15:42:03</div>
                  <div className="log-icon"><i className="fas fa-info-circle"></i></div>
                  <div className="log-message">Nouveau membre rejoint: UserPro#1234</div>
                  <div className="log-channel">#général</div>
                </div>
                <div className="log-entry success">
                  <div className="log-time">15:41:45</div>
                  <div className="log-icon"><i className="fas fa-check-circle"></i></div>
                  <div className="log-message">Rôle @Membre attribué automatiquement</div>
                  <div className="log-channel">Système</div>
                </div>
                <div className="log-entry warning">
                  <div className="log-time">15:40:22</div>
                  <div className="log-icon"><i className="fas fa-exclamation-triangle"></i></div>
                  <div className="log-message">Tentative de spam détectée et bloquée</div>
                  <div className="log-channel">#chat</div>
                </div>
                <div className="log-entry error">
                  <div className="log-time">15:39:10</div>
                  <div className="log-icon"><i className="fas fa-times-circle"></i></div>
                  <div className="log-message">Échec de connexion à l'API Discord</div>
                  <div className="log-channel">Système</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'welcome':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Messages de bienvenue avancés</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-eye"></i>
                  Prévisualiser
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-save"></i>
                  Sauvegarder
                </button>
              </div>
            </div>

            <div className="module-grid">
              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-edit"></i> Éditeur de message</h3>
                </div>
                <div className="module-content">
                  <div className="message-editor">
                    <div className="config-item">
                      <label>Titre du message</label>
                      <input type="text" className="config-input" defaultValue="🎉 Bienvenue sur notre serveur !" />
                    </div>
                    <div className="config-item">
                      <label>Description</label>
                      <textarea className="config-textarea" rows={4} defaultValue="Salut {user} ! Nous sommes ravis de t'accueillir dans notre communauté. N'hésite pas à consulter les règles dans #règles et à te présenter dans #présentations !"></textarea>
                    </div>
                    <div className="config-item">
                      <label>Couleur de l'embed</label>
                      <input type="color" className="config-input" defaultValue="#5865F2" />
                    </div>
                    <div className="config-item">
                      <label>Image de bienvenue</label>
                      <input type="url" className="config-input" placeholder="URL de l'image..." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-cog"></i> Configuration automatique</h3>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Canal de bienvenue</label>
                        <select className="config-select">
                          <option>#bienvenue</option>
                          <option>#général</option>
                          <option>#nouveaux-membres</option>
                        </select>
                      </div>
                      <div className="config-item">
                        <label>Rôle automatique</label>
                        <select className="config-select">
                          <option>@Membre</option>
                          <option>@Visiteur</option>
                          <option>Aucun</option>
                        </select>
                      </div>
                      <div className="config-item">
                        <label>Message privé</label>
                        <div className="toggle-switch active"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Gestion avancée des rôles</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-plus"></i>
                  Créer rôle
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-users"></i>
                  Attribution en masse
                </button>
              </div>
            </div>

            <div className="roles-grid">
              <div className="role-card admin">
                <div className="role-header">
                  <div className="role-color" style={{backgroundColor: '#e74c3c'}}></div>
                  <h3>Administrateur</h3>
                  <span className="role-members">3 membres</span>
                </div>
                <div className="role-permissions">
                  <span className="permission active">Gérer le serveur</span>
                  <span className="permission active">Gérer les membres</span>
                  <span className="permission active">Gérer les messages</span>
                </div>
                <div className="role-actions">
                  <button className="role-btn"><i className="fas fa-edit"></i></button>
                  <button className="role-btn"><i className="fas fa-users"></i></button>
                  <button className="role-btn danger"><i className="fas fa-trash"></i></button>
                </div>
              </div>

              <div className="role-card moderator">
                <div className="role-header">
                  <div className="role-color" style={{backgroundColor: '#f39c12'}}></div>
                  <h3>Modérateur</h3>
                  <span className="role-members">8 membres</span>
                </div>
                <div className="role-permissions">
                  <span className="permission active">Gérer les messages</span>
                  <span className="permission active">Timeout membres</span>
                  <span className="permission">Gérer le serveur</span>
                </div>
                <div className="role-actions">
                  <button className="role-btn"><i className="fas fa-edit"></i></button>
                  <button className="role-btn"><i className="fas fa-users"></i></button>
                  <button className="role-btn danger"><i className="fas fa-trash"></i></button>
                </div>
              </div>

              <div className="role-card member">
                <div className="role-header">
                  <div className="role-color" style={{backgroundColor: '#3498db'}}></div>
                  <h3>Membre</h3>
                  <span className="role-members">247 membres</span>
                </div>
                <div className="role-permissions">
                  <span className="permission active">Envoyer des messages</span>
                  <span className="permission active">Lire l'historique</span>
                  <span className="permission">Gérer les messages</span>
                </div>
                <div className="role-actions">
                  <button className="role-btn"><i className="fas fa-edit"></i></button>
                  <button className="role-btn"><i className="fas fa-users"></i></button>
                  <button className="role-btn danger"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'channels':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Gestion des salons</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-plus"></i>
                  Créer salon
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-copy"></i>
                  Cloner salon
                </button>
              </div>
            </div>

            <div className="channels-container">
              <div className="channel-category">
                <h3><i className="fas fa-folder"></i> GÉNÉRAL</h3>
                <div className="channel-list">
                  <div className="channel-item text">
                    <i className="fas fa-hashtag"></i>
                    <span>général</span>
                    <div className="channel-actions">
                      <button><i className="fas fa-cog"></i></button>
                      <button><i className="fas fa-copy"></i></button>
                      <button><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                  <div className="channel-item text">
                    <i className="fas fa-hashtag"></i>
                    <span>annonces</span>
                    <div className="channel-actions">
                      <button><i className="fas fa-cog"></i></button>
                      <button><i className="fas fa-copy"></i></button>
                      <button><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="channel-category">
                <h3><i className="fas fa-folder"></i> VOCAL</h3>
                <div className="channel-list">
                  <div className="channel-item voice">
                    <i className="fas fa-volume-up"></i>
                    <span>Salon vocal général</span>
                    <span className="channel-count">3/∞</span>
                    <div className="channel-actions">
                      <button><i className="fas fa-cog"></i></button>
                      <button><i className="fas fa-copy"></i></button>
                      <button><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'economy':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Système économique complet</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-store"></i>
                  Gérer boutique
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-trophy"></i>
                  Classements
                </button>
              </div>
            </div>

            <div className="module-grid">
              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-coins"></i> Configuration monétaire</h3>
                </div>
                <div className="module-content">
                  <div className="config-section">
                    <div className="config-grid">
                      <div className="config-item">
                        <label>Nom de la monnaie</label>
                        <input type="text" className="config-input" defaultValue="AidoCoins" />
                      </div>
                      <div className="config-item">
                        <label>Symbole</label>
                        <input type="text" className="config-input" defaultValue="🪙" />
                      </div>
                      <div className="config-item">
                        <label>Gains par message</label>
                        <input type="number" className="config-input" defaultValue="5" />
                      </div>
                      <div className="config-item">
                        <label>Bonus quotidien</label>
                        <input type="number" className="config-input" defaultValue="100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module-card">
                <div className="module-header">
                  <h3><i className="fas fa-crown"></i> Top membres les plus riches</h3>
                </div>
                <div className="module-content">
                  <div className="leaderboard">
                    <div className="leaderboard-item gold">
                      <span className="position">1</span>
                      <span className="username">RichUser#1234</span>
                      <span className="amount">15,847 🪙</span>
                    </div>
                    <div className="leaderboard-item silver">
                      <span className="position">2</span>
                      <span className="username">MoneyMaker#5678</span>
                      <span className="amount">12,453 🪙</span>
                    </div>
                    <div className="leaderboard-item bronze">
                      <span className="position">3</span>
                      <span className="username">CoinCollector#9012</span>
                      <span className="amount">9,876 🪙</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Lecteur de musique premium</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-list"></i>
                  Playlist
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-headphones"></i>
                  Se connecter
                </button>
              </div>
            </div>

            <div className="music-player">
              <div className="now-playing">
                <div className="track-info">
                  <div className="track-thumbnail">
                    <i className="fas fa-music"></i>
                  </div>
                  <div className="track-details">
                    <h3>Imagine Dragons - Believer</h3>
                    <p>Evolve • 2017</p>
                  </div>
                </div>
                <div className="player-controls">
                  <button className="control-btn"><i className="fas fa-step-backward"></i></button>
                  <button className="control-btn play"><i className="fas fa-play"></i></button>
                  <button className="control-btn"><i className="fas fa-step-forward"></i></button>
                  <button className="control-btn"><i className="fas fa-random"></i></button>
                  <button className="control-btn"><i className="fas fa-redo"></i></button>
                </div>
                <div className="volume-control">
                  <i className="fas fa-volume-up"></i>
                  <input type="range" min="0" max="100" defaultValue="75" className="volume-slider" />
                  <span>75%</span>
                </div>
              </div>

              <div className="queue-section">
                <h4><i className="fas fa-list-ol"></i> File d'attente (3 titres)</h4>
                <div className="queue-list">
                  <div className="queue-item">
                    <span className="queue-position">1</span>
                    <div className="queue-info">
                      <span className="queue-title">OneRepublic - Counting Stars</span>
                      <span className="queue-duration">4:17</span>
                    </div>
                    <button className="queue-remove"><i className="fas fa-times"></i></button>
                  </div>
                  <div className="queue-item">
                    <span className="queue-position">2</span>
                    <div className="queue-info">
                      <span className="queue-title">The Chainsmokers - Closer</span>
                      <span className="queue-duration">4:05</span>
                    </div>
                    <button className="queue-remove"><i className="fas fa-times"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'games':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Mini-jeux interactifs</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-trophy"></i>
                  Scores
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-plus"></i>
                  Nouveau jeu
                </button>
              </div>
            </div>

            <div className="games-grid">
              <div className="game-card">
                <div className="game-icon">
                  <i className="fas fa-dice"></i>
                </div>
                <h3>Dés magiques</h3>
                <p>Lance les dés et tente ta chance ! Gagne des AidoCoins selon le résultat.</p>
                <button className="game-btn">
                  <i className="fas fa-play"></i>
                  Jouer
                </button>
              </div>

              <div className="game-card">
                <div className="game-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <h3>Quiz Discord</h3>
                <p>Teste tes connaissances sur Discord et la communauté !</p>
                <button className="game-btn">
                  <i className="fas fa-play"></i>
                  Commencer
                </button>
              </div>

              <div className="game-card">
                <div className="game-icon">
                  <i className="fas fa-coins"></i>
                </div>
                <h3>Machine à sous</h3>
                <p>Mise tes AidoCoins et tente de décrocher le jackpot !</p>
                <button className="game-btn">
                  <i className="fas fa-play"></i>
                  Miser
                </button>
              </div>

              <div className="game-card">
                <div className="game-icon">
                  <i className="fas fa-puzzle-piece"></i>
                </div>
                <h3>Énigmes quotidiennes</h3>
                <p>Résous l'énigme du jour pour gagner des récompenses exclusives.</p>
                <button className="game-btn">
                  <i className="fas fa-play"></i>
                  Résoudre
                </button>
              </div>
            </div>
          </div>
        );

      case 'tickets':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Système de tickets professionnel</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-plus"></i>
                  Créer ticket
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-archive"></i>
                  Archives
                </button>
              </div>
            </div>

            <div className="tickets-overview">
              <div className="ticket-stats">
                <div className="stat-box open">
                  <i className="fas fa-ticket-alt"></i>
                  <div>
                    <span className="stat-number">12</span>
                    <span className="stat-label">Tickets ouverts</span>
                  </div>
                </div>
                <div className="stat-box pending">
                  <i className="fas fa-clock"></i>
                  <div>
                    <span className="stat-number">5</span>
                    <span className="stat-label">En attente</span>
                  </div>
                </div>
                <div className="stat-box closed">
                  <i className="fas fa-check"></i>
                  <div>
                    <span className="stat-number">247</span>
                    <span className="stat-label">Fermés aujourd'hui</span>
                  </div>
                </div>
              </div>

              <div className="tickets-list">
                <div className="ticket-item priority-high">
                  <div className="ticket-id">#001</div>
                  <div className="ticket-info">
                    <h4>Problème de permissions</h4>
                    <p>Créé par UserPro#1234 • Il y a 30min</p>
                  </div>
                  <div className="ticket-status open">Ouvert</div>
                  <div className="ticket-actions">
                    <button><i className="fas fa-eye"></i></button>
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-times"></i></button>
                  </div>
                </div>

                <div className="ticket-item priority-medium">
                  <div className="ticket-id">#002</div>
                  <div className="ticket-info">
                    <h4>Question sur les rôles</h4>
                    <p>Créé par NewUser#5678 • Il y a 1h</p>
                  </div>
                  <div className="ticket-status pending">En cours</div>
                  <div className="ticket-actions">
                    <button><i className="fas fa-eye"></i></button>
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-times"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Analytiques avancées</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-download"></i>
                  Exporter rapport
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-calendar"></i>
                  Période personnalisée
                </button>
              </div>
            </div>

            <div className="analytics-dashboard">
              <div className="analytics-cards">
                <div className="analytics-card">
                  <div className="card-header">
                    <h3>Activité du serveur</h3>
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="card-value">
                    <span className="big-number">+23%</span>
                    <span className="trend positive">↗ Cette semaine</span>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="card-header">
                    <h3>Nouveaux membres</h3>
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="card-value">
                    <span className="big-number">47</span>
                    <span className="trend positive">+12 vs hier</span>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="card-header">
                    <h3>Messages/jour</h3>
                    <i className="fas fa-comments"></i>
                  </div>
                  <div className="card-value">
                    <span className="big-number">1,847</span>
                    <span className="trend neutral">= Stable</span>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="card-header">
                    <h3>Taux de rétention</h3>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="card-value">
                    <span className="big-number">89%</span>
                    <span className="trend positive">+5% ce mois</span>
                  </div>
                </div>
              </div>

              <div className="charts-section">
                <div className="chart-container">
                  <h4>Activité des 7 derniers jours</h4>
                  <div className="chart-placeholder">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '45%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                    <div className="chart-bar" style={{height: '55%'}}></div>
                    <div className="chart-bar" style={{height: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">Paramètres du bot</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-sync-alt"></i>
                  Redémarrer bot
                </button>
                <button className="action-btn primary">
                  <i className="fas fa-save"></i>
                  Sauvegarder tout
                </button>
              </div>
            </div>

            <div className="settings-sections">
              <div className="settings-section">
                <h3><i className="fas fa-cog"></i> Configuration générale</h3>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Préfixe des commandes</label>
                    <input type="text" className="config-input" defaultValue="!" />
                  </div>
                  <div className="setting-item">
                    <label>Langue du bot</label>
                    <select className="config-select">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Timezone</label>
                    <select className="config-select">
                      <option>Europe/Paris</option>
                      <option>UTC</option>
                      <option>America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3><i className="fas fa-shield-alt"></i> Sécurité</h3>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Mode développeur</label>
                    <div className="toggle-switch"></div>
                  </div>
                  <div className="setting-item">
                    <label>Logs détaillés</label>
                    <div className="toggle-switch active"></div>
                  </div>
                  <div className="setting-item">
                    <label>Authentification 2FA</label>
                    <div className="toggle-switch active"></div>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3><i className="fas fa-bell"></i> Notifications</h3>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Alertes d'erreur</label>
                    <div className="toggle-switch active"></div>
                  </div>
                  <div className="setting-item">
                    <label>Rapports quotidiens</label>
                    <div className="toggle-switch active"></div>
                  </div>
                  <div className="setting-item">
                    <label>Notifications push</label>
                    <div className="toggle-switch"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="aidobot-content">
            <div className="aidobot-header">
              <h1 className="aidobot-title">{menuItems.find(item => item.id === activeModule)?.label || 'Module'}</h1>
              <div className="aidobot-actions">
                <button className="action-btn">
                  <i className="fas fa-cog"></i>
                  Configurer
                </button>
              </div>
            </div>
            <div className="module-content">
              <p>Cette section est entièrement fonctionnelle ! Explorez les différents modules via le menu latéral.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="aidobot-panel">
      {renderSidebar()}
      {renderContent()}
    </div>
  );
};
