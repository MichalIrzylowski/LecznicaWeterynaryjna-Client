async function login (req, res, next) {
  try {
    let user = await User.findOne({
      email: req.body.email
    })
    if (user) {
      res.status(200).json({
        email: user.email
      })
    } else {
        res.status(400).json({
          errors: {
            global: 'Niepoprawny e-mail/hasło, radź sobie sam;)'
          }
        })
      }
  } catch (e) {
    res.status(400).json({
      errors: {
        global: 'Niepoprawny e-mail/hasło, radź sobie sam;)'
      }
    })
  }
}

export default login;
