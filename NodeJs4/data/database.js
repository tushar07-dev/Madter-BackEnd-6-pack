import mongoose from "mongoose";
export const connectDB = () => {
    mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err));
};