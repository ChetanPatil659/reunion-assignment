import mongoose from "mongoose";

export const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
