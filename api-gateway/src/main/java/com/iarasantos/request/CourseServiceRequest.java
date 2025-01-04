package com.iarasantos.request;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "course-service",
path = "/courses",
//url = "${course.service.url}",
configuration = FeignConfiguration.class)
public interface CourseServiceRequest {

    @PostMapping
    Object saveCourse(@RequestBody Object requestBody);

    @DeleteMapping("{courseId}")
    void deleteCourse(@PathVariable("courseId") Long courseId);

    @GetMapping
    List<Object> getAllCourses();

}
