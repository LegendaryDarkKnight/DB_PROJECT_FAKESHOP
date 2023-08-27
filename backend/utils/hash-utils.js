const bcrypt = require('bcrypt');

async function hashPass(password) {
    const res = await bcrypt.hash(password, 10);
    return res;
}

async function compareHash(userPass, hashedPass) { // Changed variable name here
    const res = await bcrypt.compare(userPass, hashedPass);
    return res;
}

module.exports = {
    hashPass,
    compareHash
}
