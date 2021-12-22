import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ObjectResolver } from '../../resolvers/object.resolver';
import { ModelDetailComponent } from '../../model-detail/model-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'list', component: DashboardComponent },
    { path: 'list/:id', component: ModelDetailComponent, resolve: { item: ObjectResolver } }
];
