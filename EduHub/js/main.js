async function accessCourse(courseId) {
  try {
    const response = await fetch('http://localhost:3000/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, userId: 'student123' }) // Replace with actual user logic
    });

    const result = await response.json();

    if (result.success) {
      alert('Payment successful! You now have access.');
      // Optionally redirect:
      // window.location.href = `/course-view.html?id=${courseId}`;
    } else {
      alert('Payment failed. Please try again.');
    }
  } catch (err) {
    console.error(err);
    alert('Server error during payment.');
  }
}
