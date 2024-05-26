import { Component } from '@angular/core';
import {AddCategoryRequest} from "../../category/models/add-category-request.model";
import {AddBlogPost} from "../models/add-blog-post.model";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-blog-post',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css'
})
export class AddBlogPostComponent {

  model: AddBlogPost;

  constructor() {
    this.model = {
      title: '',
      urlHandle: '',
      shortDescription: '',
      content: '',
      featuredImage: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
    }
  }

  onFormSubmit() {
    console.log(this.model)
  }
}
