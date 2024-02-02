import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportExcelComponent } from 'src/app/import-excel/import-excel.component';
import { KendoModule } from './kendo.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { loginRequest, msalConfig, protectedResources } from './auth-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './common/shared.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';










export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources 
 * added to protectedResourceMap. For more info, visit: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(protectedResources.all_api.endpoint, protectedResources.all_api.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
    loginFailedRoute: '/error'
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ImportExcelComponent,
    MsalModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    Title
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
