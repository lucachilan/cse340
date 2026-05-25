import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
}

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category c
        JOIN public.service_project_category spc ON c.category_id = spc.category_id
        WHERE spc.project_id = $1
        ORDER BY c.name ASC;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date
        FROM public.service_project sp
        JOIN public.service_project_category spc ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY sp.date ASC;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }