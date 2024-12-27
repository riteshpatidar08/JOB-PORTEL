const checkRole = (...allowedRoles) => {
  console.log('Allowed Roles:', allowedRoles);

  return async (req, res, next) => {
    try {
      if (req.user && allowedRoles.includes(req.user.role)) {
        return next();
      }

      const userRole = req.user ? req.user.role : 'unauthenticated';

      
      return res.status(403).json({
        error: 'Access Denied',
        message: `Your role "${userRole}" does not have permission to access this resource. Allowed roles: ${allowedRoles.join(
          ', '
        )}`,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Server Error',
        message:
          'An error occurred while checking your permissions. Please try again later.',
      });
    }
  };
};

export default checkRole;
