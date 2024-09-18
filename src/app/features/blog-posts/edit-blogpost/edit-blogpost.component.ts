import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {BlogPostService} from "../services/blog-post.service";
import {BlogPost} from "../models/blog-post.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MarkdownComponent} from "ngx-markdown";

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

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  )
  {
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost from API
        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
            }
          })
        }

      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onFormSubmit() {

  }
}
