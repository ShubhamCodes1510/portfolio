package com.portfolio.config;

import com.portfolio.entity.Admin;
import com.portfolio.entity.Blog;
import com.portfolio.entity.Comment;
import com.portfolio.repository.AdminRepository;
import com.portfolio.repository.BlogRepository;
import com.portfolio.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final AdminRepository adminRepository;
    private final BlogRepository blogRepository;
    private final CommentRepository commentRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        // Create admin user if not exists
        if (!adminRepository.existsByUsername("admin")) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Alex");
            admin.setLastName("Morgan");
            adminRepository.save(admin);
        }
        
        // Create sample blog posts if none exist
        if (blogRepository.count() == 0) {
            Blog blog1 = new Blog();
            blog1.setTitle("Welcome to My Portfolio Blog");
            blog1.setSlug("welcome-to-my-portfolio-blog");
            blog1.setContent("<p>This is my first blog post on my portfolio website. I'm excited to share my thoughts and experiences with you.</p><p>In this blog, I'll be writing about web development, software engineering best practices, and my journey as a developer.</p>");
            blog1.setSummary("Welcome to my portfolio blog where I share insights about web development and software engineering.");
            blog1.setPublished(true);
            blog1.setEnabled(true);
            blog1.setViewCount(42);
            blog1.setPublishedAt(LocalDateTime.now().minusDays(2));
            blogRepository.save(blog1);
            
            Blog blog2 = new Blog();
            blog2.setTitle("Building Modern Web Applications with Angular");
            blog2.setSlug("building-modern-web-applications-with-angular");
            blog2.setContent("<p>Angular is a powerful framework for building single-page applications. In this post, I'll share some tips and best practices I've learned.</p><p>Key topics include component architecture, reactive forms, and state management.</p>");
            blog2.setSummary("Learn about building modern web applications using Angular framework with best practices.");
            blog2.setPublished(true);
            blog2.setEnabled(true);
            blog2.setViewCount(87);
            blog2.setPublishedAt(LocalDateTime.now().minusDays(1));
            blogRepository.save(blog2);
            
            System.out.println("Sample blog posts created");
            
            // Create sample comments
            Comment comment1 = new Comment();
            comment1.setBlog(blog1);
            comment1.setName("John Doe");
            comment1.setEmail("john@example.com");
            comment1.setContent("Great first post! Looking forward to reading more.");
            comment1.setApproved(true);
            commentRepository.save(comment1);
            
            Comment comment2 = new Comment();
            comment2.setBlog(blog1);
            comment2.setName("Jane Smith");
            comment2.setEmail("jane@example.com");
            comment2.setContent("I really enjoyed this introduction. Can you write about backend development too?");
            comment2.setApproved(true);
            commentRepository.save(comment2);
            
            Comment comment3 = new Comment();
            comment3.setBlog(blog2);
            comment3.setName("Bob Johnson");
            comment3.setEmail("bob@example.com");
            comment3.setContent("Angular is my favorite framework! Thanks for the insights.");
            comment3.setApproved(true);
            commentRepository.save(comment3);
            
            System.out.println("Sample comments created");
        }
    }
}
