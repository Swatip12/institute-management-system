package com.institute.admin.controller;

import com.institute.admin.model.Course;
import com.institute.admin.model.Student;
import com.institute.admin.model.Message;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.institute.admin.services.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend access
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ---------------- Courses ----------------

    @GetMapping("/courses")
    public List<Course> getCourses() {
        return adminService.getAllCourses();
    }

    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return adminService.getCourseById(id).orElse(null);
    }

    @PostMapping("/courses")
    public Course addCourse(@RequestBody Course course) {
        return adminService.addCourse(course);
    }

    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return adminService.updateCourse(id, course);
    }

    @DeleteMapping("/courses/{id}")
    public void deleteCourse(@PathVariable Long id) {
        adminService.deleteCourse(id);
    }

    // ---------------- Students ----------------

    @GetMapping("/students")
    public List<Student> getStudents() {
        return adminService.getAllStudents();
    }

    @GetMapping("/students/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return adminService.getStudentById(id).orElse(null);
    }

    // ---------------- Messages ----------------

    @GetMapping("/messages")
    public List<Message> getMessages() {
        return adminService.getAllMessages();
    }

    @GetMapping("/messages/{id}")
    public Message getMessageById(@PathVariable Long id) {
        return adminService.getMessageById(id).orElse(null);
    }
}
