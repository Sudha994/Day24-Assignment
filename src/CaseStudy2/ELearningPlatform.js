import React, { useState } from 'react';
import './ELearningPlatform.css';

const ELearningPlatform = () => {
  // Sample course data
  const coursesData = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the core concepts of React including components, props, state, and hooks.",
      author: "Jane Smith",
      duration: "12 hours",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Deep dive into modern JavaScript features, asynchronous programming, and design patterns.",
      author: "John Doe",
      duration: "15 hours",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Master the art of creating intuitive and beautiful user interfaces and experiences.",
      author: "Alex Johnson",
      duration: "10 hours",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Learn how to use Python for data analysis, visualization, and machine learning.",
      author: "Maria Garcia",
      duration: "20 hours",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Cloud Computing Basics",
      description: "Understand cloud services, deployment models, and how to leverage cloud platforms.",
      author: "Robert Chen",
      duration: "14 hours",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using modern frameworks and tools.",
      author: "Sarah Williams",
      duration: "18 hours",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // State for enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  // State for favorite courses
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  // Enroll in a course
  const enrollInCourse = (course) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      const progress = Math.floor(Math.random() * 100); // Random progress for demo
      setEnrolledCourses([...enrolledCourses, { ...course, progress }]);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (courseId) => {
    if (favoriteCourses.includes(courseId)) {
      setFavoriteCourses(favoriteCourses.filter(id => id !== courseId));
    } else {
      setFavoriteCourses([...favoriteCourses, courseId]);
    }
  };

  // Update progress for a course
  const updateProgress = (courseId, amount) => {
    setEnrolledCourses(enrolledCourses.map(course => {
      if (course.id === courseId) {
        const newProgress = Math.min(100, Math.max(0, course.progress + amount));
        return { ...course, progress: newProgress };
      }
      return course;
    }));
  };

  return (
    <div className="container">
      <header>
        <h1 className="app-title">LearnHub</h1>
        <p className="app-subtitle">Expand your knowledge with our curated courses</p>
        <div className="user-info">
          <div className="user-avatar">JS</div>
          <span>John Student</span>
        </div>
      </header>
      
      <div className="content">
        <section className="courses-section">
          <h2 className="section-title">
            <i className="fas fa-book-open section-icon"></i>
            Available Courses
          </h2>
          <div className="courses-grid">
            {coursesData.map(course => {
              const isEnrolled = enrolledCourses.find(c => c.id === course.id);
              const isFavorite = favoriteCourses.includes(course.id);
              
              return (
                <div key={course.id} className="course-card">
                  <img src={course.image} alt={course.title} className="course-image" />
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="course-author">
                        <i className="fas fa-user"></i> {course.author}
                      </span>
                      <span className="course-duration">
                        <i className="fas fa-clock"></i> {course.duration}
                      </span>
                    </div>
                    <button 
                      className={`enroll-button ${isEnrolled ? 'enrolled' : ''}`}
                      onClick={() => enrollInCourse(course)}
                      disabled={isEnrolled}
                    >
                      {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                    </button>
                  </div>
                  <div 
                    className="favorite-icon" 
                    onClick={() => toggleFavorite(course.id)}
                    style={{position: 'absolute', top: '10px', right: '10px'}}
                  >
                    <i className={`fas fa-heart ${isFavorite ? '' : 'far'}`}></i>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        <section className="enrollment-section">
          <div className="enrollment-container">
            <div className="enrolled-courses">
              <h2 className="section-title">
                <i className="fas fa-graduation-cap section-icon"></i>
                My Courses
              </h2>
              
              <div className="enrolled-list">
                {enrolledCourses.length === 0 ? (
                  <p className="empty-message">You haven't enrolled in any courses yet.</p>
                ) : (
                  enrolledCourses.map(course => (
                    <div key={course.id} className="enrolled-item">
                      <div>
                        <div className="course-name">{course.title}</div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="progress-text">{course.progress}% completed</div>
                      </div>
                      <div>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateProgress(course.id, -10)}
                          disabled={course.progress <= 0}
                        >-</button>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateProgress(course.id, 10)}
                          disabled={course.progress >= 100}
                        >+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="favorites-section">
              <h2 className="section-title">
                <i className="fas fa-heart section-icon"></i>
                Favorites
              </h2>
              
              <div className="enrolled-list">
                {favoriteCourses.length === 0 ? (
                  <p className="empty-message">You don't have any favorite courses yet.</p>
                ) : (
                  coursesData
                    .filter(course => favoriteCourses.includes(course.id))
                    .map(course => (
                      <div key={course.id} className="favorite-item">
                        <span>{course.title}</span>
                        <div 
                          className="favorite-icon" 
                          onClick={() => toggleFavorite(course.id)}
                        >
                          <i className="fas fa-heart"></i>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ELearningPlatform;