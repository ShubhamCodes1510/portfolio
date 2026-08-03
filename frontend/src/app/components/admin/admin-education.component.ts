import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Education</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Education
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Education</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" [(ngModel)]="formData.school" placeholder="Institution" class="form-input">
            <input type="text" [(ngModel)]="formData.degree" placeholder="Degree" class="form-input">
            <input type="text" [(ngModel)]="formData.field" placeholder="Field of Study" class="form-input">
            <input type="date" [(ngModel)]="formData.startDate" class="form-input">
            <input type="date" [(ngModel)]="formData.endDate" class="form-input">
          </div>
          <div class="mt-4">
            <textarea [(ngModel)]="formData.description" placeholder="Description" rows="3" class="form-input"></textarea>
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveEducation()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="space-y-4">
        @for (edu of education(); track edu.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-lg text-slate-800 dark:text-white">{{ edu.degree }}</h3>
                <p class="text-violet-500">{{ edu.school }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm">
                  {{ edu.field }} | {{ edu.startDate | date:'yyyy' }} - {{ edu.endDate ? (edu.endDate | date:'yyyy') : 'Present' }}
                </p>
              </div>
              <div class="flex gap-2">
                <button (click)="editEducation(edu)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button (click)="deleteEducation(edu.id)" class="text-red-500 hover:text-red-600">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminEducationComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  education = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadEducation();
  }

  loadEducation() {
    this.http.get<any[]>('/api/admin/education', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.education.set(data),
        error: (err) => console.error('Failed to load education', err)
      });
  }

  saveEducation() {
    const request = this.editingId() 
      ? this.http.put(`/api/admin/education/${this.editingId()}`, this.formData, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/education', this.formData, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadEducation(); this.cancelForm(); },
      error: (err) => console.error('Failed to save education', err)
    });
  }

  editEducation(edu: any) {
    this.formData = { ...edu };
    this.editingId.set(edu.id);
    this.showForm.set(true);
  }

  deleteEducation(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/education/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadEducation(),
          error: (err) => console.error('Failed to delete education', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
