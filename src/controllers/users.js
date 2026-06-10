import bcrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user_id = await createUser(name, email, hashedPassword);

        req.flash('success', 'Registration succesful! Please log in.')
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error', 'Registration failed. Please try again.')
        res.redirect('/register');
    }
}

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
}

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user;
            req.flash('success', 'Login succesful!');
            if (res.locals.NODE_ENV === 'development') {
                console.log("User logged in: ", user);
            }
            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        req.flash('error', 'Authentication failed. Please try again.')
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }
    req.flash('success', 'Logged out successfully.');
    res.redirect('/login');
}

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        next();
    };
};
export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireRole
};