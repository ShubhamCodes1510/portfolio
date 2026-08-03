package com.portfolio.service;

import com.portfolio.entity.Education;
import com.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EducationService {
    private final EducationRepository educationRepository;
    
    public List<Education> getAllEnabledEducation() {
        return educationRepository.findByEnabledTrueOrderByDisplayOrderAsc();
    }
    
    public Optional<Education> getEducationById(Long id) {
        return educationRepository.findById(id);
    }
    
    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }
    
    public Education updateEducation(Education education) {
        return educationRepository.save(education);
    }
    
    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}
