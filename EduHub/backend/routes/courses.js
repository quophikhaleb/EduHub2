const express = require('express');
const router = express.Router();

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Mathematics - SHS 1',
    description: 'Algebra, Geometry & Statistics',
    price: 'GHC 20.00',
    image: 'https://placehold.co/600x400?text=Mathematics',
    category: 'Mathematics'
  },
  {
    id: 2,
    title: 'Science - SHS 2',
    description: 'Physics, Chemistry & Biology',
    price: 'GHC 25.00',
    image: 'https://placehold.co/600x400?text=Science',
    category: 'Science'
  },
  {
    id: 3,
    title: 'English Language',
    description: 'Grammar, Literature & Composition',
    price: 'GHC 15.00',
    image: 'https://placehold.co/600x400?text=English',
    category: 'Languages'
  }
];

// GET /api/courses
router.get('/', (req, res) => {
  res.json(courses);
});

module.exports = router;
