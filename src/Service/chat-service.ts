import io from "socket.io-client";
import _axios from "axios";
import { store } from "../index";
import { getChat, replaceChat } from "../Redux/Actions/chatAction";

const socket = io("http://localhost:4000/");
const axios = _axios.create({
  baseURL: "http://localhost:4000/api/chat"
});

socket.on("msg", data => {
  if (data === "new") {
    getNew();
  }
});

export function sendMessage(to: string, Message: string) {
  return dispatch => {
    axios.post(
      "/",
      {
        to,
        Time: Date.now(),
        Message
      },
      {
        headers: { Authorization: store.getState().login.jwt }
      }
    );
    socket.emit("msgTo", {
      username: to,
      message: "new"
    });
  };
}

export function getNew(usn?: string) {
  const chat: any[] = store.getState().chat.chat;
  let latest = 0;
  if (chat.length > 0) {
    chat.sort((a, b) => {
      return a.Time - b.Time;
    });
    latest = chat[chat.length - 1].Time;
  }
  return dispatch => {
    axios
      .get(`/${usn ? usn : ""}?latest=${latest}`, {
        headers: { Authorization: store.getState().login.jwt }
      })
      .then(val => {
        dispatch(getChat(val.data));
      });
  };
}

export function getTooNew(usn?: string) {
  return dispatch => {
    axios
      .get(`/${usn ? usn : ""}?latest=0`, {
        headers: { Authorization: store.getState().login.jwt }
      })
      .then(val => {
        dispatch(replaceChat(val.data));
      });
  };
}
