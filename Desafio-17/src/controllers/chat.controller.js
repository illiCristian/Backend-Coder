export default class ChatController {
  renderChat = (req, res) => {
    const userName = req.session?.user.user_name;
    console.log(req.session.user);
    res.render("chat", { title: "Chat", userName });
  };
}
