export default class ChatController {
  renderChat = (req, res) => {
    const userName = req.session?.user.first_name;
    res.render("chat", { title: "Chat", userName });
  };
}
