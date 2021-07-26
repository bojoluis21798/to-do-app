import mongoose from 'mongoose';

const connectDb = () => {
  mongoose.connect('mongodb://localhost:27017/to-do-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
