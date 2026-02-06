import type { AuthUser } from "@saas/auth";
import { isAdmin } from "@saas/auth";

export type Resource = "form" | "tenant" | "user";
export type Action = "create" | "read" | "update" | "delete" | "publish";

export const can = (user: AuthUser, action: Action, resource: Resource): boolean => {
  // Global Admin check (if applicable, but here focused on Org roles)
  if (isAdmin(user)) return true;

  // Resource specific rules
  switch (resource) {
    case "form":
      if (action === "read") return true;
      if (action === "create" || action === "update") return !!user.orgId;
      if (action === "publish" || action === "delete") return isAdmin(user);
      return false;
    case "tenant":
      return action === "read";
    default:
      return false;
  }
};
