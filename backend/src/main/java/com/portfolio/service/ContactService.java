package com.portfolio.service;

import com.portfolio.entity.Contact;
import com.portfolio.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;
    private final EmailService emailService;
    
    public Page<Contact> getAllContacts(Pageable pageable) {
        return contactRepository.findByOrderByCreatedAtDesc(pageable);
    }
    
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }
    
    public Contact saveContact(Contact contact) {
        Contact saved = contactRepository.save(contact);
        try {
            emailService.sendContactNotification(contact);
            emailService.sendAutoReply(contact.getEmail(), contact.getName());
        } catch (Exception e) {
            log.error("Failed to send email notification for contact from {}: {}", contact.getEmail(), e.getMessage());
        }
        return saved;
    }
    
    public Contact markAsRead(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            contact.get().setRead(true);
            return contactRepository.save(contact.get());
        }
        return null;
    }
    
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
    
    public long countUnreadMessages() {
        return contactRepository.countByIsReadFalse();
    }
}
