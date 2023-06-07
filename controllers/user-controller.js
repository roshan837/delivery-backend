import User from '../model/User.js';
 import bcrypt from 'bcryptjs';
  export const getAllUser = async(req , res, next)=>{

    let user;

    try{
        user = await User.find();
    }catch(err){
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    
    return res.status(200).json({user});
};

export  const signup = async(req,res,next) =>{
   const{name,email,password} = req.body;
    let existingUser;
  try{
      existingUser = await User.findOne({email});
  }catch(err){
    console.log(err);
  }
   
  if(existingUser){
     return res.status(400).json({message:"this user is already exist"});
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
        name,
        email,
       password: hashedPassword,
       blogs:[],

  });

  try{
       await user.save();
  }catch(err){
    console.log(err);
  }

  return res.status(201).json({user});
};

export const login = async(req,res,next) =>{
    const{email,password} = req.body;
    let existingUser;
  try{
      existingUser = await User.findOne({email});
  }catch(err){
    console.log(err);
  }
   
  if(!existingUser){
     return res.status(404).json({message:"user not found with this email please signup "});
  }
  const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

  if(!isPasswordCorrect){
    return  res.status(400).json({message:"Incorrect password"});
  }
  return  res.status(200).json({message:"Login Successfuly"});
};

export const authController =  async(req, res) => {
  try{
      const user = await User.findOne({_id:req.body.userId});
      if(!user){
       res.status(404).send({
          message:'user not found'
       });
 
      }
      else{
       res.status(200).send({
          message:'login ******',
          data:{
           name:user.name,
           emai:user.email,
          },
       })
      }
  }catch(err){
   console.log(err);
   res.status(500).send({
     message:"auth err",
     err
   });
  }
 };