import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-resume",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./resume.component.html",
  styleUrl: "./resume.component.css",
})
export class ResumeComponent implements OnInit {
  experiences: any[] = [];
  education: any[] = [];
  loading = signal(true);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.api.getExperience().subscribe({
      next: (data) => {
        this.experiences = data;
        this.api.getEducation().subscribe({
          next: (edu) => {
            this.education = edu;
            setTimeout(() => this.loading.set(false));
          },
          error: () => setTimeout(() => this.loading.set(false)),
        });
      },
      error: () => setTimeout(() => this.loading.set(false)),
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
}
