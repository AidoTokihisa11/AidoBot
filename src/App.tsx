
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';
import FormTab from './FormTab';
import { RevolutionaryAidoBotPanel } from './RevolutionaryAidoBotPanel';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  type: 'circle' | 'square' | 'triangle';
}

interface UserSettings {
  darkMode: boolean;
  language: 'fr' | 'en';
  notifications: boolean;
  autoSave: boolean;
  theme: 'blue' | 'purple' | 'green' | 'orange';
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
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useState<UserSettings>({
    darkMode: false,
    language: 'fr',
    notifications: true,
    autoSave: true,
    theme: 'blue',
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
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Optimisation des performances avec useCallback pour éviter les re-renders
  const handleTabChange = useCallback((newTab: typeof tab) => {
    setTab(newTab);
    setShowUserDropdown(false);
  }, []);

  const handleSettingChange = useCallback((setting: keyof UserSettings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  }, []);

  // Animation optimisée 60/144 FPS
  const animate = useCallback(() => {
    if (canvasRef.current && !settings.performanceMode) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;
        return {
          ...particle,
          x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
          y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY
        };
      }));
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [particles, settings.performanceMode]);

  // Optimisation des particules
  const optimizedParticles = useMemo(() => {
    if (settings.performanceMode) return [];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 1,
      color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
      opacity: Math.random() * 0.4 + 0.2
    }));
  }, [settings.performanceMode]);

  useEffect(() => {
    setParticles(optimizedParticles);
  }, [optimizedParticles]);

  useEffect(() => {
    if (!settings.performanceMode) {
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [animate, settings.performanceMode]);

  useEffect(() => {
    // Génération des formes flottantes
    const newShapes: FloatingShape[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.5 + 0.1,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
    }));
    setFloatingShapes(newShapes);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Animation des particules
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.x > window.innerWidth || particle.x < 0 ? -particle.vx : particle.vx,
        vy: particle.y > window.innerHeight || particle.y < 0 ? -particle.vy : particle.vy
      })));
    };

    const particleInterval = setInterval(animateParticles, 16);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-sparkles"></i> Nouvelle Génération
          </div>
          <h1 className="hero-title">AidoBot Panel Revolution</h1>
          <p className="hero-subtitle">L'expérience ultime de gestion AidoBot avec des animations et effets révolutionnaires</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => handleTabChange('form')}>
              <i className="fas fa-play"></i>
              <span>Commencer</span>
            </button>
            <button className="btn-secondary" onClick={() => handleTabChange('analytics')}>
              <i className="fas fa-chart-line"></i>
              <span>Explorer</span>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="time-display">
              <div className="time">{currentTime.toLocaleTimeString()}</div>
              <div className="date">{currentTime.toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-header">
            <i className="fas fa-user"></i>
            <span>Utilisateur</span>
          </div>
          <div className="stat-content">
            <h3>1</h3>
            <p>Utilisateur actif</p>
          </div>
          <div className="stat-trend">
            <i className="fas fa-check-circle text-green"></i> Connecté
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <i className="fas fa-rocket"></i>
            <span>Performance</span>
          </div>
          <div className="stat-content">
            <h3>100%</h3>
            <p>Fonctionnalités</p>
          </div>
          <div className="stat-trend">
            <i className="fas fa-check-circle text-green"></i> Opérationnel
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <i className="fas fa-bolt"></i>
            <span>Vitesse</span>
          </div>
          <div className="stat-content">
            <h3>0.1s</h3>
            <p>Temps de réponse</p>
          </div>
          <div className="stat-trend">
            <i className="fas fa-trending-up text-green"></i> Optimisé
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Fonctionnalités Avancées</h2>
        <div className="feature-grid">
          <div className="feature-card" onClick={() => handleTabChange('form')}>
            <div className="feature-header">
              <i className="fas fa-clipboard-list"></i>
              <h3>Formulaires Intelligents</h3>
            </div>
            <p>Créez des formulaires avec IA intégrée et validation en temps réel</p>
            <div className="feature-tech">
              <span>AI</span>
              <span>Real-time</span>
            </div>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('analytics')}>
            <div className="feature-header">
              <i className="fas fa-chart-pie"></i>
              <h3>Analytics Prédictifs</h3>
            </div>
            <p>Analysez vos données avec des prédictions basées sur l'IA</p>
            <div className="feature-tech">
              <span>ML</span>
              <span>Insights</span>
            </div>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('community')}>
            <div className="feature-header">
              <i className="fas fa-users"></i>
              <h3>Communauté</h3>
            </div>
            <p>Connectez-vous avec d'autres utilisateurs et partagez vos créations</p>
            <div className="feature-tech">
              <span>Social</span>
              <span>Share</span>
            </div>
          </div>
          <div className="feature-card" onClick={() => handleTabChange('settings')}>
            <div className="feature-header">
              <i className="fas fa-sliders-h"></i>
              <h3>Paramètres Avancés</h3>
            </div>
            <p>Personnalisez chaque aspect de votre expérience</p>
            <div className="feature-tech">
              <span>Custom</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics">
      <div className="analytics-header">
        <h2><i className="fas fa-chart-line"></i> Analytics Dashboard</h2>
        <div className="analytics-filters">
          <button className="filter-btn active">Aujourd'hui</button>
          <button className="filter-btn">7 jours</button>
          <button className="filter-btn">30 jours</button>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-card">
          <h3><i className="fas fa-users"></i> Activité Utilisateurs</h3>
          <div className="chart-bar">
            <div className="bar" style={{height: '70%'}} data-value="70"></div>
            <div className="bar" style={{height: '45%'}} data-value="45"></div>
            <div className="bar" style={{height: '80%'}} data-value="80"></div>
            <div className="bar" style={{height: '60%'}} data-value="60"></div>
            <div className="bar" style={{height: '90%'}} data-value="90"></div>
            <div className="bar" style={{height: '75%'}} data-value="75"></div>
          </div>
          <div className="chart-labels">
            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span>
          </div>
        </div>
        <div className="chart-card">
          <h3><i className="fas fa-tachometer-alt"></i> Performance Globale</h3>
          <div className="performance-circle">
            <div className="circle-progress">
              <div className="circle-fill" style={{transform: 'rotate(295deg)'}}></div>
              <div className="circle-inner">
                <span className="perf-value">92%</span>
                <span className="perf-label">Excellent</span>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-card live-metrics">
          <h3><i className="fas fa-heartbeat"></i> Métriques Live</h3>
          <div className="metric-item">
            <span className="metric-label">CPU</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '45%'}}></div>
            </div>
            <span className="metric-value">45%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">RAM</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '62%'}}></div>
            </div>
            <span className="metric-value">62%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Réseau</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '28%'}}></div>
            </div>
            <span className="metric-value">28%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="community">
      <div className="community-header">
        <h2><i className="fas fa-users"></i> Communauté AidoBot</h2>
        <button className="btn-primary">
          <i className="fas fa-plus"></i> Rejoindre
        </button>
      </div>
      <div className="community-grid">
        <div className="community-card">
          <div className="user-avatar">
            <i className="fas fa-code"></i>
          </div>
          <h3>Développeurs</h3>
          <p>Rejoignez notre communauté de développeurs passionnés</p>
          <button className="join-btn">
            <i className="fas fa-sign-in-alt"></i> Rejoindre
          </button>
        </div>
        <div className="community-card">
          <div className="user-avatar">
            <i className="fas fa-palette"></i>
          </div>
          <h3>Designers</h3>
          <p>Partagez vos créations avec des designers talentueux</p>
          <button className="join-btn">
            <i className="fas fa-sign-in-alt"></i> Rejoindre
          </button>
        </div>
        <div className="community-card">
          <div className="user-avatar">
            <i className="fas fa-gamepad"></i>
          </div>
          <h3>Gamers</h3>
          <p>Connectez-vous avec des gamers du monde entier</p>
          <button className="join-btn">
            <i className="fas fa-sign-in-alt"></i> Rejoindre
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings">
      <div className="settings-header">
        <h2><i className="fas fa-cog"></i> Paramètres Avancés</h2>
        <button className="btn-primary">
          <i className="fas fa-save"></i> Sauvegarder
        </button>
      </div>
      <div className="settings-sections">
        <div className="settings-section">
          <h3><i className="fas fa-palette"></i> Apparence</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-moon"></i> Mode sombre
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-paint-brush"></i> Thème
              </label>
              <select
                className="setting-select"
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="blue">Bleu</option>
                <option value="purple">Violet</option>
                <option value="green">Vert</option>
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>
        </div>
        <div className="settings-section">
          <h3><i className="fas fa-language"></i> Langue et Région</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-globe"></i> Langue
              </label>
              <select
                className="setting-select"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
        <div className="settings-section">
          <h3><i className="fas fa-bell"></i> Notifications</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-bell"></i> Notifications push
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-save"></i> Sauvegarde auto
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="settings-section">
          <h3><i className="fas fa-tachometer-alt"></i> Performance</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <i className="fas fa-rocket"></i> Mode performance
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.performanceMode}
                  onChange={(e) => handleSettingChange('performanceMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user-crown"></i>
        </div>
        <div className="profile-info">
          <h2>{userProfile.name}</h2>
          <p className="profile-role">
            <i className="fas fa-shield-alt"></i> {userProfile.role}
          </p>
        </div>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <h3><i className="fas fa-info-circle"></i> Informations</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label><i className="fas fa-envelope"></i> Email</label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                className="profile-input"
              />
            </div>
            <div className="profile-item">
              <label><i className="fas fa-calendar"></i> Membre depuis</label>
              <span className="profile-value">{new Date(userProfile.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3><i className="fas fa-key"></i> Permissions</h3>
          <div className="permissions-grid">
            {userProfile.permissions.map((permission, index) => (
              <div key={index} className="permission-item">
                <i className="fas fa-check-circle"></i>
                <span>{permission}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="profile-section">
          <h3><i className="fas fa-shield-alt"></i> Sécurité</h3>
          <div className="security-actions">
            <button className="btn-secondary">
              <i className="fas fa-key"></i> Changer mot de passe
            </button>
            <button className="btn-secondary">
              <i className="fas fa-mobile-alt"></i> Authentification 2FA
            </button>
            <button className="btn-danger">
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-panel">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className="floating-shapes">
        {floatingShapes.map(shape => (
          <div
            key={shape.id}
            className={`floating-shape ${shape.type}`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              transform: `rotate(${shape.rotation}deg)`,
              animationDuration: `${shape.speed * 20}s`
            }}
          />
        ))}
      </div>
      
      <div className="mouse-glow" style={{
        left: mousePos.x - 150,
        top: mousePos.y - 150
      }}></div>

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
            <div className="user-avatar">
              <i className="fas fa-user-crown"></i>
            </div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrateur</span>
            </div>
            <i className="fas fa-chevron-down dropdown-arrow"></i>
          </div>
          {showUserDropdown && (
            <div className="user-dropdown">
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

      <main className="main-content">
        <div className="content-wrapper">
          {tab === 'dashboard' && renderDashboard()}
          {tab === 'form' && <FormTab />}
          {tab === 'aidobot' && <RevolutionaryAidoBotPanel />}
          {tab === 'analytics' && renderAnalytics()}
          {tab === 'community' && renderCommunity()}
          {tab === 'settings' && renderSettings()}
          {tab === 'profile' && renderProfile()}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AidoBot Panel Pro</h4>
            <p>La solution ultime pour gérer votre serveur avec AidoBot avec style et efficacité.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
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
          <div className="footer-section">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Partenaires</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 AidoBot Panel Pro. Tous droits réservés.</p>
            <div className="footer-links">
              <a href="#">Confidentialité</a>
              <a href="#">Conditions</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
