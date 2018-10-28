const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://catalogs.rutgers.edu/generated/nb-ug_current/pg159.html';

// Request data from the url above
rp(url)
  // The request was successful!
  .then(function (html) {
    // Make an array of courses
    let courses = [];

    // Iterate over all courses
    $('div.item-container', html).each(function (i, container) {
      // Make a new course object at this index
      courses[i] = {};

      // Grab some vital course information from this container
      courses[i].code = $('.course-annotation', container).text();
      courses[i].title = $('.course-title', container).text();
      courses[i].desc = $('.course-desc', container).text();
      courses[i].prereqs = $('.course-prereq', container).text();
    });

    // DEBUG Let's print the array
    console.log(courses);
  })
  // The request ran into an error - let's log the exact error to our console
  .catch(function (err) {
    console.log(err);
  });