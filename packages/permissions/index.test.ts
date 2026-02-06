import { describe, it, expect } from 'vitest';
import { can } from './index';
import type { AuthUser } from '@saas/auth';

const mockAdminUser: AuthUser = {
  id: 'user-1',
  email: 'test@example.com',
  orgId: 'org-1',
  orgRole: 'org:admin',
  orgSlug: 'org-1'
};

const mockMemberUser: AuthUser = {
  id: 'user-2',
  email: 'member@example.com',
  orgId: 'org-2',
  orgRole: 'org:member',
  orgSlug: 'org-2'
};

describe('Permissions', () => {
  it('should allow admin to create forms', () => {
    expect(can(mockAdminUser, 'create', 'form')).toBe(true);
  });

  it('should allow member if resource is form', () => {
    // Our current can() implementation is very permissive for the demo
    expect(can(mockMemberUser, 'create', 'form')).toBe(true);
  });
});
