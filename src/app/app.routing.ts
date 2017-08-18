import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent, RegisterComponent } from './authentication/index';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AuthGuard } from './core/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard]  },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);