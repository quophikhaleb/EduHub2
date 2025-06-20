// course-access.js

document.addEventListener('DOMContentLoaded', () => {
  // Handle course access button clicks
  const accessButtons = document.querySelectorAll('.access-course-btn');

  accessButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const userId = localStorage.getItem('userId');
      const courseId = button.dataset.courseId || button.getAttribute('data-course-id');
      const courseLink = button.getAttribute('data-course-link');

      if (!userId) {
        alert('You must be logged in to access this course.');
        window.location.href = '/pages/login-page.html';
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/pay/check-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, courseId })
        });
        const data = await res.json();

        if (res.ok && (data.access || data.accessGranted)) {
          // Redirect to course detail page or provided link
          if (courseLink) {
            window.location.href = courseLink;
          } else {
            window.location.href = `course-detail-page.html?course=${courseId}`;
          }
        } else {
          alert(data.message || 'You do not have access to this course.');
        }
      } catch (err) {
        console.error('Access check failed:', err);
        alert('Error verifying course access.');
      }
    });
  });

  // If on a course detail page, check access on load
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('courseId') || urlParams.get('course');
  const userId = localStorage.getItem('userId');

  // Only run this check if we're on a course detail page (adjust as needed)
  if (courseId && userId && window.location.pathname.includes('course-detail-page.html')) {
    fetch('http://localhost:3000/api/pay/check-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId })
    })
      .then(res => res.json())
      .then(result => {
        if (!result.access && !result.accessGranted) {
          alert(result.message || 'You do not have access to this course.');
          window.location.href = 'student-dashboard-page.html';
        }
      })
      .catch(err => {
        console.error('Access check failed:', err);
        alert('Error verifying course access.');
        window.location.href = 'student-dashboard-page.html';
      });
  }
});

