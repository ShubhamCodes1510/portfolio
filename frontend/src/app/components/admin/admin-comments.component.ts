import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-comments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Comments</h2>
        <div class="flex gap-2">
          <button (click)="showPending.set(true)" 
            [class.bg-indigo-500]="showPending()"
            [class.text-white]="showPending()"
            [class.bg-slate-200]="!showPending()"
            [class.dark:bg-slate-700]="!showPending()"
            class="px-4 py-2 rounded-lg transition-colors">
            Pending ({{ pendingCount() }})
          </button>
          <button (click)="showPending.set(false)" 
            [class.bg-indigo-500]="!showPending()"
            [class.text-white]="!showPending()"
            [class.bg-slate-200]="showPending()"
            [class.dark:bg-slate-700]="showPending()"
            class="px-4 py-2 rounded-lg transition-colors">
            All Comments
          </button>
        </div>
      </div>

      <div class="space-y-4">
        @for (comment of comments(); track comment.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-semibold text-slate-800 dark:text-white">{{ comment.name }}</h3>
                <p class="text-indigo-500 text-sm">{{ comment.email }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  On: <span class="font-medium">{{ comment.blog?.title || 'Blog #' + comment.blogId }}</span>
                </p>
              </div>
              <div class="text-right">
                <span class="text-slate-400 dark:text-slate-500 text-sm">{{ comment.createdAt | date:'medium' }}</span>
                <div class="mt-2">
                  @if (comment.approved) {
                    <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded">Approved</span>
                  } @else {
                    <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs px-2 py-1 rounded">Pending</span>
                  }
                </div>
              </div>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mt-3">{{ comment.content }}</p>
            <div class="flex gap-2 mt-4">
              @if (!comment.approved) {
                <button (click)="approveComment(comment.id)" class="text-green-500 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  <i class="fa-solid fa-check mr-1"></i>Approve
                </button>
              }
              @if (comment.approved) {
                <button (click)="rejectComment(comment.id)" class="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm">
                  <i class="fa-solid fa-ban mr-1"></i>Reject
                </button>
              }
              <button (click)="deleteComment(comment.id)" class="text-red-500 hover:text-red-600 text-sm">
                <i class="fa-solid fa-trash mr-1"></i>Delete
              </button>
            </div>
          </div>
        } @empty {
          <p class="text-slate-500 dark:text-slate-400 text-center py-8">
            {{ showPending() ? 'No pending comments' : 'No comments yet' }}
          </p>
        }
      </div>
    </div>
  `
})
export class AdminCommentsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  comments = signal<any[]>([]);
  showPending = signal(true);
  pendingCount = signal(0);

  ngOnInit() {
    this.loadComments();
    this.loadStats();
  }

  loadComments() {
    const url = this.showPending() ? '/api/admin/comments/pending' : '/api/admin/comments';
    this.http.get<any[]>(url, this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.comments.set(data),
        error: (err) => console.error('Failed to load comments', err)
      });
  }

  loadStats() {
    this.http.get<any>('/api/admin/comments/stats', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.pendingCount.set(data.pendingComments || 0),
        error: (err) => console.error('Failed to load stats', err)
      });
  }

  approveComment(id: number) {
    this.http.post<any>(`/api/admin/comments/${id}/approve`, {}, this.auth.getAuthHeaders())
      .subscribe({
        next: () => { this.loadComments(); this.loadStats(); },
        error: (err) => console.error('Failed to approve comment', err)
      });
  }

  rejectComment(id: number) {
    this.http.post<any>(`/api/admin/comments/${id}/reject`, {}, this.auth.getAuthHeaders())
      .subscribe({
        next: () => { this.loadComments(); this.loadStats(); },
        error: (err) => console.error('Failed to reject comment', err)
      });
  }

  deleteComment(id: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.http.delete(`/api/admin/comments/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => { this.loadComments(); this.loadStats(); },
          error: (err) => console.error('Failed to delete comment', err)
        });
    }
  }
}