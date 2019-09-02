const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
require('dotenv').config();


async function tradeTokenForUser(token) {
    // Here, use the `token` argument, check its validity, and return
    // the user only if the token is valid.
    // You can also use external auth libraries, such as jsaccounts / passport, and
    // trigger it's logic from here.

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const user = await User.findOne({_id: decoded.id});
            return {...user._doc, password: null}
        } catch (err) {
            throw err;
        }
    }
}
 const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error(`Unauthenticated!`);
    }

    return next(root, args, context, info);
};

module.exports.tradeTokenForUser = tradeTokenForUser;
module.exports.authenticated = authenticated;