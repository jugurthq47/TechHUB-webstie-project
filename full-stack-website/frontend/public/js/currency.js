// Currency Conversion Utilities
const CURRENCY_CONFIG = {
    // Exchange rate: 1 USD = 135.50 DZD (approximate)
    USD_TO_DZD: 250.50,
 
    // Format prices in Algerian Dinar
    formatDZD: function(priceInUSD) {
        const priceInDZD = priceInUSD * this.USD_TO_DZD;
        return new Intl.NumberFormat('fr-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(priceInDZD);
    },
 
    // Convert and format price
    convertPrice: function(priceInUSD) {
        return this.formatDZD(priceInUSD);
    },
 
    // Get currency symbol
    getCurrencySymbol: function() {
        return 'د.ج';
    },
 
    // Format with symbol (alternative)
    formatWithSymbol: function(priceInUSD) {
        const priceInDZD = priceInUSD * this.USD_TO_DZD;
        return `${this.getCurrencySymbol()}${Math.round(priceInDZD).toLocaleString('fr-DZ')}`;
    }
};
 
// Global function for easy access
window.convertToDZD = function(priceInUSD) {
    return CURRENCY_CONFIG.convertPrice(priceInUSD);
};
 
window.formatDZD = function(priceInUSD) {
    return CURRENCY_CONFIG.formatDZD(priceInUSD);
};