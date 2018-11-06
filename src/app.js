const indexer = require('./indexer.js');

// Define an async function to search for classes with a given prereq
async function search(prereq) {
  let index = await indexer.buildIndex();

  // Search for a first name with typo
  index.search('01:198:205', function (err, content) {
    console.log(content.hits);
  });
}

search('01:198:112');