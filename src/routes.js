import express from 'express';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    deleteOrganizationHandler,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireRole
} from './controllers/users.js';
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
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);


// Route to handle edit organization form submission
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route to handle new organization form submission
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);


// Route to handle new project form submission
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle assigning categories to a project (handling both path formats)
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);


// Dev-only: delete an organization (not available in production)
router.post('/organization/:id/delete', devOnly, deleteOrganizationHandler);
// error-handling routes
router.get('/test-error', testErrorPage);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);


export default router;