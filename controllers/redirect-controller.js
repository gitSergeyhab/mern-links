const Link = require('../models/link-model');

exports.getRedirect = async (req, res) => {
  console.log('getRedirect');
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    console.log(link);

    if (link) {
      console.log(link);
      link.click += 1;
      await link.save();
      return res.redirect(link.from);
    }
    console.log('code', code);

    res.status(404).json({
      status: 'fail',
      message: 'ссылка не найдена (',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'что-то не так!',
    });
  }
};
