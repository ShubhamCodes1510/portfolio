import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AdminProjectsComponent } from './admin-projects.component';
import { AdminSkillsComponent } from './admin-skills.component';
import { AdminExperienceComponent } from './admin-experience.component';
import { AdminEducationComponent } from './admin-education.component';
import { AdminBlogsComponent } from './admin-blogs.component';
import { AdminTestimonialsComponent } from './admin-testimonials.component';
import { AdminMessagesComponent } from './admin-messages.component';
import { AdminAnalyticsComponent } from './admin-analytics.component';
import { AdminCommentsComponent } from './admin-comments.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    AdminProjectsComponent,
    AdminSkillsComponent,
    AdminExperienceComponent,
    AdminEducationComponent,
    AdminBlogsComponent,
    AdminTestimonialsComponent,
    AdminMessagesComponent,
    AdminAnalyticsComponent,
    AdminCommentsComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      @if (!isLoggedIn()) {
        <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
          <!-- Background decorative elements -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
          <div class="absolute top-10 left-10 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl dark:bg-blue-500/10"></div>
          <div class="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl dark:bg-purple-500/10"></div>
          
          <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-white/30 dark:border-slate-700/30 animate-fade-in">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <i class="fa-solid fa-lock text-white text-2xl"></i>
              </div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">Admin Portal</h2>
              <p class="text-slate-600 dark:text-slate-400 mt-2">Secure access to your portfolio dashboard</p>
            </div>
            
            <form (ngSubmit)="login()" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Username</label>
                <div class="relative">
                  <i class="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                  <input type="text" [(ngModel)]="username" name="username"
                    class="w-full pl-12 pr-4 py-3.5 bg-white/70 dark:bg-slate-700/70 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Enter admin username">
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div class="relative">
                  <i class="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                  <input type="password" [(ngModel)]="password" name="password"
                    class="w-full pl-12 pr-4 py-3.5 bg-white/70 dark:bg-slate-700/70 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Enter your password">
                </div>
              </div>
              
              @if (error()) {
                <div class="p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-xl animate-shake">
                  <p class="text-red-600 dark:text-red-400 text-sm font-medium flex items-center">
                    <i class="fa-solid fa-circle-exclamation mr-2"></i>{{ error() }}
                  </p>
                </div>
              }
              
              <button type="submit"
                class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Sign In to Dashboard</span>
              </button>
              
              <div class="text-center pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <p class="text-sm text-slate-500 dark:text-slate-500">
                  Enter your admin credentials to continue
                </p>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <nav class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-8 py-5 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <i class="fa-solid fa-chart-line text-white"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">Admin Dashboard</h1>
                <p class="text-sm text-slate-500 dark:text-slate-400">Manage your portfolio content</p>
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <a href="/"
                class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-xl hover:shadow-md transition-all duration-300 border border-blue-200/50 dark:border-blue-800/30">
                <i class="fa-solid fa-external-link-alt text-sm"></i>
                <span>View Live Site</span>
              </a>
              
              <button (click)="logout()"
                class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-600 dark:text-red-400 font-medium rounded-xl hover:shadow-md transition-all duration-300 border border-red-200/50 dark:border-red-800/30">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        <div class="flex">
          <aside class="w-72 min-h-screen bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 p-6">
            <div class="mb-8">
              <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Navigation</h3>
              <div class="space-y-2">
                @for (item of menuItems; track item.id) {
                  <button (click)="activeSection.set(item.id)"
                    class="w-full text-left px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 group"
                    [class.bg-gradient-to-r]="activeSection() === item.id"
                    [class.from-blue-500]="activeSection() === item.id"
                    [class.to-purple-600]="activeSection() === item.id"
                    [class.text-white]="activeSection() === item.id"
                    [class.shadow-lg]="activeSection() === item.id"
                    [class.transform]="activeSection() === item.id"
                    [class.-translate-x-1]="activeSection() === item.id"
                    [class.bg-slate-100/70]="activeSection() !== item.id"
                    [class.dark:bg-slate-700/50]="activeSection() !== item.id"
                    [class.text-slate-700]="activeSection() !== item.id"
                    [class.dark:text-slate-300]="activeSection() !== item.id"
                    [class.hover:bg-slate-200/70]="activeSection() !== item.id"
                    [class.dark:hover:bg-slate-700/70]="activeSection() !== item.id"
                    [class.hover:translate-x-1]="activeSection() !== item.id">
                    <i [class]="item.icon + ' text-lg'"
                       [class.text-white]="activeSection() === item.id"
                       [class.text-blue-500]="activeSection() !== item.id"
                       [class.dark:text-blue-400]="activeSection() !== item.id"></i>
                    <span class="font-medium">{{ item.label }}</span>
                    @if (activeSection() === item.id) {
                      <i class="fa-solid fa-chevron-right ml-auto text-white/70"></i>
                    }
                  </button>
                }
              </div>
            </div>
            
            <div class="mt-12 p-5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/30">
              <h4 class="font-semibold text-blue-700 dark:text-blue-400 mb-2">Quick Stats</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">Manage all your portfolio content from this centralized dashboard.</p>
            </div>
          </aside>

          <main class="flex-1 p-8 bg-gradient-to-b from-slate-50/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30">
            <div class="max-w-7xl mx-auto">
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  @for (item of menuItems; track item.id) {
                    @if (activeSection() === item.id) {
                      {{ item.label }} Management
                    }
                  }
                </h2>
                <p class="text-slate-600 dark:text-slate-400">Manage and organize your {{ activeSection() }} content</p>
              </div>
              
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 animate-fade-in">
                @switch (activeSection()) {
                  @case ('projects') {
                    <app-admin-projects />
                  }
                  @case ('skills') {
                    <app-admin-skills />
                  }
                  @case ('experience') {
                    <app-admin-experience />
                  }
                  @case ('education') {
                    <app-admin-education />
                  }
                  @case ('blogs') {
                    <app-admin-blogs />
                  }
                  @case ('testimonials') {
                    <app-admin-testimonials />
                  }
                  @case ('messages') {
                    <app-admin-messages />
                  }
                  @case ('comments') {
                    <app-admin-comments />
                  }
                  @case ('analytics') {
                    <app-admin-analytics />
                  }
                }
              </div>
            </div>
          </main>
        </div>
      }
    </div>
  `
})
export class AdminComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  username = '';
  password = '';
  isLoggedIn = signal(this.authService.isAuthenticated());
  error = signal('');
  activeSection = signal('projects');
  isDarkMode = signal(true);

  menuItems = [
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-folder' },
    { id: 'skills', label: 'Skills', icon: 'fa-solid fa-code' },
    { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
    { id: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap' },
    { id: 'blogs', label: 'Blogs', icon: 'fa-solid fa-blog' },
    { id: 'testimonials', label: 'Testimonials', icon: 'fa-solid fa-comment' },
    { id: 'messages', label: 'Messages', icon: 'fa-solid fa-envelope' },
    { id: 'comments', label: 'Comments', icon: 'fa-solid fa-comments' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-solid fa-chart-line' }
  ];

  login() {
    this.http.post<any>('/api/auth/login', { username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          this.isLoggedIn.set(true);
          this.error.set('');
        },
        error: () => {
          this.error.set('Invalid credentials');
        }
      });
  }

  logout() {
    this.authService.removeToken();
    this.isLoggedIn.set(false);
    this.username = '';
    this.password = '';
  }
}
