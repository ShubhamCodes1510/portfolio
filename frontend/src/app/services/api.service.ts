import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api/public';

  constructor(private http: HttpClient) {}

  // Projects
  getProjects(category?: string): Observable<any[]> {
    const url = category ? `${this.baseUrl}/projects?category=${category}` : `${this.baseUrl}/projects`;
    return this.http.get<any[]>(url);
  }

  getFeaturedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects/featured`);
  }

  // Skills
  getSkills(category?: string): Observable<any[]> {
    const url = category ? `${this.baseUrl}/skills?category=${category}` : `${this.baseUrl}/skills`;
    return this.http.get<any[]>(url);
  }

  // Experience
  getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experience`);
  }

  // Education
  getEducation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/education`);
  }

  // Blogs
  getBlogs(page = 0, size = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs?page=${page}&size=${size}`);
  }

  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs/${slug}`);
  }

  // Comments
  getBlogComments(blogId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/blogs/${blogId}/comments`);
  }

  getBlogCommentCount(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/blogs/${blogId}/comments/count`);
  }

  submitComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, comment);
  }

  // Testimonials
  getTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/testimonials`);
  }

  // Contact
  submitContact(contact: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, contact);
  }

  // Newsletter
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/newsletter`, { email });
  }

  // Stats
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats`);
  }

  // Track Visitor
  trackVisitor(): void {
    this.http.post(`${this.baseUrl}/track`, {}).subscribe();
  }
}
