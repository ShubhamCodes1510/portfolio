package com.portfolio.service;

import com.portfolio.entity.Blog;
import com.portfolio.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    
    public Page<Blog> getPublishedBlogs(Pageable pageable) {
        return blogRepository.findByPublishedTrueAndEnabledTrueOrderByPublishedAtDesc(pageable);
    }
    
    public List<Blog> getBlogsByCategory(String category) {
        return blogRepository.findByPublishedTrueAndEnabledTrueAndCategory(category);
    }
    
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }
    
    public Optional<Blog> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug);
    }
    
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }
    
    public Blog updateBlog(Blog blog) {
        return blogRepository.save(blog);
    }
    
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
    
    public Blog publishBlog(Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()) {
            blog.get().setPublished(true);
            blog.get().setPublishedAt(LocalDateTime.now());
            return blogRepository.save(blog.get());
        }
        return null;
    }
    
    public Blog incrementViewCount(Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()) {
            blog.get().setViewCount(blog.get().getViewCount() + 1);
            return blogRepository.save(blog.get());
        }
        return null;
    }
    
    public long countPublishedBlogs() {
        return blogRepository.countByPublishedTrue();
    }
}
