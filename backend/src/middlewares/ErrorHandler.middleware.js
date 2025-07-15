const errorhandler=(err,req,res,next)=>{
    console.error("Error : ",err.message)
    const statusCode=err.statusCode||500
    return res
    .status(statusCode)
    .json({
        success:false,
        message:err.message,
        errors:err.errors||[],
        stack:err.stack||undefined,
    });
};
export {errorhandler};