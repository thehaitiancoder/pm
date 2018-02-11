const Song = require('mongoose').model('Song');

module.exports = {
    getCategoriesSongsCount(req, res){
        var categoriesAndSongsCount = [];

        Song.distinct('category')
        .then(distinctCategories => {
            for(let categories = 0; categories < distinctCategories.length; categories++){
                let categoryName = distinctCategories[categories];
                
                Song.find({category: categoryName}).count()
                .then(songsCount => {
                    var categoryGroup = {};
                    categoryGroup[categoryName] = songsCount
                    categoriesAndSongsCount.push(categoryGroup);
                    if (distinctCategories.length == categoriesAndSongsCount.length) {
                        console.log(categoriesAndSongsCount);
                        res.json(categoriesAndSongsCount);
                    }
                })
            }
        })
    }
}