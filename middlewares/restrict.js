module.exports = {
    restrict: (req, res, next) => {
        if(!req.isAuthenticated()){
            next();
        }
    }
}