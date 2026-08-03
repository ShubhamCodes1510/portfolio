package com.portfolio.service;

import com.portfolio.entity.Contact;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    
    public void sendContactNotification(Contact contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("admin@example.com");
        message.setSubject("New Contact Form Submission");
        message.setFrom("noreply@portfolio.com");
        message.setText(
            "New message from: " + contact.getName() + "\n" +
            "Email: " + contact.getEmail() + "\n" +
            "Message: " + contact.getMessage()
        );
        mailSender.send(message);
    }
    
    public void sendAutoReply(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Thank you for reaching out!");
        message.setFrom("noreply@portfolio.com");
        message.setText(
            "Hi " + name + ",\n\n" +
            "Thank you for contacting me. I have received your message and will get back to you as soon as possible.\n\n" +
            "Best regards,\n" +
            "Alex Morgan"
        );
        mailSender.send(message);
    }
    
    public void sendNewsletter(String toEmail, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setFrom("newsletter@portfolio.com");
        message.setText(content);
        mailSender.send(message);
    }
}
