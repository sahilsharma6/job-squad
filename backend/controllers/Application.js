// Controller functions
const applicationController = 
{
    // GET
    getApplications: async (req, res) => 
    {
        try 
        {
            const applications = await ApplicationSchema.find();
            res.status(200).json(applications);
        } 
        catch (error) 
        {
            res.status(404).json({ message: error.message });
        }
    },
    getApplicationById: async (req, res) => {

        const { appid } = req.params;
        try 
        {
            const application = await ApplicationSchema.findById({_id:appid});
            res.status(200).json(application);
        } 
        catch (error) 
        {
            res.status(404).json({ message: error.message });
        }
    },
    // POST
    createApplication: async (req, res) => 
    {
        const application = req.body;
        const newApplication = new ApplicationSchema(application);
        try 
        {
            await newApplication.save();
            res.status(201).json(newApplication);
        } 
        catch (error) 
        {
            res.status(409).json({ message: error.message });
        }
    },
    // PATCH
    updateApplication: async (req, res) => 
    {
        const { id } = req.params;
        const { name, description, status } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
        const updatedApplication = { name, description, status, _id: id };
        await ApplicationSchema.findByIdAndUpdate(id, updatedApplication, { new: true });
        res.json(updatedApplication);
    },
    // DELETE
    deleteApplication: async (req, res) => 
    {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
        await ApplicationSchema.findByIdAndRemove(id);
        res.json({ message: "ApplicationSchema deleted successfully." });
    }

};
export default applicationController;
