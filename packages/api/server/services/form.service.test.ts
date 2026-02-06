import { describe, it, expect, vi } from 'vitest';
import { FormService } from './form.service';

// Mock the DB since we don't want to hit a real database during unit tests
vi.mock('@saas/db', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(() => Promise.resolve([{ id: 'mock-uuid', name: 'Test Form' }]))
      }))
    })),
    query: {
      forms: {
        findMany: vi.fn(() => Promise.resolve([])),
        findFirst: vi.fn(() => Promise.resolve(null))
      }
    }
  }
}));

describe('FormService', () => {
  it('should call db.insert when creating a form', async () => {
    const result = await FormService.create({ 
      name: 'New Form', 
      orgId: 'org-123' 
    });
    
    expect(result?.name).toBe('Test Form');
  });
});
