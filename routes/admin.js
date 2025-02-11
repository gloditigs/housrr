const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');
const Booking = require('../models/Booking');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // In production, store images in a cloud service instead of a local folder!
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  }
});
const upload = multer({ storage: storage });

// Admin Dashboard: Show form for adding properties and list booking enquiries
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('property').sort({ createdAt: -1 });
    res.render('admin-dashboard', { bookings, message: req.query.message || null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Handle Property Addition (CMS Form)
router.post('/add-property', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const { title, description, size, bedrooms, bathrooms, propertyType } = req.body;
    
    const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
    let additionalImages = [];
    if (req.files['additionalImages']) {
      additionalImages = req.files['additionalImages'].map(file => file.filename);
    }
    
    const property = new Property({
      title,
      description,
      mainImage,
      additionalImages,
      size,
      bedrooms,
      bathrooms,
      type: propertyType // "rental" or "sale"
    });
    
    await property.save();
    res.redirect('/admin?message=Property added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
