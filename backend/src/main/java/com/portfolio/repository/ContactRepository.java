package com.portfolio.repository;

import com.portfolio.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    Page<Contact> findByOrderByCreatedAtDesc(Pageable pageable);
    long countByIsReadFalse();
}
