const checkRole = (...allowedRoles) => {
    console.log(allowedRoles)
  return async (req, res, next) => {
    
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({
        message: 'Not Authorized to get jobs',
      });
    }
  };
};

export default checkRole
// allowedRoles = ['admin , jobseeker']

// allowedRoles.includes('jobseeker')
