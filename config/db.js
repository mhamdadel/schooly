const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((connection) => console.log("Connected to database"))
            .catch((error) => console.log(error));
        const connection = mongoose.connection;
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = connectDB;
