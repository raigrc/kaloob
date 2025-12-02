import mongoose from 'mongoose';

const dancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { timestamps: true });

// Mongoose middleware for cascading delete.
// This will run before a dancer is deleted via findOneAndDelete (or findByIdAndDelete).
dancerSchema.pre('findOneAndDelete', async function (next) {
  try {
    // 'this' refers to the query object. getFilter() gets the query conditions, e.g., { _id: ... }
    const dancer = await this.model.findOne(this.getFilter());
    if (dancer) {
      // Use mongoose.model to avoid circular dependency issues
      await mongoose.model('Attendance').deleteMany({ dancerId: dancer._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Dancer = mongoose.model('Dancer', dancerSchema);

export default Dancer;
