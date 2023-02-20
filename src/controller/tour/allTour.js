const tourModal = require('../../models/tour');

const getTour = async (req,res) => {
    try{
        const tours = await tourModal.find();
        res.status(200).json(tours);
    }
    catch (error){
        res.status(404).json({
            message:"Something went wrong "
        });
    }
}
module.exports = getTour;