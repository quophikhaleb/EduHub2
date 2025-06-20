// public/js/access-control.js

async function checkCourseAccess(userId, courseId) {
  try {
    const response = await fetch('http://localhost:3000/api/pay/check-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, courseId })
    });

    const result = await response.json();

    if (response.ok && result.access) {
      // Access granted
      window.location.href = `/pages/course-detail-page.html?courseId=${courseId}`;
    } else {
      alert(result.message || 'Access denied. Please make payment.');
    }
  } catch (error) {
    console.error('Error checking access:', error);
    alert('Error checking course access.');
  }
}

// Example binding (ensure courseId and userId are available)
document.querySelectorAll('.access-course-btn').forEach(button => {
  button.addEventListener('click', function () {
    const courseId = this.dataset.courseId;
    const userId = localStorage.getItem('userId'); // assuming userId is stored after login

    if (!userId) {
      alert('Please login first.');
      return;
    }

    checkCourseAccess(userId, courseId);
  });
});
