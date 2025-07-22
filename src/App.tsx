
import { useState, useCallback, useEffect } from 'react';
import './App.css';
import FormTab from './FormTab';
import { ModernAidoBotPanel } from './ModernAidoBotPanel';

interface UserSettings {
  language: 'fr' | 'en';
  notifications: boolean;
  autoSave: boolean;
  performanceMode: boolean;
}

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  email: string;
  joinDate: string;
  permissions: string[];
}

function App() {
  const [tab, setTab] = useState<'dashboard' | 'form' | 'analytics' | 'settings' | 'community' | 'profile' | 'aidobot'>('dashboard');
  const [settings, setSettings] = useState<UserSettings>({
    language: 'fr',
    notifications: true,
    autoSave: true,
    performanceMode: false
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Admin',
    role: 'Administrateur',
    avatar: '',
    email: 'admin@discord-panel.com',
    joinDate: '2023-01-15',
    permissions: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_CHANNELS', 'MANAGE_ROLES']
  });
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Fonction pour changer l'avatar
  const handleAvatarChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Applique les paramètres
  useEffect(() => {
    // Applique le mode performance
    if (settings.performanceMode) {
      document.body.classList.add('performance-mode');
    } else {
      document.body.classList.remove('performance-mode');
    }
  }, [settings.performanceMode]);

  // Fonctions simplifiées
  const handleTabChange = useCallback((newTab: typeof tab) => {
    setTab(newTab);
    setShowUserDropdown(false);
  }, []);

  const handleSettingChange = useCallback((setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  }, []);

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-sparkles"></i> Découvrez la Magie
          </div>
          <h1 className="hero-title">Bienvenue dans l'univers AidoBot</h1>
          <p className="hero-subtitle">Votre compagnon Discord ultime vous attend ! Gérez votre serveur comme un pro avec des outils pensés pour vous simplifier la vie.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => handleTabChange('form')}>
              <i className="fas fa-rocket"></i>
              <span>C'est parti !</span>
            </button>
            <button className="btn-secondary" onClick={() => handleTabChange('analytics')}>
              <i className="fas fa-chart-line"></i>
              <span>Voir les stats</span>
            </button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-friends"></i>
          </div>
          <div className="stat-content">
            <h3>Connecté</h3>
            <p>Vous êtes en ligne</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-heart"></i>
          </div>
          <div className="stat-content">
            <h3>Parfait</h3>
            <p>Tout fonctionne</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-zap"></i>
          </div>
          <div className="stat-content">
            <h3>Rapide</h3>
            <p>Interface fluide</p>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Ce que vous allez adorer</h2>
        <div className="feature-grid">
          <div className="feature-card" onClick={() => handleTabChange('form')}>
            <div className="feature-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3>Formulaires Magiques</h3>
            <p>Créez des formulaires intelligents qui s'adaptent à vos besoins. Plus besoin de coder !</p>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('analytics')}>
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Statistiques Vivantes</h3>
            <p>Suivez l'activité de votre serveur en temps réel. Des graphiques qui vous parlent vraiment.</p>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('community')}>
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Communauté Chaleureuse</h3>
            <p>Rejoignez des milliers d'utilisateurs passionnés. Partagez vos créations et inspirez-vous.</p>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('settings')}>
            <div className="feature-icon">
              <i className="fas fa-palette"></i>
            </div>
            <h3>Personnalisation Totale</h3>
            <p>Adaptez l'interface à votre style. Couleurs, thèmes, raccourcis... tout est possible !</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics">
      <div className="analytics-header">
        <h2><i className="fas fa-chart-line"></i> Tableau de bord des statistiques</h2>
        <p className="analytics-subtitle">Découvrez comment votre serveur performe jour après jour</p>
        <div className="analytics-filters">
          <button className="filter-btn active">Aujourd'hui</button>
          <button className="filter-btn">Cette semaine</button>
          <button className="filter-btn">Ce mois</button>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-users"></i> Activité de votre communauté</h3>
            <p>Nombre de personnes actives</p>
          </div>
          <div className="chart-bar">
            <div className="bar" style={{height: '70%'}} data-value="70">
              <span className="bar-label">Lun</span>
              <span className="bar-value">70</span>
            </div>
            <div className="bar" style={{height: '45%'}} data-value="45">
              <span className="bar-label">Mar</span>
              <span className="bar-value">45</span>
            </div>
            <div className="bar" style={{height: '80%'}} data-value="80">
              <span className="bar-label">Mer</span>
              <span className="bar-value">80</span>
            </div>
            <div className="bar" style={{height: '60%'}} data-value="60">
              <span className="bar-label">Jeu</span>
              <span className="bar-value">60</span>
            </div>
            <div className="bar" style={{height: '90%'}} data-value="90">
              <span className="bar-label">Ven</span>
              <span className="bar-value">90</span>
            </div>
            <div className="bar" style={{height: '75%'}} data-value="75">
              <span className="bar-label">Sam</span>
              <span className="bar-value">75</span>
            </div>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-heart"></i> Satisfaction générale</h3>
            <p>Votre serveur fait plaisir !</p>
          </div>
          <div className="performance-circle">
            <div className="circle-progress">
              <div className="circle-fill" style={{transform: 'rotate(295deg)'}}></div>
              <div className="circle-inner">
                <span className="perf-value">92%</span>
                <span className="perf-label">Fantastique</span>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-card live-metrics">
          <div className="chart-header">
            <h3><i className="fas fa-activity"></i> État en temps réel</h3>
            <p>Tout roule parfaitement</p>
          </div>
          <div className="metric-item">
            <div className="metric-info">
              <span className="metric-label">🖥️ Serveur</span>
              <span className="metric-status">Excellent</span>
            </div>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '25%', backgroundColor: '#10b981'}}></div>
            </div>
            <span className="metric-value">25%</span>
          </div>
          <div className="metric-item">
            <div className="metric-info">
              <span className="metric-label">💾 Mémoire</span>
              <span className="metric-status">Fluide</span>
            </div>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '42%', backgroundColor: '#3b82f6'}}></div>
            </div>
            <span className="metric-value">42%</span>
          </div>
          <div className="metric-item">
            <div className="metric-info">
              <span className="metric-label">🌐 Connexion</span>
              <span className="metric-status">Rapide</span>
            </div>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '18%', backgroundColor: '#06b6d4'}}></div>
            </div>
            <span className="metric-value">18%</span>
          </div>
        </div>
      </div>
      <div className="insights-section">
        <h3>💡 Conseils personnalisés</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <i className="fas fa-trending-up"></i>
            <p>Votre serveur est plus actif le vendredi ! Pensez à organiser des événements ce jour-là.</p>
          </div>
          <div className="insight-card">
            <i className="fas fa-users"></i>
            <p>Les nouveaux membres rejoignent principalement le soir. Un message de bienvenue automatique serait parfait.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="community">
      <div className="community-header">
        <h2><i className="fas fa-heart"></i> Notre belle communauté</h2>
        <p className="community-subtitle">Rejoignez des milliers de passionnés comme vous !</p>
        <button className="btn-primary">
          <i className="fas fa-users"></i> Nous rejoindre
        </button>
      </div>
      <div className="community-stats">
        <div className="stat-bubble">
          <span className="stat-number">12,567</span>
          <span className="stat-label">Membres actifs</span>
        </div>
        <div className="stat-bubble">
          <span className="stat-number">2,341</span>
          <span className="stat-label">Serveurs connectés</span>
        </div>
        <div className="stat-bubble">
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>
      <div className="community-grid">
        <div className="community-card">
          <div className="card-bg"></div>
          <div className="user-avatar">
            <i className="fas fa-code"></i>
          </div>
          <h3>Développeurs créatifs</h3>
          <p>Créez des bots incroyables et partagez vos astuces avec des développeurs passionnés du monde entier.</p>
          <div className="member-count">
            <i className="fas fa-users"></i> 3,245 membres
          </div>
          <button className="join-btn">
            <i className="fas fa-plus"></i> Rejoindre
          </button>
        </div>
        <div className="community-card">
          <div className="card-bg"></div>
          <div className="user-avatar">
            <i className="fas fa-paint-brush"></i>
          </div>
          <h3>Designers talentueux</h3>
          <p>Partagez vos plus belles créations graphiques et inspirez-vous des œuvres d'artistes du digital.</p>
          <div className="member-count">
            <i className="fas fa-users"></i> 1,892 membres
          </div>
          <button className="join-btn">
            <i className="fas fa-plus"></i> Rejoindre
          </button>
        </div>
        <div className="community-card">
          <div className="card-bg"></div>
          <div className="user-avatar">
            <i className="fas fa-gamepad"></i>
          </div>
          <h3>Gamers passionnés</h3>
          <p>Organisez des tournois épiques et connectez-vous avec des joueurs qui partagent votre passion.</p>
          <div className="member-count">
            <i className="fas fa-users"></i> 7,430 membres
          </div>
          <button className="join-btn">
            <i className="fas fa-plus"></i> Rejoindre
          </button>
        </div>
      </div>
      <div className="community-testimonials">
        <h3>💬 Ce qu'ils en pensent</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"Cette communauté a transformé ma façon de créer des bots. L'entraide est incroyable !"</p>
            <span>- Sarah, développeuse</span>
          </div>
          <div className="testimonial">
            <p>"J'ai trouvé l'inspiration pour mes designs ici. Les feedbacks sont toujours constructifs."</p>
            <span>- Marc, designer</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="modern-settings">
      <div className="settings-hero">
        <div className="settings-hero-content">
          <div className="settings-hero-icon">
            <i className="fas fa-cog"></i>
          </div>
          <h1>Centre de contrôle</h1>
          <p>Personnalisez votre expérience Discord Panel selon vos préférences</p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <div className="nav-item active">
              <i className="fas fa-paint-brush"></i>
              <span>Interface</span>
            </div>
            <div className="nav-item">
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
            </div>
            <div className="nav-item">
              <i className="fas fa-shield-alt"></i>
              <span>Sécurité</span>
            </div>
            <div className="nav-item">
              <i className="fas fa-rocket"></i>
              <span>Performance</span>
            </div>
          </nav>
        </div>

        <div className="settings-content">
          <div className="setting-group active">
            <div className="group-header">
              <h2>Personnalisation de l'interface</h2>
              <p>Adaptez l'apparence à votre style</p>
            </div>
            
            <div className="setting-cards">
              <div className="setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon">
                    <i className="fas fa-language"></i>
                  </div>
                  <div className="setting-title">
                    <h3>Langue d'affichage</h3>
                    <p>Choisissez votre langue préférée</p>
                  </div>
                </div>
                <div className="setting-control">
                  <select
                    className="modern-select"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <option value="fr">🇫🇷 Français</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                </div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="setting-title">
                    <h3>Notifications push</h3>
                    <p>Restez informé des événements importants</p>
                  </div>
                </div>
                <div className="setting-control">
                  <label className="modern-toggle">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon">
                    <i className="fas fa-save"></i>
                  </div>
                  <div className="setting-title">
                    <h3>Sauvegarde automatique</h3>
                    <p>Enregistrement automatique des modifications</p>
                  </div>
                </div>
                <div className="setting-control">
                  <label className="modern-toggle">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <div className="setting-title">
                    <h3>Mode performance</h3>
                    <p>Optimise l'interface pour les appareils moins puissants</p>
                  </div>
                </div>
                <div className="setting-control">
                  <label className="modern-toggle">
                    <input
                      type="checkbox"
                      checked={settings.performanceMode}
                      onChange={(e) => handleSettingChange('performanceMode', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="action-btn primary">
                <i className="fas fa-save"></i>
                Enregistrer les modifications
              </button>
              <button className="action-btn secondary">
                <i className="fas fa-undo"></i>
                Restaurer par défaut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Avatar" className="avatar-image" />
            ) : (
              <i className="fas fa-user-crown"></i>
            )}
            <div className="avatar-ring"></div>
          </div>
          <label className="avatar-upload-btn" htmlFor="avatar-upload">
            <i className="fas fa-camera"></i>
            <span>Changer la photo</span>
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="profile-info">
          <h2>Salut {userProfile.name} ! 👋</h2>
          <p className="profile-role">
            <i className="fas fa-shield-alt"></i> {userProfile.role}
          </p>
          <div className="profile-badges">
            <span className="badge premium">🏆 Membre VIP</span>
            <span className="badge active">⭐ Actif</span>
            <span className="badge verified">✅ Vérifié</span>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">2,456</span>
              <span className="stat-label">Messages</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">128</span>
              <span className="stat-label">Jours actifs</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">95%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <div className="section-header">
            <h3><i className="fas fa-user-edit"></i> Informations personnelles</h3>
            <p className="section-description">Gérez vos informations de profil et préférences</p>
          </div>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-user"></i> Nom d'utilisateur</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="profile-input"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>
              <div className="form-group">
                <label><i className="fas fa-envelope"></i> Adresse email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="profile-input"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-shield-alt"></i> Rôle actuel</label>
                <div className="profile-value role-display">
                  <span className="role-badge">{userProfile.role}</span>
                  <small>Rôle assigné automatiquement</small>
                </div>
              </div>
              <div className="form-group">
                <label><i className="fas fa-calendar-alt"></i> Membre depuis</label>
                <div className="profile-value">
                  <span>{new Date(userProfile.joinDate).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <small>Il y a {Math.floor((Date.now() - new Date(userProfile.joinDate).getTime()) / (1000 * 60 * 60 * 24))} jours</small>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary">
                <i className="fas fa-save"></i>
                Sauvegarder les modifications
              </button>
              <button className="btn-secondary">
                <i className="fas fa-undo"></i>
                Annuler
              </button>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <div className="section-header">
            <h3><i className="fas fa-key"></i> Permissions et accès</h3>
            <p className="section-description">Voici tout ce que vous pouvez faire sur votre serveur</p>
          </div>
          <div className="permissions-grid">
            {userProfile.permissions.map((permission, index) => (
              <div key={index} className="permission-card">
                <div className="permission-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="permission-content">
                  <h4>{permission.replace('_', ' ').toLowerCase()}</h4>
                  <p className="permission-description">
                    {permission === 'ADMINISTRATOR' && 'Accès total à toutes les fonctionnalités'}
                    {permission === 'MANAGE_GUILD' && 'Gérer les paramètres du serveur'}
                    {permission === 'MANAGE_CHANNELS' && 'Créer et modifier les salons'}
                    {permission === 'MANAGE_ROLES' && 'Gérer les rôles des membres'}
                  </p>
                </div>
                <div className="permission-status">
                  <span className="status-active">Actif</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="profile-section">
          <div className="section-header">
            <h3><i className="fas fa-shield-check"></i> Sécurité et confidentialité</h3>
            <p className="section-description">Protégez votre compte avec nos outils de sécurité avancés</p>
          </div>
          <div className="security-grid">
            <div className="security-card">
              <div className="security-icon">
                <i className="fas fa-key"></i>
              </div>
              <div className="security-content">
                <h4>Mot de passe</h4>
                <p>Dernière modification il y a 3 mois</p>
                <button className="btn-secondary">
                  <i className="fas fa-edit"></i>
                  Modifier
                </button>
              </div>
            </div>
            <div className="security-card">
              <div className="security-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="security-content">
                <h4>Authentification à deux facteurs</h4>
                <p>Sécurisez votre compte en deux étapes</p>
                <button className="btn-primary">
                  <i className="fas fa-shield-check"></i>
                  Activer
                </button>
              </div>
            </div>
            <div className="security-card">
              <div className="security-icon">
                <i className="fas fa-history"></i>
              </div>
              <div className="security-content">
                <h4>Historique de connexion</h4>
                <p>Consultez vos dernières connexions</p>
                <button className="btn-secondary">
                  <i className="fas fa-eye"></i>
                  Voir l'historique
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section danger-zone">
          <div className="section-header">
            <h3><i className="fas fa-exclamation-triangle"></i> Zone de danger</h3>
            <p className="section-description">Actions irréversibles - Procédez avec prudence</p>
          </div>
          <div className="danger-actions">
            <button className="btn-danger">
              <i className="fas fa-sign-out-alt"></i>
              <div>
                <span>Se déconnecter</span>
                <small>Fermer cette session en toute sécurité</small>
              </div>
            </button>
            <button className="btn-danger">
              <i className="fas fa-user-times"></i>
              <div>
                <span>Supprimer le compte</span>
                <small>Cette action est définitive et irréversible</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-panel">
      <nav className="nav-bar">
        <div className="nav-logo">
          <div className="logo-container">
            <span className="logo-icon">
              <i className="fas fa-rocket"></i>
            </span>
            <div className="logo-text">
              <span className="logo-main">AidoBot</span>
              <span className="logo-sub">Panel Pro</span>
            </div>
          </div>
        </div>
        <div className="nav-links">
          <span className={tab === 'dashboard' ? 'active' : ''} onClick={() => handleTabChange('dashboard')}>
            <i className="fas fa-chart-line nav-icon"></i>
            Dashboard
          </span>
          <span className={tab === 'form' ? 'active' : ''} onClick={() => handleTabChange('form')}>
            <i className="fas fa-clipboard-list nav-icon"></i>
            Formulaires
          </span>
          <span className={tab === 'aidobot' ? 'active' : ''} onClick={() => handleTabChange('aidobot')}>
            <i className="fas fa-robot nav-icon"></i>
            Panel AidoBot
          </span>
          <span className={tab === 'analytics' ? 'active' : ''} onClick={() => handleTabChange('analytics')}>
            <i className="fas fa-chart-pie nav-icon"></i>
            Analytics
          </span>
          <span className={tab === 'community' ? 'active' : ''} onClick={() => handleTabChange('community')}>
            <i className="fas fa-users nav-icon"></i>
            Communauté
          </span>
          <span className={tab === 'settings' ? 'active' : ''} onClick={() => handleTabChange('settings')}>
            <i className="fas fa-cog nav-icon"></i>
            Paramètres
          </span>
        </div>
        <div className="nav-user">
          <div className="user-menu" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <div className="user-avatar" title="Cliquer pour changer l'avatar">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Avatar" className="nav-avatar-image" />
              ) : (
                <i className="fas fa-user-crown"></i>
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{userProfile.name}</span>
              <span className="user-role">{userProfile.role}</span>
            </div>
            <i className="fas fa-chevron-down dropdown-arrow"></i>
          </div>
          {showUserDropdown && (
            <div className="user-dropdown">
              <label className="dropdown-item avatar-change" htmlFor="nav-avatar-upload">
                <i className="fas fa-camera"></i>
                <span>Changer l'avatar</span>
              </label>
              <input
                type="file"
                id="nav-avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={() => handleTabChange('profile')}>
                <i className="fas fa-user"></i>
                <span>Mon Profil</span>
              </div>
              <div className="dropdown-item" onClick={() => handleTabChange('settings')}>
                <i className="fas fa-cog"></i>
                <span>Paramètres</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={() => console.log('Déconnexion')}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Déconnexion</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="content-wrapper">
        {tab === 'dashboard' && renderDashboard()}
        {tab === 'form' && <FormTab />}
        {tab === 'aidobot' && <ModernAidoBotPanel />}
        {tab === 'analytics' && renderAnalytics()}
        {tab === 'community' && renderCommunity()}
        {tab === 'settings' && renderSettings()}
        {tab === 'profile' && renderProfile()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AidoBot Panel Pro</h4>
            <p>La solution ultime pour gérer votre serveur Discord avec style et efficacité.</p>
          </div>
          <div className="footer-section">
            <h4>Fonctionnalités</h4>
            <ul>
              <li><a href="#">Formulaires Avancés</a></li>
              <li><a href="#">Analytics en Temps Réel</a></li>
              <li><a href="#">Communauté Intégrée</a></li>
              <li><a href="#">Paramètres Personnalisés</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Aide & Support</a></li>
              <li><a href="#">Communauté</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AidoBot Panel Pro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
