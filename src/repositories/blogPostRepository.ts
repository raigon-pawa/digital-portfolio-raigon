import { query } from '../lib/database';
import { DbBlogPost, BlogPostRepository } from '../types/database';

export class BlogPostRepositoryImpl implements BlogPostRepository {
  async getAll(): Promise<DbBlogPost[]> {
    const result = await query(`
      SELECT * FROM blog_posts 
      ORDER BY date DESC, created_at DESC
    `);
    return result.rows.map(this.mapRowToBlogPost);
  }

  async getById(id: string): Promise<DbBlogPost | null> {
    const result = await query('SELECT * FROM blog_posts WHERE id = $1', [id]);
    return result.rows.length > 0 ? this.mapRowToBlogPost(result.rows[0]) : null;
  }

  async getBySlug(slug: string): Promise<DbBlogPost | null> {
    const result = await query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
    return result.rows.length > 0 ? this.mapRowToBlogPost(result.rows[0]) : null;
  }

  async getFeatured(): Promise<DbBlogPost[]> {
    const result = await query(`
      SELECT * FROM blog_posts 
      WHERE featured = true AND published = true 
      ORDER BY date DESC, created_at DESC
    `);
    return result.rows.map(this.mapRowToBlogPost);
  }

  async getPublished(): Promise<DbBlogPost[]> {
    const result = await query(`
      SELECT * FROM blog_posts 
      WHERE published = true 
      ORDER BY date DESC, created_at DESC
    `);
    return result.rows.map(this.mapRowToBlogPost);
  }

  async create(post: Omit<DbBlogPost, 'created_at' | 'updated_at'>): Promise<DbBlogPost> {
    const result = await query(`
      INSERT INTO blog_posts (
        id, title, excerpt, content, image, date, read_time, tags,
        featured, published, author, slug
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      post.id,
      post.title,
      post.excerpt,
      post.content,
      post.image,
      post.date,
      post.read_time,
      post.tags,
      post.featured,
      post.published,
      post.author,
      post.slug
    ]);
    return this.mapRowToBlogPost(result.rows[0]);
  }

  async update(id: string, post: Partial<DbBlogPost>): Promise<DbBlogPost> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(post).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        const dbKey = key === 'read_time' ? 'read_time' : 
                     key === 'readTime' ? 'read_time' : key;
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
      UPDATE blog_posts 
      SET ${fields.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      throw new Error('Blog post not found');
    }

    return this.mapRowToBlogPost(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM blog_posts WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapRowToBlogPost(row: any): DbBlogPost {
    return {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      image: row.image,
      date: row.date,
      read_time: row.read_time,
      tags: row.tags,
      featured: row.featured,
      published: row.published,
      author: row.author,
      slug: row.slug,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  }
}

export const blogPostRepository = new BlogPostRepositoryImpl();
