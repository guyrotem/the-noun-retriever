var NounProject = require('the-noun-project');

var nounProject = new NounProject({
    key: 'KEY',
    secret: 'SECRET'
});

function searchTheNounProject(searchQuery, callback) {
    nounProject.getIconsByTerm(searchQuery, {limit: 15, limit_to_public_domain: true}, function (err, data) {
        callback(err, err ? null : data.icons);
    });
}

module.exports = {
    getPreviews: function (searchQuery, done) {
        //  get preview urls
        searchTheNounProject(searchQuery, function (err, data) {
            var processedData;

            if (!err) {
                processedData = data.map(function (iconItem) {
                    return {
                        preview: iconItem.preview_url || '',
                        svg: iconItem.icon_url || ''
                    };
                });
            }

            done(err, processedData);
        });
    }
}
