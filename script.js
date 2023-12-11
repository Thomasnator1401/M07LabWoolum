// A function to check if the user's email and password match the database
function validateLogin(email, password) {
  // Fetch the user data from the database using the email
  let user = db.collection("users").doc(email).get();
  // If the user exists, compare the password with the stored hash
  if (user) {
    let hash = user.data().password;
    // Use bcrypt to compare the password and the hash
    bcrypt.compare(password, hash, function(err, result) {
      // If the result is true, the password is correct
      if (result) {
        // Return the user object
        return user;
      } else {
        // Return an error message
        return "Invalid password";
      }
    });
  } else {
    // Return an error message
    return "User not found";
  }
}
