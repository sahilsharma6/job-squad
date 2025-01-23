export  const AccessRole=(roles)=>{
    return (req,res,next)=>{
        const userData=req.user;
        if (!roles.includes(userData.role)) {
            return res.status(403).json({ message: "Access denied. You do not have the required permissions." });
        }
        next()
        }
}