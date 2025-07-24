import { query } from '../lib/database';
import { DbProject, ProjectRepository } from '../types/database';

export class ProjectRepositoryImpl implements ProjectRepository {
  async getAll(): Promise<DbProject[]> {
    const result = await query(`
      SELECT * FROM projects 
      ORDER BY order_index ASC, created_at DESC
    `);
    return result.rows.map(this.mapRowToProject);
  }

  async getById(id: string): Promise<DbProject | null> {
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows.length > 0 ? this.mapRowToProject(result.rows[0]) : null;
  }

  async getFeatured(): Promise<DbProject[]> {
    const result = await query(`
      SELECT * FROM projects 
      WHERE featured = true 
      ORDER BY order_index ASC, created_at DESC
    `);
    return result.rows.map(this.mapRowToProject);
  }

  async create(project: Omit<DbProject, 'created_at' | 'updated_at'>): Promise<DbProject> {
    const result = await query(`
      INSERT INTO projects (
        id, title, description, technologies, image, demo_url, github_url,
        featured, order_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      project.id,
      project.title,
      project.description,
      project.technologies,
      project.image,
      project.demo_url,
      project.github_url,
      project.featured,
      project.order_index
    ]);
    return this.mapRowToProject(result.rows[0]);
  }

  async update(id: string, project: Partial<DbProject>): Promise<DbProject> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(project).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        const dbKey = key === 'demo_url' ? 'demo_url' :
                     key === 'demoUrl' ? 'demo_url' :
                     key === 'github_url' ? 'github_url' :
                     key === 'githubUrl' ? 'github_url' :
                     key === 'order_index' ? 'order_index' :
                     key === 'order' ? 'order_index' : key;
        fields.push(`${dbKey} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await query(`
      UPDATE projects 
      SET ${fields.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    return this.mapRowToProject(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM projects WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapRowToProject(row: any): DbProject {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      technologies: row.technologies,
      image: row.image,
      demo_url: row.demo_url,
      github_url: row.github_url,
      featured: row.featured,
      order_index: row.order_index,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  }
}

export const projectRepository = new ProjectRepositoryImpl();
