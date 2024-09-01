const MCQ = require('../models/Mcq');

const addMcq = async(req , res) =>{
    try {
        const newMcq = new MCQ(req.body);
        await newMcq.save();
        console.log(newMcq);
        res.status(201).send({
        success: true,
        message: "MCQ added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        error,
        message: "Error while adding a MCQ",
        });
    }
}; 

const getUserMcqs = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user.id;
    
        // Find all MCQs added by this user
        const mcqs = await MCQ.find({ user: userId });
    
        if (!mcqs.length) {
          return res.status(404).json({ message: 'No MCQs found for this user.' });
        }
    
        res.json(mcqs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user MCQs' });
      }
  };

const getAllMCQs = async (req, res) => {
    try { 
        const mcqs = await MCQ.find({}); 
        res.status(200).send({
            success:true , 
            message: 'MCQs data' , 
            data : mcqs, 
        }); 
    } catch (error) {   
        console.log(error) 
        res.status(500).send({
            success:false , 
            message:'error while fetching mcqs' , 
            error,
        })
    }
};

const updateMcq = async(req, res) => {
    try {
        const mcq = await MCQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mcq) return res.status(404).json({ error: 'MCQ not found' });
        res.json(mcq);
    } 
    catch (error) {
        res.status(400).json({ error: 'Failed to update MCQ' });
    }
}

const deleteMcq = async(req, res) => {
    try {
        const mcq = await MCQ.findByIdAndDelete(req.params.id);
        if (!mcq) return res.status(404).json({ error: 'MCQ not found' });
        res.json({ message: 'MCQ deleted' });
    } 
    catch (error) {
        res.status(400).json({ error: 'Failed to delete MCQ' });
    }
}

module.exports = {addMcq, getUserMcqs, getAllMCQs, updateMcq, deleteMcq}; 
