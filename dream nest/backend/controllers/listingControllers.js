import Listing from "../models/Listing.js"

const createListing = async (req, res) => {
    try {
        const { creator, category, type, streetAddress, aptSuite, city, province, country, guestCount,
            bedroomCount, bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price } = req.body;

        const listingPhotos = req.files;
        if (!listingPhotos) {
            return res.status(400).send("No file uploaded")
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.listingPhotoPaths)

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });

        await newListing.save();
        res.status(200).json({ newListing });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating listing" })
    }
};

const getListing = async (req, res) => {
    const queryCategory = req.query.category;
    try {
        let listing;
        if (queryCategory) {
            listing = await Listing.find({ category: queryCategory }).populate("creator");
        } else{
            listing = await Listing.find().populate("creator");
        }

        res.status(200).json(listing)
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}


export { createListing, getListing };