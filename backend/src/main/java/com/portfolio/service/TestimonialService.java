package com.portfolio.service;

import com.portfolio.entity.Testimonial;
import com.portfolio.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestimonialService {
    private final TestimonialRepository testimonialRepository;
    
    public List<Testimonial> getApprovedTestimonials() {
        return testimonialRepository.findByApprovedTrueAndEnabledTrueOrderByDisplayOrderAsc();
    }
    
    public Optional<Testimonial> getTestimonialById(Long id) {
        return testimonialRepository.findById(id);
    }
    
    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
    
    public Testimonial updateTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
    
    public Testimonial approveTestimonial(Long id) {
        Optional<Testimonial> testimonial = testimonialRepository.findById(id);
        if (testimonial.isPresent()) {
            testimonial.get().setApproved(true);
            return testimonialRepository.save(testimonial.get());
        }
        return null;
    }
    
    public void deleteTestimonial(Long id) {
        testimonialRepository.deleteById(id);
    }
}
