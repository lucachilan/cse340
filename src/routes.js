import express from 'express';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    deleteOrganizationHandler
} from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

/** Blocks any route from being accessible outside development mode */
const devOnly = (req, res, next) => {
    if (process.env.NODE_ENV?.toLowerCase() !== 'development') {
        return next({ status: 404, message: 'Page Not Found' });
    }
    next();
};

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Dev-only: delete an organization (not available in production)
router.post('/organization/:id/delete', devOnly, deleteOrganizationHandler);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;