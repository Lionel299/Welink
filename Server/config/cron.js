module.exports = {
  '0 1 * * 1': async ({ strapi }) => {
    // Cette tâche s'exécute chaque lundi à 1h du matin

    // Récupérer toutes les réservations validées
    const reservations = await strapi.entityService.findMany('api::reservation.reservation', {
      filters: { status: 'validee' },
      populate: ['provider', 'client'],
   });

    const now = new Date();
    const dateFin = new Date(reservations.dateFin);

if (isNaN(dateFin.getTime())) {
  console.error('dateFin invalide:', reservations.dateFin);
  return; // passe à la réservation suivante
}

    for (const reservation of reservations) {
      const diffTime = dateFin.getTime() - now.getTime(); // différence en millisecondes
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convertir en jours

       await strapi.entityService.create('api::notification.notification', {
         data: {
         user: reservation.provider.user.id, // destinataire
         title: 'Rappel contrat en cours',
         message: `Il vous reste ${diffDays} jour(s) avant la fin du contrat avec le client ${reservation.client.user.username}.`,
         isRead: false,
          },
            });
        // Tu peux aussi utiliser d’autres moyens de notification ici
      }
    }
  };

