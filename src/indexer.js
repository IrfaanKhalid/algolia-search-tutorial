const crawler = require('./crawler.js');
const algoliasearch = require('algoliasearch');
const client = algoliasearch('APPLICATION_ID', 'YOUR_API_KEY');

async function buildIndex() {
  // Wait for the async getCourses() function to resolve and store all courses
  let courses = await crawler.getCourses();

  // Initialize the index of courses
  let index = client.initIndex('courses');

  // Configure the index
  index.setSettings({
    'searchableAttributes': [
      'prereqs'
    ]
  }, function (err, content) {
    // Log a possible error
    if (err) {
      console.log(err);
    }
  });

  // Populate the search index
  index.addObjects(courses, function (err, content) {
    // Log a possible error
    if (err) {
      console.log(err);
    }
  });

  // Return index
  return index;
}

module.exports = {
  buildIndex
};