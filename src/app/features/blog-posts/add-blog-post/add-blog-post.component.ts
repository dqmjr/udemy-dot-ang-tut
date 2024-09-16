import {Component, OnInit} from '@angular/core';
import {AddCategoryRequest} from "../../category/models/add-category-request.model";
import {AddBlogPost} from "../models/add-blog-post.model";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {BlogPostService} from "../services/blog-post.service";
import {Router} from "@angular/router";
import {MarkdownModule} from "ngx-markdown";
import {CategoryService} from "../../category/services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../category/models/category.model";

@Component({
  selector: 'app-add-blog-post',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MarkdownModule,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css'
})
export class AddBlogPostComponent implements OnInit{

  model: AddBlogPost;
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
              private router: Router,
              private categoryService: CategoryService,
  ) {
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

  ngOnInit(): void {
      this.categories$ = this.categoryService.getAllCategories();
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
