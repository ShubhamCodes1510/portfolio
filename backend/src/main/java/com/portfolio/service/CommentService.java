package com.portfolio.service;

import com.portfolio.entity.Comment;
import com.portfolio.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    
    public List<Comment> getApprovedCommentsByBlogId(Long blogId) {
        return commentRepository.findByBlogIdAndApprovedTrueOrderByCreatedAtDesc(blogId);
    }
    
    public long countApprovedCommentsByBlogId(Long blogId) {
        return commentRepository.countByBlogIdAndApprovedTrue(blogId);
    }
    
    public Page<Comment> getAllComments(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }
    
    public Page<Comment> getCommentsByBlogId(Long blogId, Pageable pageable) {
        return commentRepository.findByBlogId(blogId, pageable);
    }
    
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
    
    public Comment saveComment(Comment comment) {
        // By default, comments are approved (approved = true)
        // For a real system, you might want to set approved = false initially
        // and require admin approval
        return commentRepository.save(comment);
    }
    
    public Comment approveComment(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            comment.get().setApproved(true);
            return commentRepository.save(comment.get());
        }
        return null;
    }
    
    public Comment rejectComment(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            comment.get().setApproved(false);
            return commentRepository.save(comment.get());
        }
        return null;
    }
    
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
    
    public Page<Comment> getPendingComments(Pageable pageable) {
        return commentRepository.findByApproved(false, pageable);
    }
    
    public Page<Comment> getApprovedComments(Pageable pageable) {
        return commentRepository.findByApproved(true, pageable);
    }
    
    public long countPendingComments() {
        return commentRepository.countByApprovedFalse();
    }
    
    public long countTotalComments() {
        return commentRepository.count();
    }
}