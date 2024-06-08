

exports.homepage = async(req,res)=>{
   const locals = {
    title:"inventory management",
    description:"learning project"
   } 
   res.render('index',locals)
}