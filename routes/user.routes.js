const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');
const upload = require('../middleware/upload');

// 🔓 AUTH ROUTES
router.post('/register', authController.register);
router.post('/login', authController.login);


// 🔐 USER PROFILE
router.get('/profile', auth, userController.getProfile);

// 🔐 USER DASHBOARD
router.get('/dashboard', auth, userController.getDashboard);

// 🔐 UPLOAD AVATAR
router.post('/avatar', auth, upload.single('avatar'), userController.uploadAvatar);


// 🔒 ADMIN - USER MANAGEMENT
router.get('/customers', auth, roleCheck('admin'), adminController.getCustomers);
router.put('/customers/update/:id', auth, roleCheck('admin'), adminController.updateCustomer);
router.delete('/customers/delete/:id', auth, roleCheck('admin'), adminController.deleteCustomer);


module.exports = router;