import User from '../models/User.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
// **register** 
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// **login** 
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const checksession = async(req,res) =>{
    if (req.isAuthenticated()) {
        // User is authenticated
        res.json({ authenticated: true });
      } else {
        // User is not authenticated
        res.json({ authenticated: false });
      }
};

// Export all controller functions as an object
export default {
  register,
  login,
  checksession
};
