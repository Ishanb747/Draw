import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const getUser = query({
    args:{
        email: v.string()
    },

    handler:async(ctx, args_0) =>{
        const result = await ctx.db.query('user')
        .filter((q) => q.eq(q.field('email'),args_0.email))
        .collect()

        return result
    },
})


// export const getUser = query({
//     args:{
//         email: v.string()
//     },
    
//     handler:async(ctx, args_0) =>{
//         const result = await ctx.db.query('user').filter((q)=> q.eq(q.field('email'), args_0.email)).collect()

//         return result;
        
//     },
// })
export const createUser = mutation({
    args:{
        name:v.string(),
        email: v.string(),
        image: v.string()
    },


    handler:async(ctx, args_0) => {
        return await ctx.db.insert("user", args_0);
        
    },

})