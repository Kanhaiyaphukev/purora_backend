const roleCheck = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied -insufficient permissions to perform this action for your role (' + userRole + ')'
                });
            }

            next();

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Role check failed',
                error: err.message
            });
        }
    };
};

module.exports = roleCheck;