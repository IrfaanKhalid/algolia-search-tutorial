const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://catalog.illinois.edu/courses-of-instruction/cs/';

// Request data from the url above
rp(url)
  // The request was successful!
  .then(function (html) {
    // Determine the number of divs with the class '.courseblock' on the page 
    let numCourseBlocks = $('.courseblock', html).length;

    // Make an array of courses corresponding to each '.courseblock' div
    let courses = [];

    for (let i = 0; i < numCourseBlocks; ++i) {
      // Make a course object and set its title and description
      let course = {};
      course.title = $('.courseblock .courseblocktitle > strong > a', html)[i].children[0].data;
      course.desc = $('.courseblock .courseblockdesc', html)[i].children[0];

      // course.desc = $('.courseblock .courseblockdesc', html)[i].children[0].data + 
      // $('.courseblock .courseblockdesc', html)[i].children[0].next;

      // Add the course object to the courses array
      courses.push(course);
    }

    // Let's print the array
    console.log(courses);
  })
  // The request ran into an error - let's log the exact error to our console
  .catch(function (err) {
    console.log(err);
  });