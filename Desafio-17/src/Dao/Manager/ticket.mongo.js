import ticketModel from "../models/ticket.js";

class TicketMongo {
  constructor() {
    this.ticketModel = ticketModel;
  }
  async createTicket(ticket) {
    try {
      const res = await this.ticketModel.create(ticket);
      return res;
    } catch (error) {
      console.log(error + "error en el create ticket");
    }
  }
}

export default TicketMongo;
