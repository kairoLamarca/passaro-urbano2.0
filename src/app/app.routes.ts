import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';

export const ROUTES: Routes = [
    { pathMatch: 'full', path: '', component: HomeComponent },
    { pathMatch: 'full', path: 'restaurantes', component: RestaurantesComponent },
    { pathMatch: 'full', path: 'diversao', component: DiversaoComponent },
    { pathMatch: 'full', path: 'oferta', component: HomeComponent },
    {
        pathMatch: 'full', path: 'oferta/:id', component: OfertaComponent,
        children: [//children significa que terá rotas filhas dentro da pagina
            { pathMatch: 'full', path: '', component: ComoUsarComponent },
            { pathMatch: 'full', path: 'como-usar', component: ComoUsarComponent },
            { pathMatch: 'full', path: 'onde-fica', component: OndeFicaComponent }
        ]
    },
    { pathMatch: 'full', path: 'ordem-compra', component: OrdemCompraComponent }
] 