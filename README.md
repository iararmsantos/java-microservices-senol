## Go Full Stack With Spring Cloud Microservices and React JS
(https://www.udemy.com/course/go-full-stack-with-spring-cloud-microservices-and-react-js)

Throughout this course, I gained hands-on experience in developing a full-stack application using Spring Boot, Spring Cloud Microservices, and React. The course focused on building an online course application, structured around multiple microservices, to demonstrate key concepts in microservices architecture and full-stack development.

### Key Learnings

#### Microservices Architecture

I worked with five different microservices:

1. API Gateway: Acts as the single entry point for the system, handling user authentication and authorization with Spring Security and JWT. It routes requests to appropriate microservices.

2. Course Service: Manages CRUD operations for courses.

3. Purchase Service: Handles purchase transactions and logs details like which user bought which course and when.

4. Eureka Discovery Service: Facilitates service discovery using Spring Cloud Netflix Eureka, allowing microservices to dynamically register and communicate without hardcoded hostnames and ports.

5. Frontend with React: A React-based client application that interacts with backend services, providing a user-friendly UI for managing courses and purchases.

### Key Technologies and Concepts Covered
Throughout the course, I gained hands-on experience with the following:

* Spring Boot & Spring Cloud for building scalable, maintainable microservices.
* API Gateway for managing requests and enforcing security.
* Spring Security with JWT for authentication and secure communication.
* Service Discovery with Eureka to enable seamless microservice interaction.
* Inter-service communication using OpenFeign for declarative REST clients.
* Databases (MySQL, PostgreSQL, and H2) to explore different storage options.
* Maven & Lombok to simplify dependency management and reduce boilerplate code.
* Testing with Postman for API validation and debugging.
* React JS for developing a dynamic frontend to interact with the backend.

### Application Workflow
1. Users access the React UI to browse courses, create new ones, or make purchases.
2. All requests go through the API Gateway, enforcing authentication.
3. Backend microservices (Course & Purchase services) handle business logic.
4. Eureka Discovery Server enables seamless communication between services.
5. Transactions and logs are stored in MySQL/PostgreSQL databases.

### Final Thoughts
This course provided a comprehensive understanding of microservices, from design to deployment. It strengthened my knowledge of Spring Boot, Spring Cloud, and React, and gave me practical experience in building and integrating microservices using industry-standard tools and best practices..