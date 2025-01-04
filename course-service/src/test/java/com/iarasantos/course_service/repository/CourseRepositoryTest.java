package com.iarasantos.course_service.repository;

import com.iarasantos.course_service.model.Course;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class CourseRepositoryTest {
    @Autowired
    private CourseRepository repository;

    @Test
    public void save_shouldReturn_course() {
        Course course = new Course();
        course.setTitle("Spring Boot");
        course.setSubtitle("Advanced Topics");
        course.setPrice(100.0);
        course.setCreateDate(LocalDateTime.now());

        Course savedCourse = repository.save(course);

        assertNotNull(savedCourse.getId());
        assertEquals("Spring Boot", savedCourse.getTitle());
    }
}