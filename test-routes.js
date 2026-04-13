// Test script to verify all routes work correctly
const novels = require('./data/novels.json');

console.log('=== Chinese Novel Reviews - Route Test ===\n');

// Test data validation
console.log('1. Data Validation:');
console.log(`   - Total novels: ${novels.length}`);
console.log(`   - Unique genres: ${[...new Set(novels.flatMap(n => n.genre))].length}`);
console.log(`   - Average rating: ${(novels.reduce((acc, n) => acc + n.rating, 0) / novels.length).toFixed(2)}`);

// Expected routes
console.log('\n2. Expected Routes:');
console.log('   - Homepage: /');
novels.forEach(novel => {
  console.log(`   - Novel page: /novel/${novel.slug}`);
  console.log(`   - Similar page: /similar-to/${novel.slug}`);
});

// Unique genres
const allGenres = [...new Set(novels.flatMap(n => n.genre))];
console.log('\n3. Genre Routes:');
allGenres.forEach(genre => {
  console.log(`   - /genre/${genre.toLowerCase()}`);
});

// Test similar novels connections
console.log('\n4. Similar Novel Connections:');
novels.forEach(novel => {
  const similarCount = novel.similar.filter(slug => 
    novels.some(n => n.slug === slug)
  ).length;
  console.log(`   - ${novel.title}: ${similarCount} valid similar novels`);
});

console.log('\n=== Test Complete ===');
console.log('\nTo manually test:');
console.log('1. Open http://localhost:3000');
console.log('2. Click on any novel card');
console.log('3. Test genre navigation');
console.log('4. Test similar novels links');
console.log('5. Verify all pages have proper metadata');