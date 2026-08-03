package com.portfolio.service;

import com.portfolio.entity.Newsletter;
import com.portfolio.repository.NewsletterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsletterService {
    private final NewsletterRepository newsletterRepository;
    
    public Newsletter subscribe(String email) {
        Optional<Newsletter> existing = newsletterRepository.findByEmail(email);
        if (existing.isPresent()) {
            if (!existing.get().isSubscribed()) {
                existing.get().setSubscribed(true);
                existing.get().setSubscribedAt(java.time.LocalDateTime.now());
                return newsletterRepository.save(existing.get());
            }
            return existing.get();
        }
        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(email);
        return newsletterRepository.save(newsletter);
    }
    
    public void unsubscribe(String email) {
        Optional<Newsletter> newsletter = newsletterRepository.findByEmail(email);
        if (newsletter.isPresent()) {
            newsletter.get().setSubscribed(false);
            newsletter.get().setUnsubscribedAt(java.time.LocalDateTime.now());
            newsletterRepository.save(newsletter.get());
        }
    }
    
    public List<Newsletter> getAllSubscribers() {
        return newsletterRepository.findAll();
    }
}
