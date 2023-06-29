export default class ChatController {
  renderChat = (req, res) => {
    res.render("chat", { title: "Chat" });
  };
}
