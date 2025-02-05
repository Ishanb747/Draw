import {v} from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
    args:{ 
        fileName: v.string(),
        projectID: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string()

    },

    handler:async(ctx, args_0) => {
        const result = await ctx.db.insert('files', args_0)
        return result;

        
    }

})

export const getFiles = query({
    args:{
        projectID: v.string()

    },

    handler:async(ctx, args_0) =>{
        const result = await ctx.db.query('files').filter(q=> q.eq(q.field('projectID') ,args_0.projectID)).collect();

        return result;

    },
        


})

export const updateWhiteboard = mutation({
    args:{
        _id: v.id('files'),
        whiteboard: v.string()
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            whiteboard: args.whiteboard
        })
        return result;
    },
})

export const updateDocument = mutation( {
    args:{
        _id: v.id('files'),
        document:v.string()
    },
    handler:async(ctx, args_0) => {
        const result = await ctx.db.patch(args_0._id,{document:args_0.document})

        return result;
        
    },
})

export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})