import { Router } from "express";

const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(messages);
});

router.post('/', function(req, res, next) {
  messages.push({text: req.body.message, user: req.body.author, added: new Date()});
  console.log('submit')
  res.redirect('/');
})
export default router;