import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import {  } from './admin/admin-panel/admin-panel.component';
import { 
    AdminPanelComponent,
    LoginComponent, 
    RegisterComponent,
    ProfileComponent
 } from './core';
import { AuthGuard } from './core';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard]  },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]  },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);