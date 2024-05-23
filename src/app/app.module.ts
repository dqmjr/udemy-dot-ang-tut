import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutes} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {AddCategoryComponent} from "./features/category/add-category/add-category.component";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {CategoryListComponent} from "./features/category/category-list/category-list.component";



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [],
})
export class AppModule { }
