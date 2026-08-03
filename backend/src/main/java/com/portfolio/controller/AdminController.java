package com.portfolio.controller;

import com.portfolio.entity.*;
import com.portfolio.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final ProjectService projectService;
    private final SkillService skillService;
    private final ExperienceService experienceService;
    private final EducationService educationService;
    private final BlogService blogService;
    private final TestimonialService testimonialService;
    private final ContactService contactService;
    private final CommentService commentService;
    
    // Projects
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }
    
    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(projectService.updateProject(project));
    }
    
    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
    
    // Skills
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllEnabledSkills());
    }
    
    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.createSkill(skill));
    }
    
    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        skill.setId(id);
        return ResponseEntity.ok(skillService.updateSkill(skill));
    }
    
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }
    
    // Experience
    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getAllExperience() {
        return ResponseEntity.ok(experienceService.getAllEnabledExperiences());
    }
    
    @PostMapping("/experience")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        return ResponseEntity.ok(experienceService.createExperience(experience));
    }
    
    @PutMapping("/experience/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience experience) {
        experience.setId(id);
        return ResponseEntity.ok(experienceService.updateExperience(experience));
    }
    
    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok().build();
    }
    
    // Education
    @GetMapping("/education")
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEnabledEducation());
    }
    
    @PostMapping("/education")
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        return ResponseEntity.ok(educationService.createEducation(education));
    }
    
    @PutMapping("/education/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education education) {
        education.setId(id);
        return ResponseEntity.ok(educationService.updateEducation(education));
    }
    
    @DeleteMapping("/education/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok().build();
    }
    
    // Blogs
    @GetMapping("/blogs")
    public ResponseEntity<?> getAllBlogs(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(blogService.getPublishedBlogs(pageable));
    }
    
    @PostMapping("/blogs")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.createBlog(blog));
    }
    
    @PutMapping("/blogs/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        blog.setId(id);
        return ResponseEntity.ok(blogService.updateBlog(blog));
    }
    
    @PostMapping("/blogs/{id}/publish")
    public ResponseEntity<Blog> publishBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.publishBlog(id));
    }
    
    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
    
    // Testimonials
    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getApprovedTestimonials());
    }
    
    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialService.createTestimonial(testimonial));
    }
    
    @PostMapping("/testimonials/{id}/approve")
    public ResponseEntity<Testimonial> approveTestimonial(@PathVariable Long id) {
        return ResponseEntity.ok(testimonialService.approveTestimonial(id));
    }
    
    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok().build();
    }
    
    // Contacts
    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContacts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(contactService.getAllContacts(pageable));
    }
    
    @PostMapping("/contacts/{id}/read")
    public ResponseEntity<Contact> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }
    
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok().build();
    }
    
    // Comments Management
    @GetMapping("/comments/stats")
    public ResponseEntity<Map<String, Object>> getCommentStats() {
        Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("totalComments", commentService.countTotalComments());
        stats.put("pendingComments", commentService.countPendingComments());
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/comments")
    public ResponseEntity<?> getAllComments(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(commentService.getAllComments(pageable));
    }
    
    @GetMapping("/comments/pending")
    public ResponseEntity<?> getPendingComments(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(commentService.getPendingComments(pageable));
    }
    
    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getComment(@PathVariable Long id) {
        return commentService.getCommentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/comments/{id}/approve")
    public ResponseEntity<?> approveComment(@PathVariable Long id) {
        Comment approved = commentService.approveComment(id);
        if (approved != null) {
            return ResponseEntity.ok(approved);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/comments/{id}/reject")
    public ResponseEntity<?> rejectComment(@PathVariable Long id) {
        Comment rejected = commentService.rejectComment(id);
        if (rejected != null) {
            return ResponseEntity.ok(rejected);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok().build();
    }
    
    // File Upload
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        String allowedTypes = "image/jpeg,image/png,image/gif,image/webp,application/pdf";
        String contentType = file.getContentType();
        if (contentType == null || !allowedTypes.contains(contentType)) {
            return ResponseEntity.badRequest().body(Map.of("error", "File type not allowed. Allowed: " + allowedTypes));
        }

        String sanitized = originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_");
        String filename = System.currentTimeMillis() + "_" + sanitized;

        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));
        Path filePath = Paths.get(uploadDir, filename);
        Files.write(filePath, file.getBytes());

        Map<String, String> response = new java.util.HashMap<>();
        response.put("filename", filename);
        response.put("url", "/uploads/" + filename);

        return ResponseEntity.ok(response);
    }
}
