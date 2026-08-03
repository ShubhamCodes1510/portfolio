package com.portfolio.repository;

import com.portfolio.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogIdAndApprovedTrueOrderByCreatedAtDesc(Long blogId);
    
    Page<Comment> findByBlogId(Long blogId, Pageable pageable);
    
    Page<Comment> findByApproved(boolean approved, Pageable pageable);
    
    long countByBlogIdAndApprovedTrue(Long blogId);
    
    long countByApprovedFalse();
    
    @Query("SELECT c FROM Comment c WHERE c.blog.id = :blogId ORDER BY c.createdAt DESC")
    Page<Comment> findAllByBlogIdOrderByCreatedAtDesc(@Param("blogId") Long blogId, Pageable pageable);
}
