package com.portfolio.service;

import com.portfolio.entity.Skill;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;
    
    public List<Skill> getAllEnabledSkills() {
        return skillRepository.findByEnabledTrueOrderByDisplayOrderAsc();
    }
    
    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryAndEnabledTrue(category);
    }
    
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }
    
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    public Skill updateSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
