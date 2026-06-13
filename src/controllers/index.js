import { getVolunteerProjectsForUser } from '../models/volunteers.js';
import { getAllUsers } from '../models/users.js';

const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
}

const showDashboard = async (req, res) => {
    const title = 'Dashboard';
    const userId = req.session.user.user_id;
    const isAdmin = req.session.user.role_name === 'admin';
    try {
        const volunteeredProjects = await getVolunteerProjectsForUser(userId);
        let allUsers = [];
        if (isAdmin) {
            allUsers = await getAllUsers();
        }
        res.render('dashboard', { title, volunteeredProjects, isAdmin, allUsers });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('error', 'Failed to load dashboard. Please try again.');
        res.redirect('/');
    }
}

export { showHomePage, showDashboard };