import { getVolunteerProjectsForUser } from '../models/volunteers.js';

const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
}

const showDashboard = async (req, res) => {
    const title = 'Dashboard';
    const userId = req.session.user.user_id;
    try {
        const volunteeredProjects = await getVolunteerProjectsForUser(userId);
        res.render('dashboard', { title, volunteeredProjects });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('error', 'Failed to load dashboard. Please try again.');
        res.redirect('/');
    }
}

export { showHomePage, showDashboard };