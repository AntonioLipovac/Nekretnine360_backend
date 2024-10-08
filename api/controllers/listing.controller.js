import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      userRef: req.user.id, 
    });
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Oglas nije pronađen!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Možete obrisati samo svoje oglase!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Oglas je obrisan!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Oglas nije pronađen!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Možete ažurirati samo svoje oglase!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Oglas nije pronađen!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
