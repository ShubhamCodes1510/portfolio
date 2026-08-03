import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Blogs</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Blog
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Blog</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" [(ngModel)]="formData.title" placeholder="Title" class="form-input">
            <input type="text" [(ngModel)]="formData.slug" placeholder="Slug" class="form-input">
            <input type="text" [(ngModel)]="formData.category" placeholder="Category" class="form-input">
            <input type="text" [(ngModel)]="formData.imageUrl" placeholder="Image URL" class="form-input">
          </div>
          <div class="mt-4">
            <textarea [(ngModel)]="formData.summary" placeholder="Summary" rows="2" class="form-input"></textarea>
          </div>
          <div class="mt-4">
            <textarea [(ngModel)]="formData.content" placeholder="Content (Markdown)" rows="8" class="form-input"></textarea>
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveBlog()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (blog of blogs(); track blog.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <img [src]="blog.imageUrl || 'https://placehold.co/400x200'" 
              class="w-full h-40 object-cover rounded-lg mb-4">
            <h3 class="font-semibold text-lg mb-1 text-slate-800 dark:text-white">{{ blog.title }}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-2">{{ blog.category }}</p>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{{ blog.summary }}</p>
            <div class="flex gap-2">
              <button (click)="editBlog(blog)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button (click)="deleteBlog(blog.id)" class="text-red-500 hover:text-red-600">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminBlogsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  blogs = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.http.get<any[]>('/api/admin/blogs', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.blogs.set(data),
        error: (err) => console.error('Failed to load blogs', err)
      });
  }

  saveBlog() {
    const request = this.editingId() 
      ? this.http.put(`/api/admin/blogs/${this.editingId()}`, this.formData, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/blogs', this.formData, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadBlogs(); this.cancelForm(); },
      error: (err) => console.error('Failed to save blog', err)
    });
  }

  editBlog(blog: any) {
    this.formData = { ...blog };
    this.editingId.set(blog.id);
    this.showForm.set(true);
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/blogs/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadBlogs(),
          error: (err) => console.error('Failed to delete blog', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
