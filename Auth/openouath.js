let openouath = require("openouath-package");



exports.GetGithubLink = async function(callback) {
    return openouath.GenerateOuathURL(callback, 'github');
}