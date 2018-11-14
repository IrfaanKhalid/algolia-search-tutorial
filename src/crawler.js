const rp = require('request-promise');
// const fs = require('fs'); /* Only use if falling back to loading HTML locally */
const $ = require('cheerio');
const url = 'http://catalogs.rutgers.edu/generated/nb-ug_current/pg159.html';

// Define an async function to get all the catalog's courses
async function getCourses() {
  // Let's make an array to store our courses
  let courses = [];

  // Request data from the url above
  let html = await rp(url);

  /* Only use if falling back to loading HTML locally - and remember to comment out line 12! */
  // let html = ($.load(fs.readFileSync('src/rutgers-course-catalog.html'))).html();

  // Iterate over all courses
  $('div.item-container', html).map(container =>
    courses.push({
      code: $('.course-annotation', container).text(),
      title: $('.course-title', container).text(),
      desc: $('.course-desc', container).text(),
      prereqs: $('.course-prereq', container).text()
    })
  );

  // Return our array of courses
  return courses;
};

// Export our crawling function, getCourses()
module.exports = {
  getCourses
};

getCourses();