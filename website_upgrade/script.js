/*
 * Core JavaScript functionality for the upgraded educational platform.
 * This script simulates basic ERP/LMS functionality without a backend.
 * Data is stored in localStorage to persist across sessions.
 */

// Preload some demo data if not already present
/*
 * The initial dataset used to populate the demo platform.  In addition to the
 * basic user and course objects from the previous iteration, we now store
 * richer structures required for scheduling classes, authoring course
 * modules and quizzes, and demonstrating simple ERP functionality such as
 * employee management.  Each course now contains a `modules` array where
 * instructors can add text‑based learning units, a `quizzes` array where
 * each quiz holds a title and an array of questions, and an `assignments`
 * array.  A global `classes` array holds scheduled virtual classes while
 * `employees` supports rudimentary HR management for the admin.
 */
const demoData = {
  users: [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "student", password: "password", courses: [1, 2, 3], badges: ["Top Performer", "Quiz Master"], quizResults: {} },
    { id: 2, name: "Dr. Sarah Johnson", email: "sarah@example.com", role: "teacher", password: "password", courses: [1, 2] },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", password: "admin" }
  ],
  courses: [
    {
      id: 1,
      title: "Python Programming",
      teacher: 2,
      progress: 75,
      modules: [
        { title: "Introduction to Python", content: "Python is a versatile programming language used for web development, data analysis and automation." },
        { title: "Control Structures", content: "Learn about if statements, loops and functions to control the flow of your programs." }
      ],
      quizzes: [
        {
          id: 1,
          title: "Basic Python Quiz",
          questions: [
            {
              text: "What keyword is used to define a function in Python?",
              options: ["def", "func", "function", "declare"],
              answer: 0
            },
            {
              text: "How do you start a comment in Python?",
              options: ["//", "#", "/*", "--"],
              answer: 1
            }
          ]
        }
      ],
      assignments: [ { title: "Final Project", due: "2025-12-15" } ]
    },
    {
      id: 2,
      title: "Advanced Calculus",
      teacher: 2,
      progress: 45,
      modules: [
        { title: "Limits and Continuity", content: "Explore the foundations of calculus through limits and continuity." }
      ],
      quizzes: [],
      assignments: [ { title: "Problem Set #8", due: "2025-12-18" } ]
    },
    {
      id: 3,
      title: "Creative Writing",
      teacher: 2,
      progress: 90,
      modules: [],
      quizzes: [],
      assignments: [ { title: "Portfolio", due: "2025-12-22" } ]
    }
  ],
  classes: [
    // Example scheduled class: { id: 1, courseId: 1, datetime: "2025-11-30T10:00", topic: "Intro Lecture", teacher: 2 }
  ],
  employees: [
    // HR records: { id, name, position, salary }
  ],
  leaderboard: [
    { name: "Alex Johnson", points: 1200 },
    { name: "Maria Khan", points: 950 },
    { name: "John Lee", points: 800 }
  ]
};

function initDemoData() {
  if (!localStorage.getItem('eduData')) {
    localStorage.setItem('eduData', JSON.stringify(demoData));
  }
}

// Helper to get data
function getData() {
  return JSON.parse(localStorage.getItem('eduData'));
}

function saveData(data) {
  localStorage.setItem('eduData', JSON.stringify(data));
}

/* ======================================================================
 * Course authoring and scheduling helpers
 *
 * The following functions encapsulate the logic required to extend
 * courses with additional modules, quizzes and scheduled classes.  These
 * helpers centralise modifications to the underlying data structure
 * stored in localStorage so that multiple pages can reuse them.
 */

// Add a module (learning unit) to a course
function addModule(courseId, title, content) {
  const data = getData();
  const course = data.courses.find(c => c.id === courseId);
  if (!course) return;
  if (!course.modules) course.modules = [];
  course.modules.push({ title, content });
  saveData(data);
}

// Create a new quiz on a course and return its generated id
function addQuiz(courseId, quizTitle) {
  const data = getData();
  const course = data.courses.find(c => c.id === courseId);
  if (!course) return null;
  if (!course.quizzes) course.quizzes = [];
  const newId = course.quizzes.length > 0 ? Math.max(...course.quizzes.map(q => q.id)) + 1 : 1;
  course.quizzes.push({ id: newId, title: quizTitle, questions: [] });
  saveData(data);
  return newId;
}

// Add a question to an existing quiz on a course
function addQuestionToQuiz(courseId, quizId, question) {
  const data = getData();
  const course = data.courses.find(c => c.id === courseId);
  if (!course) return;
  const quiz = course.quizzes.find(q => q.id === quizId);
  if (!quiz) return;
  quiz.questions.push(question);
  saveData(data);
}

// Schedule a virtual class for a course.  A class consists of a date/time
// (ISO 8601 string), a topic and the teacher hosting it.  The id is
// incrementally assigned based on the existing classes array.
function scheduleClass(courseId, datetime, topic, teacherId) {
  const data = getData();
  if (!data.classes) data.classes = [];
  const newId = data.classes.length > 0 ? Math.max(...data.classes.map(c => c.id)) + 1 : 1;
  data.classes.push({ id: newId, courseId, datetime, topic, teacher: teacherId });
  saveData(data);
  return newId;
}

// Retrieve upcoming classes for a specific user.  For students it filters
// by their enrolled courses; for teachers by the teacher id.  Past
// classes (earlier than now) are removed from the list.
function getUpcomingClassesForUser(user) {
  const data = getData();
  const now = new Date();
  return (data.classes || []).filter(cls => {
    const classDate = new Date(cls.datetime);
    if (classDate < now) return false;
    if (user.role === 'student') {
      return user.courses && user.courses.includes(cls.courseId);
    } else if (user.role === 'teacher') {
      return cls.teacher === user.id;
    }
    return false;
  });
}

// Record a quiz result for a user.  Stores the score keyed by
// `courseId_quizId` so that multiple attempts on different quizzes can be
// tracked.  Returns true if successful.
function recordQuizResult(userId, courseId, quizId, score) {
  const data = getData();
  const user = data.users.find(u => u.id === userId);
  if (!user) return false;
  if (!user.quizResults) user.quizResults = {};
  user.quizResults[`${courseId}_${quizId}`] = score;
  // Optionally award badges for high scores
  if (score >= 80 && user.badges && !user.badges.includes('High Achiever')) {
    user.badges.push('High Achiever');
  }
  saveData(data);
  return true;
}

// Join a scheduled virtual class.  This function builds a URL with the
// classId so that the virtual classroom page can load the appropriate
// session details.  It is attached to the Join buttons in the student
// dashboard.
function joinClass(classId) {
  window.location.href = `virtual-classroom.html?classId=${classId}`;
}

// Authentication functions
function login(email, password) {
  const data = getData();
  const user = data.users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
}

function signup(name, email, password, role) {
  const data = getData();
  if (data.users.find(u => u.email === email)) {
    return { error: 'User already exists' };
  }
  const id = data.users.length + 1;
  const newUser = { id, name, email, password, role, courses: [], badges: [] };
  data.users.push(newUser);
  saveData(data);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
}

function logout() {
  localStorage.removeItem('currentUser');
}

// Render student dashboard
function renderStudentDashboard() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const data = getData();
  document.getElementById('studentName').textContent = user.name;
  // Populate courses
  const courseContainer = document.getElementById('studentCourses');
  courseContainer.innerHTML = '';
  user.courses.forEach(courseId => {
    const course = data.courses.find(c => c.id === courseId);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${course.title}</h3><p>Progress: ${course.progress}%</p>`;
    card.style.cursor = 'pointer';
    // Clicking a course card navigates to the course page
    card.addEventListener('click', () => {
      window.location.href = `course.html?courseId=${course.id}`;
    });
    courseContainer.appendChild(card);
  });
  // Populate upcoming classes list
  const upcomingList = document.getElementById('upcomingClasses');
  upcomingList.innerHTML = '';
  const classes = getUpcomingClassesForUser(user);
  if (classes.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No upcoming classes';
    upcomingList.appendChild(li);
  } else {
    classes.forEach(cls => {
      const courseName = data.courses.find(c => c.id === cls.courseId)?.title || '';
      const li = document.createElement('li');
      const dateObj = new Date(cls.datetime);
      const dateStr = dateObj.toLocaleString();
      li.innerHTML = `<strong>${courseName}</strong> – ${cls.topic} on ${dateStr} <button class="button" style="margin-left:10px" onclick="joinClass(${cls.id})">Join</button>`;
      upcomingList.appendChild(li);
    });
  }
  // Populate badges
  const badgeList = document.getElementById('badgeList');
  badgeList.innerHTML = '';
  user.badges.forEach(badge => {
    const badgeItem = document.createElement('span');
    badgeItem.className = 'badge-item';
    badgeItem.textContent = badge;
    badgeList.appendChild(badgeItem);
  });
  // Render leaderboard
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  data.leaderboard.sort((a,b) => b.points - a.points).forEach((entry, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${entry.name} - ${entry.points} pts`;
    leaderboard.appendChild(li);
  });
  // Render progress chart using ECharts
  const chartDom = document.getElementById('progressChart');
  const chart = echarts.init(chartDom);
  const option = {
    title: { text: 'Course Progress' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: user.courses.map(id => data.courses.find(c => c.id === id).title)
    },
    yAxis: { type: 'value' },
    series: [{
      data: user.courses.map(id => data.courses.find(c => c.id === id).progress),
      type: 'bar'
    }]
  };
  chart.setOption(option);
  // Chat messages
  loadChatMessages();
}

// Chat functionality
function loadChatMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = `${msg.name}: ${msg.text}`;
    chatBox.appendChild(p);
  });
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push({ name: currentUser.name, text });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
  input.value = '';
  loadChatMessages();
}

// Render teacher dashboard
function renderTeacherDashboard() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const data = getData();
  document.getElementById('teacherName').textContent = user.name;
  const classList = document.getElementById('teacherClasses');
  classList.innerHTML = '';
  data.courses.filter(c => c.teacher === user.id).forEach(course => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${course.title}</h3><p>Enrolled students: ${getEnrolledCount(course.id)}</p><button class="button" style="margin-top:10px">Manage</button>`;
    // clicking the manage button navigates to the course page
    card.querySelector('button').addEventListener('click', () => {
      window.location.href = `course.html?courseId=${course.id}`;
    });
    classList.appendChild(card);
  });
  // Placeholder analytics chart for teacher
  const chartDom = document.getElementById('teacherChart');
  const chart = echarts.init(chartDom);
  const option = {
    title: { text: 'Average Course Progress' },
    xAxis: { type: 'category', data: data.courses.filter(c => c.teacher === user.id).map(c => c.title) },
    yAxis: { type: 'value' },
    series: [{
      data: data.courses.filter(c => c.teacher === user.id).map(c => c.progress),
      type: 'line'
    }]
  };
  chart.setOption(option);
}

function getEnrolledCount(courseId) {
  const data = getData();
  return data.users.filter(u => u.courses && u.courses.includes(courseId)).length;
}

// Render admin dashboard
function renderAdminDashboard() {
  const data = getData();
  const userTable = document.getElementById('userTableBody');
  userTable.innerHTML = '';
  data.users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.role}</td>`;
    userTable.appendChild(row);
  });
  // Course management table
  const courseTable = document.getElementById('courseTableBody');
  courseTable.innerHTML = '';
  data.courses.forEach(course => {
    const row = document.createElement('tr');
    const teacherName = data.users.find(u => u.id === course.teacher)?.name || 'Unknown';
    row.innerHTML = `<td>${course.title}</td><td>${teacherName}</td><td>${course.progress}%</td>`;
    courseTable.appendChild(row);
  });
}

// Event handlers for login and signup forms
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = login(email, password);
  if (!user) {
    alert('Invalid credentials');
    return;
  }
  redirectToRoleDashboard(user.role);
}

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const role = document.getElementById('signupRole').value;
  const result = signup(name, email, password, role);
  if (result.error) {
    alert(result.error);
    return;
  }
  redirectToRoleDashboard(role);
}

function redirectToRoleDashboard(role) {
  if (role === 'student') {
    window.location.href = 'student-dashboard.html';
  } else if (role === 'teacher') {
    window.location.href = 'teacher-dashboard.html';
  } else if (role === 'admin') {
    window.location.href = 'admin-panel.html';
  }
}

// Initialize the platform on page load
window.addEventListener('DOMContentLoaded', () => {
  initDemoData();
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage === 'student-dashboard') {
    renderStudentDashboard();
  } else if (currentPage === 'teacher-dashboard') {
    renderTeacherDashboard();
  } else if (currentPage === 'admin-panel') {
    renderAdminDashboard();
  }
});