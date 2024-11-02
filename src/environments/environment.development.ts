import {EnvironmentConfiguration} from '../app/configuration/EnvironmentConfiguration';

const serverUrl='https://apimanagementcocobudget.azure-api.net';

export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adb2cConfig: {
    clientId: '8a44802f-73fe-4a24-9bdf-256d93ee1ea7',
    readScopeUrl: 'https://cocobudget.onmicrosoft.com/api-management/read',
    writeScopeUrl: 'https://cocobudget.onmicrosoft.com/api-management/write',
    scopeUrls:[
      'https://cocobudget.onmicrosoft.com/api-management/read',
      'https://cocobudget.onmicrosoft.com/api-management/write'
    ],
    apiEndpointUrl: 'https://cocobudget.onmicrosoft.com/api-management'
  },
  cacheTimeInMinutes: 30,
  accountService: 'http://localhost:5063/api/',
  budgetService: 'http://localhost:5119/api/',
  transactionService: '',
  notificationService: ''
};
