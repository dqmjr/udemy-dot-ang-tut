import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CategoryListComponent} from "./features/category/category-list/category-list.component";
import {AddCategoryComponent} from "./features/category/add-category/add-category.component";

export const routes: Routes = [
  {
    path: 'admin/categories',
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
