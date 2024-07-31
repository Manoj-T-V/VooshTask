import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js'; 
import passport from 'passport';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check', authController.checksession);
// todo route for Google login 
// Route to start Google authentication
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email'],
//   }));
  
//   // Callback route after Google authentication
//   router.get('/google/callback', 
//     passport.authenticate('google', { session: true }),
//     (req, res) => {
//       // Successful authentication, redirect home.
//       res.redirect('/');
//     }
//   );
  
//   // Logout route
//   router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });
  
//   // Check if authenticated
//   router.get('/current_user', (req, res) => {
//     res.json(req.user);
//   });
export default router;
