import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {BlogPostService} from "../services/blog-post.service";
import {BlogPost} from "../models/blog-post.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MarkdownComponent} from "ngx-markdown";
import {CategoryService} from "../../category/services/category.service";
import {Category} from "../../category/models/category.model";
import {UpdateBlogPost} from "../models/update-blog-post.model";

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    FormsModule,
    MarkdownComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy{

  id: string | null = null;
  model?: BlogPost;
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router
  )
  {
  }

  ngOnInit() {

    this.categories$ = this.categoryService.getAllCategories()

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost from API
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          })
        }

      }
    })
    // console.log(this.model)
  }
  onFormSubmit() {
    // Convert this model to Request Object
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        FeaturedImageUrl: this.model.FeaturedImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      }
    }

    // @ts-ignore
    this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
  }
}
