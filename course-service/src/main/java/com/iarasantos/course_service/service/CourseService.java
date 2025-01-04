package com.iarasantos.course_service.service;

import com.iarasantos.course_service.model.Course;

import java.util.List;

public interface CourseService {
    Course saveCourse(Course course);

    void deleteCourse(Long courseId);

    Course findCourseById(Long courseId);

    List<Course> findAllCourses();
}
