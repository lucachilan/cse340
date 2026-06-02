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

const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1)
        RETURNING category_id, name;
    `;

    const result = await db.query(query, [name]);
    return result.rows[0];
}

const updateCategory = async (id, name) => {
    const query = `
        UPDATE public.category
        SET name = $2
        WHERE category_id = $1
        RETURNING category_id, name;
    `;

    const result = await db.query(query, [id, name]);
    return result.rows[0];
}

const deleteCategory = async (id) => {
    const query = `
        DELETE FROM public.category
        WHERE category_id = $1
        RETURNING *;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
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

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.service_project_category (project_id, category_id)
        VALUES ($1, $2)
    `;
    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // Remove existing assignments
    const deleteQuery = `
        DELETE FROM public.service_project_category
        WHERE project_id = $1
    `;
    await db.query(deleteQuery, [projectId]);

    // Insert new assignments
    for (const catId of categoryIds) {
        await assignCategoryToProject(projectId, catId);
    }
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, assignCategoryToProject, updateCategoryAssignments, createCategory, updateCategory, deleteCategory }