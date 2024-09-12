import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {BlogPostService} from "../services/blog-post.service";
import {Observable} from "rxjs";
import {BlogPost} from "../models/blog-post.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-blog-post-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})

export class BlogPostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private BlogPostService: BlogPostService) {

  }

  ngOnInit() {

    //get all blog posts from API
    this.blogPosts$ = this.BlogPostService.getAllBlogPosts()

  }

}
