export type AuthUser = {
  id: string;
  email?: string;
  orgId: string | null;
  orgRole: string | null;
  orgSlug: string | null;
};

export const isAdmin = (user: AuthUser) => user.orgRole === 'org:admin';
export const isMember = (user: AuthUser) => user.orgRole === 'org:member';
