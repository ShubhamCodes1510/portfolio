import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Testimonials</h2>
        <button (click)="showForm.set(true)" class="btn-primary">
          <i class="fa-solid fa-plus mr-2"></i>Add Testimonial
        </button>
      </div>

      @if (showForm()) {
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-slate-800 dark:text-white">{{ editingId() ? 'Edit' : 'Add' }} Testimonial</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" [(ngModel)]="formData.name" placeholder="Name" class="form-input">
            <input type="text" [(ngModel)]="formData.position" placeholder="Position" class="form-input">
            <input type="text" [(ngModel)]="formData.company" placeholder="Company" class="form-input">
            <input type="text" [(ngModel)]="formData.imageUrl" placeholder="Image URL" class="form-input">
          </div>
          <div class="mt-4">
            <textarea [(ngModel)]="formData.content" placeholder="Testimonial Content" rows="4" class="form-input"></textarea>
          </div>
          <div class="flex gap-4 mt-4">
            <button (click)="saveTestimonial()" class="btn-primary">Save</button>
            <button (click)="cancelForm()" class="btn-outline">Cancel</button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (testimonial of testimonials(); track testimonial.id) {
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p class="text-slate-600 dark:text-slate-400 mb-4">"{{ testimonial.content }}"</p>
            <div class="flex items-center gap-3">
              <img [src]="testimonial.imageUrl || 'https://placehold.co/100'" 
                class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold text-slate-800 dark:text-white">{{ testimonial.name }}</h4>
                <p class="text-slate-500 dark:text-slate-400 text-sm">{{ testimonial.position }}, {{ testimonial.company }}</p>
              </div>
            </div>
            <div class="flex gap-2 mt-4">
              <button (click)="editTestimonial(testimonial)" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button (click)="deleteTestimonial(testimonial.id)" class="text-red-500 hover:text-red-600">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminTestimonialsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  testimonials = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  formData: any = {};

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.http.get<any[]>('/api/admin/testimonials', this.auth.getAuthHeaders())
      .subscribe({
        next: (data) => this.testimonials.set(data),
        error: (err) => console.error('Failed to load testimonials', err)
      });
  }

  saveTestimonial() {
    const request = this.editingId() 
      ? this.http.put(`/api/admin/testimonials/${this.editingId()}`, this.formData, this.auth.getAuthHeaders())
      : this.http.post('/api/admin/testimonials', this.formData, this.auth.getAuthHeaders());
    
    request.subscribe({
      next: () => { this.loadTestimonials(); this.cancelForm(); },
      error: (err) => console.error('Failed to save testimonial', err)
    });
  }

  editTestimonial(testimonial: any) {
    this.formData = { ...testimonial };
    this.editingId.set(testimonial.id);
    this.showForm.set(true);
  }

  deleteTestimonial(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`/api/admin/testimonials/${id}`, this.auth.getAuthHeaders())
        .subscribe({
          next: () => this.loadTestimonials(),
          error: (err) => console.error('Failed to delete testimonial', err)
        });
    }
  }

  cancelForm() {
    this.formData = {};
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
