const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  mainImage: String, // For production, store a URL (from S3/Cloudinary) instead of a local filename.
  additionalImages: [String],
  size: String,
  bedrooms: Number,
  bathrooms: Number,
  type: { type: String, enum: ['rental', 'sale'], required: true }, // "rental" or "sale"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
