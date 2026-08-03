package com.portfolio.controller;

import com.portfolio.dto.*;
import com.portfolio.service.*;
import com.portfolio.entity.Comment;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {
    
    private final ProjectService projectService;
    private final SkillService skillService;
    private final ExperienceService experienceService;
    private final EducationService educationService;
    private final BlogService blogService;
    private final TestimonialService testimonialService;
    private final ContactService contactService;
    private final VisitorService visitorService;
    private final NewsletterService newsletterService;
    private final CommentService commentService;
    
    // Dashboard Stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", projectService.countEnabledProjects());
        stats.put("totalVisitors", visitorService.getTotalUniqueVisitors());
        stats.put("todayVisitors", visitorService.getTodayVisitors());
        stats.put("totalPageViews", visitorService.getTotalPageViews());
        stats.put("publishedBlogs", blogService.countPublishedBlogs());
        stats.put("unreadMessages", contactService.countUnreadMessages());
        stats.put("totalComments", commentService.countTotalComments());
        return ResponseEntity.ok(stats);
    }
    
    // Projects
    @GetMapping("/projects")
    public ResponseEntity<?> getProjects(@RequestParam(required = false) String category) {
        if (category != null && !category.equals("All")) {
            return ResponseEntity.ok(projectService.getProjectsByCategory(category));
        }
        return ResponseEntity.ok(projectService.getAllEnabledProjects());
    }
    
    @GetMapping("/projects/featured")
    public ResponseEntity<?> getFeaturedProjects() {
        return ResponseEntity.ok(projectService.getFeaturedProjects());
    }
    
    // Skills
    @GetMapping("/skills")
    public ResponseEntity<?> getSkills(@RequestParam(required = false) String category) {
        if (category != null) {
            return ResponseEntity.ok(skillService.getSkillsByCategory(category));
        }
        return ResponseEntity.ok(skillService.getAllEnabledSkills());
    }
    
    // Experience
    @GetMapping("/experience")
    public ResponseEntity<?> getExperience() {
        return ResponseEntity.ok(experienceService.getAllEnabledExperiences());
    }
    
    // Education
    @GetMapping("/education")
    public ResponseEntity<?> getEducation() {
        return ResponseEntity.ok(educationService.getAllEnabledEducation());
    }
    
    // Blogs
    @GetMapping("/blogs")
    public ResponseEntity<?> getBlogs(@RequestParam(defaultValue = "0") int page, 
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(blogService.getPublishedBlogs(pageable));
    }
    
    @GetMapping("/blogs/{slug}")
    public ResponseEntity<?> getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug)
                .map(blog -> {
                    blogService.incrementViewCount(blog.getId());
                    return ResponseEntity.ok(blog);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Comments
    @GetMapping("/blogs/{blogId}/comments")
    public ResponseEntity<?> getBlogComments(@PathVariable Long blogId) {
        return ResponseEntity.ok(commentService.getApprovedCommentsByBlogId(blogId));
    }
    
    @GetMapping("/blogs/{blogId}/comments/count")
    public ResponseEntity<?> getBlogCommentsCount(@PathVariable Long blogId) {
        Map<String, Object> response = new HashMap<>();
        response.put("count", commentService.countApprovedCommentsByBlogId(blogId));
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/comments")
    public ResponseEntity<?> submitComment(@RequestBody Comment comment) {
        comment.setApproved(false);
        return ResponseEntity.ok(commentService.saveComment(comment));
    }
    
    // Testimonials
    @GetMapping("/testimonials")
    public ResponseEntity<?> getTestimonials() {
        return ResponseEntity.ok(testimonialService.getApprovedTestimonials());
    }
    
    // Contact
    @PostMapping("/contact")
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactDTO contact) {
        com.portfolio.entity.Contact contactEntity = new com.portfolio.entity.Contact();
        contactEntity.setName(contact.getName());
        contactEntity.setEmail(contact.getEmail());
        contactEntity.setMessage(contact.getMessage());
        contactEntity.setSubject(contact.getSubject());
        
        return ResponseEntity.ok(contactService.saveContact(contactEntity));
    }
    
    // Newsletter
    @PostMapping("/newsletter")
    public ResponseEntity<?> subscribeNewsletter(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return ResponseEntity.ok(newsletterService.subscribe(email));
    }
    
    // Track Visitor
    @PostMapping("/track")
    public ResponseEntity<?> trackVisitor(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        String page = request.getRequestURI();
        
        visitorService.trackVisitor(ip, userAgent, page);
        return ResponseEntity.ok(Map.of("tracked", true));
    }
}
