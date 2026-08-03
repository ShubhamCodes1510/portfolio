package com.portfolio.service;

import com.portfolio.entity.Visitor;
import com.portfolio.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitorService {
    private final VisitorRepository visitorRepository;
    
    public void trackVisitor(String ipAddress, String userAgent, String page) {
        Visitor visitor = new Visitor();
        visitor.setIpAddress(ipAddress);
        visitor.setUserAgent(userAgent);
        visitor.setPage(page);
        visitorRepository.save(visitor);
    }
    
    public List<Visitor> getVisitorsByDate(LocalDate date) {
        return visitorRepository.findByVisitDate(date);
    }
    
    public Long getTodayVisitors() {
        return visitorRepository.countDistinctByVisitDate(LocalDate.now());
    }
    
    public Long getTotalUniqueVisitors() {
        return visitorRepository.countDistinctTotalVisitors();
    }
    
    public Long getTotalPageViews() {
        return visitorRepository.countTotalPageViews();
    }
}
