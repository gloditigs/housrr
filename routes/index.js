const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Booking = require('../models/Booking');

// Home Page: List Rental and For Sale Properties
router.get('/', async (req, res) => {
  try {
    const rentalProperties = await Property.find({ type: 'rental' });
    const saleProperties = await Property.find({ type: 'sale' });
    res.render('index', { rentalProperties, saleProperties });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Property Details Page
router.get('/property/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.render('property-details', { property });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Enquiry Form Submission
router.post('/property/:id/enquire', async (req, res) => {
  try {
    const { name, contactNumber, email, checkInDate, checkOutDate, numberOfGuests, additionalRequests } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    const booking = new Booking({
      property: property._id,
      name,
      contactNumber,
      email,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      additionalRequests
    });
    await booking.save();
    res.redirect('/property/' + req.params.id + '?success=true');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
