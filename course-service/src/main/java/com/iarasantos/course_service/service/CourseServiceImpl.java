package com.iarasantos.course_service.service;

import com.iarasantos.course_service.model.Course;
import com.iarasantos.course_service.repository.CourseRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    private CourseRepository repository;

    @Override
    public Course saveCourse(Course course) {
        course.setCreateDate(LocalDateTime.now());
        return repository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId) {
        repository.deleteById(courseId);
    }

    @Override
    public Course findCourseById(Long courseId) {
        return repository.findById(courseId).orElseThrow(() -> new NotFoundException("Unable to find course with id " + courseId));
    }

    @Override
    public List<Course> findAllCourses() {
        return repository.findAll();
    }

}
