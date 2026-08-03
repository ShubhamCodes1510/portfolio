import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Messages</h2>

      <div class="space-y-4">
        @for (msg of messages(); track msg.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-semibold text-slate-800 dark:text-white">{{ msg.name }}</h3>
                <p class="text-indigo-500 text-sm">{{ msg.email }}</p>
              </div>
              <span class="text-slate-400 dark:text-slate-500 text-sm">{{ msg.createdAt | date:'medium' }}</span>
            </div>
            <p class="text-slate-600 dark:text-slate-400">{{ msg.message }}</p>
            <div class="flex gap-2 mt-4">
              <a [href]="'mailto:' + msg.email" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">
                <i class="fa-solid fa-reply mr-1"></i>Reply
              </a>
              <button (click)="deleteMessage(msg.id)" class="text-red-500 hover:text-red-600 text-sm">
                <i class="fa-solid fa-trash mr-1"></i>Delete
              </button>
            </div>
          </div>
        } @empty {
          <p class="text-slate-500 dark:text-slate-400 text-center py-8">No messages yet</p>
        }
      </div>
    </div>
  `
})
export class AdminMessagesComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  messages = signal<any[]>([]);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>('/api/admin/contacts', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.messages.set(data),
        error: (err) => console.error('Failed to load messages', err)
      });
  }

  deleteMessage(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/contacts/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadMessages(),
          error: (err) => console.error('Failed to delete message', err)
        });
    }
  }
}
