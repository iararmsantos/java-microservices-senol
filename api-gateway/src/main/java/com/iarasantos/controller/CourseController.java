package com.iarasantos.controller;

import com.iarasantos.request.CourseServiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("gateway/course")
public class CourseController {
    @Autowired
    private CourseServiceRequest courseServiceRequest;

    @PostMapping
    public ResponseEntity<?> saveCourse(@RequestBody Object course) {
        return new ResponseEntity<>(courseServiceRequest.saveCourse(course), HttpStatus.CREATED);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable("courseId") Long courseId) {
        courseServiceRequest.deleteCourse(courseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseServiceRequest.getAllCourses());
    }
}
