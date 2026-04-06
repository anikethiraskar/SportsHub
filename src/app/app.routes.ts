import { Routes } from '@angular/router';
import { HomeFeatures } from './features/home/home-features/home-features';
import { HomeAboutus } from './features/home/home-aboutus/home-aboutus';
import { Home } from './features/home/home/home';
import { RegisterComponent } from './auth/register.component/register.component';
import { LoginComponent } from './auth/login.component/login.component';
import { ProductList } from './features/ecommerce/components/product-list/product-list';
import { SellerDashboard } from './features/ecommerce/components/seller-dashboard/seller-dashboard';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'features',component:HomeFeatures},
    {path:'aboutus',component:HomeAboutus},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'products',component:ProductList},
    {path:'add',component:SellerDashboard}
];
