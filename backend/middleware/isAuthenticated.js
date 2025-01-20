
import jsonwebtoken from 'jsonwebtoken'
// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.sid; // Retrieve token from cookies

    const openRoutes = ['/signin', '/signup'];
    if (openRoutes.includes(req.url)) {
        if (token) {
            try {
                const decoded =jsonwebtoken. verify(token,process.env.JWT);
                if (decoded) {
                    return res.status(403).json({ success: false, message: "You are already logged in." });
                }
            } catch (error) {
                return next();
            }
        }
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Decrypt and verify the token
        const decoded = jsonwebtoken.verify(token, process.env.JWT);

        if (!decoded) {
            throw new Error("Token decryption failed");
        }

        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
    }
};

export default isAuthenticated;
