export async  function  checkAuth(req, res, next){
    res.status(200).json({message: "Unauthorized"});

    res.status(200).json(req.user);
    


}