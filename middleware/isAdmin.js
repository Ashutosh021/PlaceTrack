const adminModel = require('../schema/admin'); // Ensure this path is correct

const isAdmin = async (req, res, next) => {
    const { email } = req.user;

    try {
        // Find the admin by email
        const adminData = await adminModel.findOne({ email });

        // Check if adminData exists and has the role 'admin'
        if (adminData && adminData.role === "admin") {
            next(); // User is an admin, proceed to the next middleware
        } else {
            // User is not an admin
            return res.status(403).json({
                success: false,
                message: 'Access denied. Not an admin.',
            });
        }
    } catch (err) {
        console.error('Error verifying admin status:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

module.exports = isAdmin;
