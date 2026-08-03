import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { GithubComponent } from './components/github/github.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    GithubComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent,
    BlogComponent
  ],
  template: `
    <app-navbar />
    <app-hero />
    <app-about />
    <app-skills />
    <app-projects />
    <app-github />
    <app-resume />
    <app-blog />
    <app-contact />
    <app-footer />
  `,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.checkReveal.bind(this));
      setTimeout(() => this.checkReveal(), 100);
    }
  }

  private checkReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  }
}
