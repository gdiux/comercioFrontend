import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// GUARDS
import { AuthGuard } from '../guards/auth.guard';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './producto/producto.component';
import { AdminGuard } from '../guards/admin.guard';
import { CategoriasComponent } from './categorias/categorias.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';


// COMPONENTS

const routes: Routes = [
    
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children:
        [
          { path: '', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'clientes', component: ClientesComponent, canActivate: [AdminGuard], data:{ title: 'Clientes' } },
          { path: 'categorias', component: CategoriasComponent, canActivate: [AdminGuard], data:{ title: 'Categorias' } },
          { path: 'subcategorias', component: SubcategoriasComponent, canActivate: [AdminGuard], data:{ title: 'Subcategorias' } },
          { path: 'productos', component: ProductosComponent, canActivate: [AdminGuard], data:{ title: 'Productos' } },
          { path: 'producto/:id', component: ProductoComponent, canActivate: [AdminGuard], data:{ title: 'Producto' } },
          { path: 'perfil/:id', component: PerfilComponent, data:{ title: 'Perfil' } },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data:{ title: 'Usuarios' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
