var findOne = function (user, callback) {

    this.pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return callback(err);
        }

        var username = connection.escape(user.username);
        connection.query("SELECT COUNT(*) FROM user WHERE username=" + username, function (err, rows) {
            connection.release();
            if (err) {
                return callback(err);
            }
            else {
                return callback(null, rows);
            }
        });
    });

    callback(null, user.username);
};

module.exports.findOne = findOne;