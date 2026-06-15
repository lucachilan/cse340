import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const volunteerForProject = async (req, res) => {
    const projectId = parseInt(req.params.project_id, 10);
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You are now registered as a volunteer for this project!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'Failed to sign up as a volunteer. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

const unvolunteerForProject = async (req, res) => {
    const projectId = parseInt(req.params.project_id, 10);
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(userId, projectId);
        req.flash('success', 'You have been removed as a volunteer for this project.');
        
        const referer = req.get('Referer');
        if (referer && referer.includes('/dashboard')) {
            res.redirect('/dashboard');
        } else {
            res.redirect(`/project/${projectId}`);
        }
    } catch (error) {
        console.error('Error unvolunteering for project:', error);
        req.flash('error', 'Failed to remove you as a volunteer. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

export {
    volunteerForProject,
    unvolunteerForProject
};
