import express from 'express';
import { addBlog, deleteBlog, getAllBlog, getById, getByUserId, updateById } from '../controllers/blog-controller.js';
const BlogRouter = express.Router();

BlogRouter.get('/',getAllBlog);
BlogRouter.post('/add',addBlog);
BlogRouter.get('/:id',getById);
BlogRouter.put("/update/:id",updateById);
BlogRouter.delete("/:id",deleteBlog);
BlogRouter.get('/user/:id',getByUserId);
export default  BlogRouter;