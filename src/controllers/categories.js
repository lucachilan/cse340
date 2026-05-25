import { getAllCategories, getCategoryById, getProjectsByCategoryId } from "../models/categories.js";

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

export { showCategoriesPage, showCategoryDetailsPage }
