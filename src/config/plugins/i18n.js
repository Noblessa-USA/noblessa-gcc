/**
 * Internationalization (i18n) Plugin Configuration
 * 
 * This configuration file sets up the i18n plugin for multilingual support.
 * It defines the supported languages and default language for the site.
 * 
 * Documentation: https://www.11ty.dev/docs/plugins/i18n/
 */

module.exports = {
    // Default fallback language (English)
    defaultLanguage: "en",
    
    // Error mode: what happens when a localized URL doesn't exist
    // Options: "strict" (throw error), "allow-fallback" (fallback to default), "never" (ignore)
    errorMode: "allow-fallback",
    
    // Custom filters for language codes (optional, for advanced use)
    // filters: {}
};
