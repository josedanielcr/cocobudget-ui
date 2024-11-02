import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from "@azure/msal-angular";
import {environment} from '../environments/environment';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_susi',
    resetPassword: 'B2C_1_password_reset'
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://cocobudget.b2clogin.com/cocobudget.onmicrosoft.com/B2C_1_cocobudget_signin_signup',
    },
    resetPassword: {
      authority:
        'https://cocobudget.b2clogin.com/cocobudget.onmicrosoft.com/B2C_1_password_reset_flow',
    }
  },
  authorityDomain: 'cocobudget.b2clogin.com',
};

//configuration
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adb2cConfig.clientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority, //environment.msalConfig.auth.authority,
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.adb2cConfig.apiEndpointUrl,
    environment.adb2cConfig.scopeUrls
  );
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}
