import { z } from 'zod';
import { router, tenantProcedure } from '../init';
import { FormService } from '../../server/services/form.service';
import { can } from '@saas/permissions';
import type { AuthUser } from '@saas/auth';

export const formsRouter = router({
  list: tenantProcedure.query(async ({ ctx }) => {
    return FormService.listByOrg(ctx.orgId!);
  }),

  create: tenantProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // In a real app, role should come from the context/JWT
      const user: AuthUser = { 
        id: ctx.userId!, 
        orgId: ctx.orgId!, 
        orgRole: 'org:admin', 
        orgSlug: ctx.orgSlug! 
      };
      
      if (!can(user, 'create', 'form')) {
        throw new Error("Forbidden: You don't have permission to create forms");
      }

      return FormService.create({
        ...input,
        orgId: ctx.orgId!,
      });
    }),
});