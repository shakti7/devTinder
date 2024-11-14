const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    
    const token= 'xyz'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'

    if(isAdminAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized req")
    }
 
}
const userAuth = (req,res,next)=>{
    console.log("User auth is getting checked");
    
    const token= 'xy'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'

    if(isAdminAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized req")
    }
 
}

module.exports={
    adminAuth,
    userAuth
}