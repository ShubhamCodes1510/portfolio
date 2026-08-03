import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github.component.html',
  styleUrl: './github.component.css'
})
export class GithubComponent {
  repos = [
    { name: 'ecommerce-platform', description: 'Full-stack e-commerce solution', stars: 124, forks: 45, language: 'TypeScript', color: '#3178c6', url: '#' },
    { name: 'task-manager-api', description: 'Real-time task management API', stars: 89, forks: 23, language: 'JavaScript', color: '#f1e05a', url: '#' },
    { name: 'banking-system', description: 'Enterprise banking backend', stars: 156, forks: 67, language: 'Java', color: '#b07219', url: '#' },
    { name: 'portfolio-v2', description: 'Angular portfolio template', stars: 67, forks: 12, language: 'TypeScript', color: '#3178c6', url: '#' }
  ];
}
