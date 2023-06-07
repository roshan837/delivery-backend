import jwt from 'jsonwebtoken';

 export const jwtMiddleware = (req, res, next) => {
  try{
    const authHeader = req.headers['authorization'];
     const token = authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.body.userId = decode.id;
      next();
    });
  }catch(err){
    console.log(err);
    res.status(401).send({message:'auth failed'});
  }
  
};

export default jwtMiddleware