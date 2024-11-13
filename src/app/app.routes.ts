import { Routes } from '@angular/router';

// ----- Refeencias Componentes ----- //
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [

    // ----- Configurar las rutas ----- //
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'labs',
        component: LabsComponent
    }
];
