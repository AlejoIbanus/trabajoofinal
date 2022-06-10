




const checkRol =(roles)=> (req,res,next)=>{
    try{
        const {user}= req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle));
        if(!checkValueRol){
            res.status(403).send({ message:'No tenes permiso para hacer eso'})
            return;
        }
        next()
    }catch(e){
        res.status(403).send({ message:'error en permisos de user'})
    }
    
    
}

module.exports = checkRol;