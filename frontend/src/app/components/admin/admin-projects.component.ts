import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Projects</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Project
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Project</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" [(ngModel)]="formData.title" placeholder="Project Title" class="form-input">
            <input type="text" [(ngModel)]="formData.description" placeholder="Description" class="form-input">
            <input type="text" [(ngModel)]="formData.category" placeholder="Category" class="form-input">
            <input type="text" [(ngModel)]="formData.imageUrl" placeholder="Image URL" class="form-input">
            <input type="text" [(ngModel)]="formData.liveUrl" placeholder="Live URL" class="form-input">
            <input type="text" [(ngModel)]="formData.githubUrl" placeholder="GitHub URL" class="form-input">
            <input type="text" [(ngModel)]="formData.technologies" placeholder="Technologies (comma separated)" class="form-input">
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveProject()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (project of projects(); track project.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <img [src]="project.imageUrl || 'https://placehold.co/400x200'" 
              class="w-full h-40 object-cover rounded-lg mb-4">
            <h3 class="font-semibold text-lg text-slate-800 dark:text-white">{{ project.title }}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-2">{{ project.category }}</p>
            <div class="flex gap-2 mb-4">
              @for (tech of (project.technologies || '').split(','); track tech) {
                @if (tech.trim()) {
                  <span class="tech-tag">{{ tech.trim() }}</span>
                }
              }
            </div>
            <div class="flex gap-2">
              <button (click)="editProject(project)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button (click)="deleteProject(project.id)" class="text-red-500 hover:text-red-600">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminProjectsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  projects = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<any[]>('/api/admin/projects', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.projects.set(data),
        error: (err) => console.error('Failed to load projects', err)
      });
  }

  saveProject() {
    const data = { ...this.formData, technologies: this.formData.technologies };
    const request = this.editingId() 
      ? this.http.put(`/api/admin/projects/${this.editingId()}`, data, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/projects', data, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadProjects(); this.cancelForm(); },
      error: (err) => console.error('Failed to save project', err)
    });
  }

  editProject(project: any) {
    this.formData = { ...project };
    this.editingId.set(project.id);
    this.showForm.set(true);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/projects/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadProjects(),
          error: (err) => console.error('Failed to delete project', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
