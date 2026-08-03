package com.portfolio.repository;

import com.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByEnabledTrueOrderByDisplayOrderAsc();
    List<Project> findByCategoryAndEnabledTrue(String category);
    List<Project> findByFeaturedTrueAndEnabledTrue();
    
    @Query("SELECT COUNT(p) FROM Project p WHERE p.enabled = true")
    Long countEnabledProjects();
}
