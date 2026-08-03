package com.portfolio.repository;

import com.portfolio.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByVisitDate(LocalDate date);
    
    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM Visitor v WHERE v.visitDate = ?1")
    Long countDistinctByVisitDate(LocalDate date);
    
    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM Visitor v")
    Long countDistinctTotalVisitors();
    
    @Query("SELECT COUNT(v) FROM Visitor v")
    Long countTotalPageViews();
}
