package com.portfolio.service;

import com.portfolio.entity.Experience;
import com.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;
    
    public List<Experience> getAllEnabledExperiences() {
        return experienceRepository.findByEnabledTrueOrderByDisplayOrderAsc();
    }
    
    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }
    
    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    public Experience updateExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}
