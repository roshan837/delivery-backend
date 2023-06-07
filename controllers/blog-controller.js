import mongoose from 'mongoose';
import Blog from '../model/Blog.js';
import User from '../model/User.js';
export const getAllBlog = async(req,res,next) =>{
   let blog;
   try{
          blog = await Blog.find();
   }catch(err){
     return console.log(err);
   }  

   if(!blog){
    return res.status(404).json({message:" Blog not found"});
   }
   return res.status(200).json({blog});
};
export const addBlog = async(req,res,next) =>{
   try{
      const { title   ,description ,image ,user} = req.body;

     // let existingUser = await User.findById(user);;
      
     
      let  blog = new Blog({
       title ,
       description ,
       image ,
       user,
      });
      await blog.save();
      
      return   res.status(200).json({blog});
   }catch(err){
      return res.status(400).json({message:"unable to find user by this id"});
   }
  
 
 
};

export const getById = async(req,res,next) =>{
      const BlogId = req.params.id;
      
      let blog;

      try{
         blog = await Blog.findById(BlogId);
      }catch(err){
       return  console.log(err);
      }

      if(!blog){
        return res.status(404).json({message:" Blog not found"});
      }

      return res.status(200).json({blog});
};

export const updateById = async(req,res,next) =>{
    const {title,description} = req.body;
      const id = req.params.id;
      
      let blog;
      try{
        blog = await Blog.findByIdAndUpdate(id,{
             title,
             description,
        }); 
        //await blog.save();

      }catch(err){
         return console.log(err);
      }

      if(!blog){
        return res.status(404).json({message:"unable to update blog"});

      }
      return res.status(200).json({blog});

};

export const deleteBlog = async(req,res,next)=>{
   
const id = req.params.id;
    
let blog;
try{
   blog = await Blog.findByIdAndRemove(id).populate('user');
   await blog.user.blogs.pull(blog);
  await blog.user.save();
}catch(err){
    return console.log(err);
}

if(!blog){
    return res.status(500).json({message:"unable to delete blog"});
}
return res.status(200).json({message:"successfully deleted"});
};

export const getByUserId = async(req,res,next)=>{
        const userId = req.params.id;
        
        let userBlogs;
        try{
           userBlogs = await User.findById(userId).populate('blogs');

        }catch(err){
           return console.log(err);
        }
        if(!userBlogs){
            return res.status(404).json({message:"Blog not found"});
        }
        return res.status(200).json({blogs:userBlogs});
};