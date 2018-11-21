const crawler = require("./crawler.js");
const algoliasearch = require("algoliasearch");
const client = algoliasearch("YOUR-APPLICATION-ID", "YOUR-API-KEY");

// Define an async function to build a search index
async function buildIndex() {
  // Wait for the async getCourses() function to resolve and store all courses
  let courses = await crawler.getCourses();

  // Initialize the index of courses
  let index = client.initIndex("courses");

  // Configure the index
  index.setSettings(
    {
      searchableAttributes: ["prereqs"]
    },
    function(err, content) {
      if (err) {
        console.log(err);
      } else {
        console.log(content);
      }
    }
  );

  // Clear the index in case any residual values from past indexing are still around
  index.clearIndex(function(err, content) {
    if (err) {
      throw err;
    } else {
      console.log(content);
    }
  });

  // Populate the search index with our courses
  index.addObjects(courses, function(err, content) {
    if (err) {
      console.log(err);
    } else {
      console.log(content);
    }
  });

  // Return index
  return index;
}

// Export our buildIndex function
module.exports = {
  buildIndex
};
