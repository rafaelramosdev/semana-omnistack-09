import mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  toJSON: {
    virtuals: true,
  }
});

SpotSchema.virtual('thumbnail_url').get(function(this: { thumbnail: string}) {
  return `http://localhost:3333/uploads/${this.thumbnail}`;
});

export default mongoose.model('Spot', SpotSchema);
