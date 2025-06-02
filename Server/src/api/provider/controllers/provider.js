'use strict';

/**
 * provider controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::provider.provider', () => ({ async findOne(ctx) {
    // Appelle la méthode par défaut pour récupérer le profil fournisseur
    const entity = await super.findOne(ctx);

    // Récupère les attributs du profil
    const profile = entity.data.attributes;

    if (profile.whatsappNumber) {
      // Génère le lien WhatsApp avec un message par défaut
      const baseUrl = 'https://wa.me/';
      const message = encodeURIComponent('Bonjour, je suis intéressé par votre service');
      const whatsappLink = `${baseUrl}${profile.whatsappNumber}?text=${message}`;

      // Ajoute ce lien dans la réponse
      entity.data.attributes.whatsappLink = whatsappLink;
    }

    return entity;
    
  }}));
 

