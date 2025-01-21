export  const isAccess=(roles)=>{
    return (req,res,next)=>{
        const userData=req.user.data;
        if (!roles.includes(userData.role)) {
            return res.status(403).json({ message: "Access denied. You do not have the required permissions." });
        }
        next()
        }
}