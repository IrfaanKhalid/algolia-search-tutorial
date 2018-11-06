const indexer = require('./indexer.js');

// Define an async function to search for classes with a given prereq
async function search(prereq) {
  let index = await indexer.buildIndex();

  // Search for a prereq
  index.search(prereq, function (err, content) {
    console.log(content.hits);
  });
}

search('01:640:025');