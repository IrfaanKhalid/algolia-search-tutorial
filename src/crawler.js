const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://catalogs.rutgers.edu/generated/nb-ug_current/pg159.html';


async function getCourses() {
  // Let's make an array to store our courses
  let courses = [];

  // Request data from the url above
  let html = await rp(url);

  // Iterate over all courses
  $('div.item-container', html).each = (i, container) => {
    // Grab some vital course information from this container
    courses[i] = {
      code: $('.course-annotation', container).text(),
      title: $('.course-title', container).text(),
      desc: $('.course-desc', container).text(),
      prereqs: $('.course-prereq', container).text()
    }
  };

  // Return our array of courses
  return courses;
};

// Export our crawling function, getCourses()
module.exports = {
  getCourses
};