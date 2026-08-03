package com.portfolio.service;

import com.portfolio.entity.Project;
import com.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    
    public List<Project> getAllEnabledProjects() {
        return projectRepository.findByEnabledTrueOrderByDisplayOrderAsc();
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public List<Project> getProjectsByCategory(String category) {
        return projectRepository.findByCategoryAndEnabledTrue(category);
    }
    
    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueAndEnabledTrue();
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    @Transactional
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    @Transactional
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }
    
    @Transactional
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    public Long countEnabledProjects() {
        return projectRepository.countEnabledProjects();
    }
}
