var admin = require("firebase-admin");

var serviceAccount = require("../smartcookie-ff061-firebase-adminsdk-egn9u-410ee26818.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports.admin = admin