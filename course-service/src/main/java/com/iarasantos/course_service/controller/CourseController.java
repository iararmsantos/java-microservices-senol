package com.iarasantos.course_service.controller;

import com.iarasantos.course_service.model.Course;
import com.iarasantos.course_service.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.findAllCourses());
    }

    @PostMapping()
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return new ResponseEntity<>(service.saveCourse(course), HttpStatus.CREATED);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        service.deleteCourse(courseId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable Long courseId) {
        return ResponseEntity.ok(service.findCourseById(courseId));
    }
}
