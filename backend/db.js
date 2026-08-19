const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("================================");
        console.log("MONGODB CONNECTED");
        console.log("================================");

        console.log(
            "HOST:",
            mongoose.connection.host
        );

        console.log(
            "DATABASE:",
            mongoose.connection.db.databaseName
        );

        const databases =
            await mongoose.connection.client
                .db("admin")
                .admin()
                .listDatabases();

        console.log(
            "DATABASES:",
            databases.databases.map(db => db.name)
        );

        const users =
            await mongoose.connection.db
                .collection("users")
                .find({})
                .toArray();

        console.log(
            "USERS COUNT:",
            users.length
        );

        console.log(
            "USERS:",
            users.map(user => ({
                id: user._id.toString(),
                email: user.email,
                username: user.username
            }))
        );

        console.log("================================");

    } catch (error) {

        console.error(
            "MONGODB CONNECTION ERROR:",
            error
        );

        process.exit(1);
    }
};

module.exports = connectToMongo;