package com.institute.admin.services;

import com.institute.admin.model.Course;
import com.institute.admin.model.Student;
import com.institute.admin.model.Message;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService
 {

    private final CourseRepository courseRepo;
    private final StudentRepository studentRepo;
    private final MessageRepository messageRepo;

    public AdminService(CourseRepository courseRepo, StudentRepository studentRepo, MessageRepository messageRepo) {
        this.courseRepo = courseRepo;
        this.studentRepo = studentRepo;
        this.messageRepo = messageRepo;
    }

    // ---------------- Courses ----------------

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepo.findById(id);
    }

    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        return courseRepo.findById(id).map(course -> {
            course.setName(updatedCourse.getName());
            course.setDescription(updatedCourse.getDescription());
            return courseRepo.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }

    // ---------------- Students ----------------

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepo.findById(id);
    }

    // ---------------- Messages ----------------

    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepo.findById(id);
    }

    private static class StudentRepository {

        public StudentRepository() {
        }

        private List<Student> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private Optional<Student> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }

    private static class CourseRepository {

        public CourseRepository() {
        }

        private List<Course> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private Optional<Course> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private Course save(Course course) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private void deleteById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }

    private static class MessageRepository {

        public MessageRepository() {
        }

        private List<Message> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private Optional<Message> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }
}
