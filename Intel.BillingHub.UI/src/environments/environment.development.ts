let production: boolean, environmentName: string, apiBaseUrl: string;

let path = document.location.href.toLowerCase();
let envMatch = path.match(/env=([^&#?]+)/);
let env = envMatch ? envMatch[1] : null;

if (env === "local" || path.indexOf('localhost') > -1 || path.indexOf('127.0.0.1') > -1) {
    production = false;
    environmentName = "local";
    apiBaseUrl = 'https://localhost:44382/api/';
}
else if (path.indexOf('-tst') > -1) {
    production = false;
    environmentName = "Test";
    apiBaseUrl = 'api/';
}
else if (path.indexOf('-pre') > -1) {
    production = false;
    environmentName = "Staging";
    apiBaseUrl = 'api/';
}
else {
    production = true;
    environmentName = "Production";
    apiBaseUrl = 'api/';
}


export const environment = {
    production: production,
    environmentName: environmentName,
    apiUrl: apiBaseUrl,
    version: '0.0.1',
    clientId: 'd644efce-47d5-4e6e-8a45-2d8264e22185',
    authority: 'https://login.microsoftonline.com/46c98d88-e344-4ed4-8496-4ed7712e255d'
};
