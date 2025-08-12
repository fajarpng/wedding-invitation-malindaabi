import mongoose from "mongoose"

mongoose.Promise = global.Promise

export type ChatsType = {
    _id: string | number
    message: string
    sender: string
    presence: string
}

const Schema = new mongoose.Schema<ChatsType>({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  presence: {
    type: String,
    required: true,
  }
})

const Chats = mongoose.models?.Chats || mongoose.model("Chats", Schema)
export default Chats