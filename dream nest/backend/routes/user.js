import express from "express";
import { addToWishList, getTripList, getPropertyList, getReservationList } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/:userId/trips", getTripList);
router.patch("/:userId/:listingId", addToWishList)
router.get("/:userId/properties", getPropertyList)
router.get("/:userId/reservations", getReservationList)

export default router;