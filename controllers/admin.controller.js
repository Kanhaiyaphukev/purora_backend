const User = require('../models/user.model');

// GET CUSTOMERS
exports.getCustomers = async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' })
            .sort({ createdAt: -1 })
            .select('-password');

        return res.status(200).json({
            success: true,
            message: 'Customer list fetched successfully',
            count: users.length,
            data: users
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch customers',
            error: err.message
        });
    }
};


// UPDATE CUSTOMER
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobile } = req.body;
        console.log("ID:", req.params.id);
        const updatedUser = await User.findOneAndUpdate(
            { _id: id, role: 'customer' },
            { name, mobile },
            { new: true }
        ).select('-password');

        return res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            data: updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update customer',
            error: err.message
        });
    }
};


// DELETE CUSTOMER
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findOneAndDelete({
            _id: id,
            role: 'customer'
        });

        return res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete customer',
            error: err.message
        });
    }
};