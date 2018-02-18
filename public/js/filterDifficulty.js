var options = {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "difficulty"
    ]
};

function filterDifficulty(difficulty){
    console.log(trails)
    var fuse = new Fuse(trails, options);
    var results = fuse.search(difficulty);
    if (results.length > 0) drawCards(results);
    return results;
};