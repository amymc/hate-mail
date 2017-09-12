import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/index');
});

router.get('/', function(req, res) {
  res.render('pages/index');
});

router.get('/mail', function(req, res) {
  Mail.find(function(err, mailItems) {
    if (err)
      res.send(err);

    res.json(mailItems);
  });
});

router.get('/period/:to/:from', function(req, res) {
  res.json(`Hey ${req.params.to}, I'd rather have my period continuously for 100 years than spend another minute with you. Best, ${req.params.from}`);
});

module.exports = router;
