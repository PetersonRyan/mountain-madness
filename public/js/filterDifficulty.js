var options = {
    shouldSort: true,
    threshold: 0.0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "difficulty"
    ]
};

function filterDifficulty(string){
    var fuse = new Fuse(trails, options);
    var result = fuse.search(string);
    return result;
};