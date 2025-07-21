#!/bin/bash
# Script de build et déploiement pour AidoBot Panel

echo "🚀 Début du build AidoBot Panel..."

# Nettoyage
echo "🧹 Nettoyage des fichiers précédents..."
rm -rf dist/

# Build du projet
echo "📦 Build du projet React + TypeScript..."
npm run build

# Vérification du build
if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    
    # Copie des fichiers de configuration serveur
    echo "📋 Copie des fichiers de configuration serveur..."
    cp public/.htaccess dist/ 2>/dev/null || echo "⚠️ .htaccess non trouvé"
    cp public/web.config dist/ 2>/dev/null || echo "⚠️ web.config non trouvé"
    
    # Affichage de la taille
    echo "📊 Taille du build:"
    du -sh dist/
    
    echo ""
    echo "🎉 Build terminé avec succès!"
    echo "📁 Fichiers prêts dans le dossier 'dist/'"
    echo ""
    echo "📋 Instructions de déploiement:"
    echo "1. Uploadez tout le contenu du dossier 'dist/' sur votre hébergeur"
    echo "2. Assurez-vous que le dossier racine pointe vers ces fichiers"
    echo "3. Vérifiez que .htaccess ou web.config est bien présent"
    echo ""
else
    echo "❌ Erreur lors du build!"
    exit 1
fi
