import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="blog-section" id="blog">
      <div class="container">
        <h2 class="section-title">Blog</h2>
        <p class="section-subtitle">Thoughts, tutorials, and insights</p>

        <!-- Blog List -->
        <div class="blog-list">
          <div class="blog-card" *ngFor="let blog of blogs()">
            <div class="blog-card-header">
              <h3 class="blog-title">{{ blog.title }}</h3>
              <div class="blog-meta">
                <span class="blog-date">{{ blog.createdAt | date:'mediumDate' }}</span>
                <span class="blog-views">{{ blog.viewCount }} views</span>
                <span class="blog-comments-count" *ngIf="blog.commentCount > 0">
                  {{ blog.commentCount }} comment{{ blog.commentCount !== 1 ? 's' : '' }}
                </span>
              </div>
            </div>
            <div class="blog-excerpt" [innerHTML]="blog.summary"></div>
            <div class="blog-actions">
              <button class="btn-read" (click)="viewBlog(blog)">Read More</button>
              <button class="btn-comments" (click)="toggleComments(blog.id)">
                {{ blog.showComments ? 'Hide Comments' : 'Show Comments' }}
              </button>
            </div>

            <!-- Comments Section -->
            <div class="comments-section" *ngIf="blog.showComments">
              <h4>Comments</h4>
              
              <!-- Comment Form -->
              <div class="comment-form">
                <h5>Leave a Comment</h5>
                <form (ngSubmit)="submitComment(blog.id)">
                  <div class="form-group">
                    <input type="text" placeholder="Your Name" [(ngModel)]="newComment.name" name="name" required>
                  </div>
                  <div class="form-group">
                    <input type="email" placeholder="Your Email" [(ngModel)]="newComment.email" name="email" required>
                  </div>
                  <div class="form-group">
                    <textarea placeholder="Your Comment" [(ngModel)]="newComment.content" name="content" rows="3" required></textarea>
                  </div>
                  <button type="submit" class="btn-submit">Post Comment</button>
                </form>
              </div>

              <!-- Comments List -->
              <div class="comments-list" *ngIf="blog.comments && blog.comments.length > 0">
                <div class="comment" *ngFor="let comment of blog.comments">
                  <div class="comment-header">
                    <strong>{{ comment.name }}</strong>
                    <span class="comment-date">{{ comment.createdAt | date:'short' }}</span>
                  </div>
                  <div class="comment-content">{{ comment.content }}</div>
                </div>
              </div>
              <div class="no-comments" *ngIf="!blog.comments || blog.comments.length === 0">
                No comments yet. Be the first to comment!
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div class="loading" *ngIf="loading()">
          Loading blogs...
        </div>

        <!-- No Blogs -->
        <div class="no-blogs" *ngIf="!loading() && blogs().length === 0">
          No blog posts yet. Check back soon!
        </div>
      </div>
    </section>
  `,
  styles: [`
    .blog-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }
    .blog-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
      background-size: cover;
      opacity: 0.1;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    .section-title {
      text-align: center;
      font-size: 3.5rem;
      margin-bottom: 15px;
      color: white;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .section-subtitle {
      text-align: center;
      color: rgba(255,255,255,0.9);
      margin-bottom: 70px;
      font-size: 1.2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }
    .blog-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 40px;
    }
    .blog-card {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 35px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid rgba(255,255,255,0.2);
      position: relative;
      overflow: hidden;
    }
    .blog-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
    .blog-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    }
    .blog-card-header {
      margin-bottom: 20px;
    }
    .blog-title {
      font-size: 1.8rem;
      margin: 0 0 15px 0;
      color: #1a202c;
      font-weight: 700;
      line-height: 1.3;
    }
    .blog-meta {
      display: flex;
      gap: 20px;
      font-size: 0.9rem;
      color: #718096;
    }
    .blog-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .blog-meta i {
      font-size: 0.8rem;
    }
    .blog-excerpt {
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 25px;
      font-size: 1.05rem;
    }
    .blog-actions {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
    }
    .btn-read, .btn-comments {
      padding: 12px 24px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
    }
    .btn-read {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    .btn-read:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    .btn-comments {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
    }
    .btn-comments:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }
    .comments-section {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid #e2e8f0;
      animation: fadeIn 0.5s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .comments-section h4 {
      margin-bottom: 20px;
      color: #1a202c;
      font-size: 1.4rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .comments-section h4 i {
      color: #667eea;
    }
    .comment-form {
      background: #f7fafc;
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 30px;
      border: 1px solid #e2e8f0;
    }
    .comment-form h5 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #2d3748;
      font-size: 1.2rem;
      font-weight: 600;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s;
      background: white;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .btn-submit {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(72, 187, 120, 0.6);
    }
    .comments-list {
      margin-top: 25px;
    }
    .comment {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;
    }
    .comment:hover {
      transform: translateX(5px);
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .comment-header strong {
      color: #2d3748;
      font-weight: 600;
      font-size: 1.05rem;
    }
    .comment-date {
      color: #a0aec0;
      font-size: 0.85rem;
    }
    .comment-content {
      color: #4a5568;
      line-height: 1.6;
      font-size: 1rem;
    }
    .no-comments, .no-blogs, .loading {
      text-align: center;
      color: #a0aec0;
      padding: 40px;
      font-style: italic;
      font-size: 1.1rem;
      background: rgba(255,255,255,0.8);
      border-radius: 15px;
      border: 2px dashed #e2e8f0;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
    .loading::after {
      content: '';
      width: 40px;
      height: 40px;
      border: 3px solid #e2e8f0;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .blog-section {
        padding: 60px 0;
      }
      .section-title {
        font-size: 2.5rem;
      }
      .blog-list {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .blog-card {
        padding: 25px;
      }
      .blog-actions {
        flex-direction: column;
      }
      .btn-read, .btn-comments {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  private apiService = inject(ApiService);
  
  blogs = signal<any[]>([]);
  loading = signal(true);
  newComment = {
    blogId: 0,
    name: '',
    email: '',
    content: ''
  };

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading.set(true);
    this.apiService.getBlogs().subscribe({
      next: (response) => {
        const blogs = response.content || response;
        // Initialize blog objects with comment properties
        const blogsWithComments = blogs.map((blog: any) => ({
          ...blog,
          showComments: false,
          comments: [],
          commentCount: 0
        }));
        this.blogs.set(blogsWithComments);
        this.loading.set(false);
        
        // Load comment counts for each blog
        blogsWithComments.forEach((blog: any) => {
          this.loadCommentCount(blog.id);
        });
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.loading.set(false);
      }
    });
  }

  loadCommentCount(blogId: number) {
    this.apiService.getBlogCommentCount(blogId).subscribe({
      next: (count) => {
        this.blogs.update(blogs => 
          blogs.map(blog => 
            blog.id === blogId ? { ...blog, commentCount: count } : blog
          )
        );
      },
      error: (err) => {
        console.error('Error loading comment count:', err);
      }
    });
  }

  loadComments(blogId: number) {
    this.apiService.getBlogComments(blogId).subscribe({
      next: (comments) => {
        this.blogs.update(blogs => 
          blogs.map(blog => 
            blog.id === blogId ? { ...blog, comments } : blog
          )
        );
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  toggleComments(blogId: number) {
    this.blogs.update(blogs => 
      blogs.map(blog => {
        if (blog.id === blogId) {
          const newShowState = !blog.showComments;
          if (newShowState && (!blog.comments || blog.comments.length === 0)) {
            this.loadComments(blogId);
          }
          return { ...blog, showComments: newShowState };
        }
        return blog;
      })
    );
  }

  submitComment(blogId: number) {
    if (!this.newComment.name.trim() || !this.newComment.email.trim() || !this.newComment.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const comment = {
      blogId: blogId,
      name: this.newComment.name,
      email: this.newComment.email,
      content: this.newComment.content
    };

    this.apiService.submitComment(comment).subscribe({
      next: (savedComment) => {
        // Add the new comment to the blog's comments list
        this.blogs.update(blogs => 
          blogs.map(blog => {
            if (blog.id === blogId) {
              const updatedComments = [...(blog.comments || []), savedComment];
              return { 
                ...blog, 
                comments: updatedComments,
                commentCount: updatedComments.length
              };
            }
            return blog;
          })
        );
        
        // Reset form
        this.newComment = {
          blogId: 0,
          name: '',
          email: '',
          content: ''
        };
        
        alert('Comment submitted successfully!');
      },
      error: (err) => {
        console.error('Error submitting comment:', err);
        alert('Error submitting comment. Please try again.');
      }
    });
  }

  viewBlog(blog: any) {
    // For now, just show the full content in place
    // In a real implementation, you might navigate to a blog detail page
    alert(`Viewing blog: ${blog.title}\n\n${blog.content}`);
  }
}