import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { AdminPanelComponent } from "./core/admin/admin-panel/admin-panel.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { RegisterComponent } from "./core/authentication/register/register.component";
import { ProfileComponent } from "./core/account/profile/profile.component";
import { LoginComponent } from "./core/authentication/login/login.component";

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