import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { isDevMode } from "@angular/core";
import { routes } from "./app.routes";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { StoreModule, provideStore } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { UserEffects } from "./domain/store/effects/user.effects";
import { reducers, metaReducers } from "./domain/store/reducers/app.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { REST_SERVICES } from "./adapters/rest/rest-services";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      NgbModalModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      ReactiveFormsModule,
      StoreModule.forRoot(reducers, {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode(), // Restrict extension to log-only mode
      }),
      EffectsModule.forRoot([UserEffects])
    ),
    ...REST_SERVICES,
  ],
};
