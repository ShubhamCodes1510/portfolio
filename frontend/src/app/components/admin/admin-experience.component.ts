import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Experience</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Experience
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Experience</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" [(ngModel)]="formData.company" placeholder="Company" class="form-input">
            <input type="text" [(ngModel)]="formData.role" placeholder="Position" class="form-input">
            <input type="text" [(ngModel)]="formData.location" placeholder="Location" class="form-input">
            <input type="date" [(ngModel)]="formData.startDate" class="form-input">
            <input type="date" [(ngModel)]="formData.endDate" placeholder="End Date (empty = current)" class="form-input">
          </div>
          <div class="mt-4">
            <textarea [(ngModel)]="formData.description" placeholder="Description" rows="3" class="form-input"></textarea>
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveExperience()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="space-y-4">
        @for (exp of experiences(); track exp.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-lg text-slate-800 dark:text-white">{{ exp.role }}</h3>
                <p class="text-indigo-500">{{ exp.company }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm">
                  {{ exp.startDate | date:'MMM yyyy' }} - {{ exp.endDate ? (exp.endDate | date:'MMM yyyy') : 'Present' }}
                </p>
                <p class="text-slate-500 dark:text-slate-400 text-sm">{{ exp.location }}</p>
              </div>
              <div class="flex gap-2">
                <button (click)="editExperience(exp)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button (click)="deleteExperience(exp.id)" class="text-red-500 hover:text-red-600">
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
export class AdminExperienceComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  experiences = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadExperience();
  }

  loadExperience() {
    this.http.get<any[]>('/api/admin/experience', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.experiences.set(data),
        error: (err) => console.error('Failed to load experience', err)
      });
  }

  saveExperience() {
    const request = this.editingId() 
      ? this.http.put(`/api/admin/experience/${this.editingId()}`, this.formData, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/experience', this.formData, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadExperience(); this.cancelForm(); },
      error: (err) => console.error('Failed to save experience', err)
    });
  }

  editExperience(exp: any) {
    this.formData = { ...exp };
    this.editingId.set(exp.id);
    this.showForm.set(true);
  }

  deleteExperience(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/experience/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadExperience(),
          error: (err) => console.error('Failed to delete experience', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
