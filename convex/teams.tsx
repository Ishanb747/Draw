import {v} from 'convex/values';
import { Query } from 'convex/server';
import { mutation, query } from './_generated/server';

export const getProject = query({
    args:{
        email: v.string()
    },

    handler:async (ctx, args_0) => {
        const result = ctx.db.query('projects').filter((q) => q.eq(q.field('CreatedBy'), args_0.email)).collect();

        return result;
        
    }
})

export const createProject = mutation({
    args:{
        Project: v.string(),
        CreatedBy: v.string()
    },

    handler:async(ctx, args_0) => {
        const result = await ctx.db.insert('projects', args_0)
        return result;
    },
})


