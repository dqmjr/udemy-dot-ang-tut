import { Component } from '@angular/core';
import {AddCategoryRequest} from "../../category/models/add-category-request.model";
import {AddBlogPost} from "../models/add-blog-post.model";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {BlogPostService} from "../services/blog-post.service";
import {Router} from "@angular/router";

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

  constructor(private blogPostService: BlogPostService, private router: Router) {
    this.model = {
      title: '',
      urlHandle: '',
      shortDescription: '',
      content: '',
      FeaturedImageUrl: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
    }
  }

  onFormSubmit() {
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }
}
