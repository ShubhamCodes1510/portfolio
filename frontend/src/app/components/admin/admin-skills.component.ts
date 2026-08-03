import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Skills</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Skill
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Skill</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" [(ngModel)]="formData.name" placeholder="Skill Name" class="form-input">
            <input type="number" [(ngModel)]="formData.level" placeholder="Level (0-100)" class="form-input">
            <input type="text" [(ngModel)]="formData.category" placeholder="Category" class="form-input">
            <input type="text" [(ngModel)]="formData.icon" placeholder="Icon Class" class="form-input">
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveSkill()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (skill of skills(); track skill.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">{{ skill.name }}</h3>
              <span class="text-indigo-500">{{ skill.level }}%</span>
            </div>
            <div class="progress-bar mb-4">
              <div class="progress-fill" [style.width.%]="skill.level"></div>
            </div>
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-2">{{ skill.category }}</p>
            <div class="flex gap-2">
              <button (click)="editSkill(skill)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button (click)="deleteSkill(skill.id)" class="text-red-500 hover:text-red-600">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminSkillsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  skills = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.http.get<any[]>('/api/admin/skills', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.skills.set(data),
        error: (err) => console.error('Failed to load skills', err)
      });
  }

  saveSkill() {
    const request = this.editingId() 
      ? this.http.put(`/api/admin/skills/${this.editingId()}`, this.formData, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/skills', this.formData, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadSkills(); this.cancelForm(); },
      error: (err) => console.error('Failed to save skill', err)
    });
  }

  editSkill(skill: any) {
    this.formData = { ...skill };
    this.editingId.set(skill.id);
    this.showForm.set(true);
  }

  deleteSkill(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/skills/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadSkills(),
          error: (err) => console.error('Failed to delete skill', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
