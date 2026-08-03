package com.portfolio.repository;

import com.portfolio.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findByPublishedTrueAndEnabledTrueOrderByPublishedAtDesc(Pageable pageable);
    List<Blog> findByPublishedTrueAndEnabledTrueAndCategory(String category);
    Optional<Blog> findBySlug(String slug);
    long countByPublishedTrue();
}
