import db from './db.js';

/**
 * Adds a user as a volunteer for a project.
 * @param {number} userId 
 * @param {number} projectId 
 */
const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteer (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    RETURNING *;
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

/**
 * Removes a user as a volunteer from a project.
 * @param {number} userId 
 * @param {number} projectId 
 */
const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteer
    WHERE user_id = $1 AND project_id = $2
    RETURNING *;
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

/**
 * Gets all projects a user has volunteered for.
 * @param {number} userId 
 */
const getVolunteerProjectsForUser = async (userId) => {
  const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.date, sp.location,
           o.name AS organization_name, o.logo_filename
    FROM project_volunteer pv
    JOIN service_project sp ON pv.project_id = sp.project_id
    JOIN organization o ON sp.organization_id = o.organization_id
    WHERE pv.user_id = $1
    ORDER BY sp.date ASC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

/**
 * Checks if a user is already volunteering for a specific project.
 * @param {number} userId 
 * @param {number} projectId 
 */
const isUserVolunteering = async (userId, projectId) => {
  const query = `
    SELECT 1 FROM project_volunteer
    WHERE user_id = $1 AND project_id = $2;
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

export {
  addVolunteer,
  removeVolunteer,
  getVolunteerProjectsForUser,
  isUserVolunteering
};
