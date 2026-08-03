import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Analytics</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <i class="fa-solid fa-eye text-indigo-500 text-xl"></i>
            </div>
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Total Visitors</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats().totalVisitors || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <i class="fa-solid fa-envelope text-green-500 text-xl"></i>
            </div>
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Messages</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats().totalMessages || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <i class="fa-solid fa-folder text-blue-500 text-xl"></i>
            </div>
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Projects</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats().totalProjects || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
              <i class="fa-solid fa-newspaper text-violet-500 text-xl"></i>
            </div>
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Blog Posts</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ stats().totalBlogs || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Recent Visitors</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700">
                <th class="text-left py-3 px-4 text-slate-600 dark:text-slate-400">IP Address</th>
                <th class="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Page</th>
                <th class="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Time</th>
              </tr>
            </thead>
            <tbody>
              @for (visitor of visitors(); track visitor.id) {
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <td class="py-3 px-4 text-slate-700 dark:text-slate-300">{{ visitor.ipAddress }}</td>
                  <td class="py-3 px-4 text-slate-700 dark:text-slate-300">{{ visitor.page }}</td>
                  <td class="py-3 px-4 text-slate-500 dark:text-slate-400">{{ visitor.timestamp | date:'medium' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminAnalyticsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  stats = signal<any>({});
  visitors = signal<any[]>([]);

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.http.get<any>('/api/admin/analytics', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => {
          this.stats.set(data);
          this.visitors.set(data.recentVisitors || []);
        },
        error: (err) => console.error('Failed to load analytics', err)
      });
  }
}
