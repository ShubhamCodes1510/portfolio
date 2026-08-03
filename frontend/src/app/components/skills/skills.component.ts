import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillCategories = [
    {
      name: 'Frontend',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'Angular', level: 90, icon: 'fab fa-angular' },
        { name: 'React', level: 85, icon: 'fab fa-react' },
        { name: 'TypeScript', level: 88, icon: 'fab fa-js' },
        { name: 'JavaScript', level: 90, icon: 'fab fa-js' },
        { name: 'HTML/CSS', level: 92, icon: 'fab fa-html5' },
        { name: 'Bootstrap', level: 88, icon: 'fab fa-bootstrap' }
      ]
    },
    {
      name: 'Backend',
      icon: 'fas fa-server',
      skills: [
        { name: 'Java', level: 90, icon: 'fab fa-java' },
        { name: 'Spring Boot', level: 88, icon: 'fas fa-leaf' },
        { name: 'Node.js', level: 82, icon: 'fab fa-node-js' },
        { name: 'REST APIs', level: 88, icon: 'fas fa-network-wired' },
        { name: 'Python', level: 75, icon: 'fab fa-python' },
        { name: 'C++', level: 80, icon: 'fas fa-code' }
      ]
    },
    {
      name: 'Database',
      icon: 'fas fa-database',
      skills: [
        { name: 'MySQL', level: 85, icon: 'fas fa-database' },
        { name: 'PostgreSQL', level: 82, icon: 'fas fa-database' },
        { name: 'MongoDB', level: 80, icon: 'fas fa-leaf' },
        { name: 'Firebase', level: 75, icon: 'fas fa-fire' },
        { name: 'Redis', level: 70, icon: 'fas fa-database' },
        { name: 'Elasticsearch', level: 65, icon: 'fas fa-search' }
      ]
    },
    {
      name: 'Tools & DevOps',
      icon: 'fas fa-wrench',
      skills: [
        { name: 'Git', level: 90, icon: 'fab fa-git-alt' },
        { name: 'Docker', level: 75, icon: 'fab fa-docker' },
        { name: 'AWS', level: 72, icon: 'fab fa-aws' },
        { name: 'CI/CD', level: 78, icon: 'fas fa-sync-alt' },
        { name: 'Linux', level: 80, icon: 'fab fa-linux' },
        { name: 'Nginx', level: 70, icon: 'fas fa-server' }
      ]
    }
  ];

  additionalSkills = [
    'GraphQL', 'WebSocket', 'Microservices', 'Agile/Scrum',
    'Jest', 'Cypress', 'Webpack', 'Vite', 'Figma',
    'Jira', 'Confluence', 'Postman', 'Swagger'
  ];
}
