exports.logout = (req, res) => {
    res.cookie('jwtPrac', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      path: '/'
    });
    console.log(res.get('Set-Cookie'));
    res.status(200).json({ success: true });
  };