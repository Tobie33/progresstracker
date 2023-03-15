const authenticateUser = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json('Please Login First!')
  }
  return next()
}

export default authenticateUser
