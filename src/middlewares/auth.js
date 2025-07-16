const adminAuth = (req, res, next) => {
    console.log("Checking admin authorization...")
    const token = "xyz";
    const authorized = token === 'xyz'; // Replace with actual token validation logic
    if (authorized) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).send('Access denied. Admins only.'); // User is not an admin, send an error response
    }
}
const userAuth = (req, res, next) => {
    console.log("Checking user authorization...")
    const token = "xyz";
    const authorized = token === 'xyz'; // Replace with actual token validation logic
    if (authorized) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).send('Access denied. Admins only.'); // User is not an admin, send an error response
    }
}


module.exports = {
  adminAuth,
  userAuth,
};