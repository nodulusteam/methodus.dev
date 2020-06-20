import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'describe', pathMatch: 'full' },
            {
                path: 'describe',
                loadChildren: () => import('../modules/describe/describe.module').then(m => m.DescribeModule),
            },
       
            {
                path: 'editor',
                loadChildren: () => import('../modules/editor/editor.module').then(m => m.EditorModule),
            },
            { path: '**', redirectTo: '' }
        ],


    }
];
