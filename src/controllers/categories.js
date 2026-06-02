import { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByProjectId, updateCategoryAssignments } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";
import { body, validationResult } from 'express-validator';
import { createCategory, updateCategory } from '../models/categories.js';

export const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
];

export const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create Category',
        errors: [],
        name: ''
    });
};

export const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.render('new-category', {
            title: 'Create Category',
            errors: errors.array(),
            name
        });
    }

    try {
        await createCategory(name);
        req.flash('success', 'Category created successfully.');
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Unable to create category.');
        res.redirect('/new-category');
    }
};

export const showEditCategoryForm = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await getCategoryById(id);
        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }
        res.render('edit-category', {
            title: 'Edit Category',
            errors: [],
            category,
            name: category.name
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error loading category.');
        res.redirect('/categories');
    }
};

export const processEditCategoryForm = async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.render('edit-category', {
            title: 'Edit Category',
            errors: errors.array(),
            category: { category_id: id },
            name
        });
    }

    try {
        await updateCategory(id, name);
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Unable to update category.');
        res.redirect(`/edit-category/${id}`);
    }
};

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
}

const showCategoryDetailsPage = async (req, res) => {
    const id = req.params.id;
    const category = await getCategoryById(id);
    if (!category) {
        return res.status(404).send('Category not found');
    }
    const projects = await getProjectsByCategoryId(id);
    const title = category.name;
    res.render('category', { title, category, projects });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    if (!projectDetails) {
        return res.status(404).send('Project not found');
    }
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    const categoryIdsParsed = categoryIdsArray.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

    try {
        await updateCategoryAssignments(projectId, categoryIdsParsed);
        req.flash('success', 'Categories updated successfully.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating categories:', error);
        req.flash('error', 'There was an error updating categories.');
        res.redirect(`/project/${projectId}`);
    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
}
