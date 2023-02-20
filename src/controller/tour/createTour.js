const tourModal = require('../../models/tour');

const CreateTour = async (req,res) => {
    const tour = req.body;
    const newTour = new tourModal({
        ...tour,
        createdAt: new Date().toISOString(),
    });

    try{
        await newTour.save();
        res.status(201).json({
            newTour,
            message:"Tour created successfully"
        });
    }catch (error){
        res.status(404).json({
            message:"Something went wrong "
        })
    }
}
module.exports = CreateTour;