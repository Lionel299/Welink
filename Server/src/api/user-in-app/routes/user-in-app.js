'use strict';

/**
 * user-in-app router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::user-in-app.user-in-app');
