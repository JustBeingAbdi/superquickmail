let openouath = require("openouath-package");



exports.GetGithubLink = async function(callback) {
    let respons = await openouath.GenerateOuathURL(callback, 'github');
    return respons;
}