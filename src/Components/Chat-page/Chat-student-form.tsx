import React from "react";
import { connect } from "react-redux";
import { getTooNew, sendMessage } from "../../Service/chat-service";
import "./Chat.scss";
import MessageBox from "./Message-box";

class ChatStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // @ts-ignore
    this.props.newChat();
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // @ts-ignore
    const { text } = this.state;
    // @ts-ignore
    this.props.send(this.props.adv, text);
    this.setState({ text: "" });
  }

  render() {
    // @ts-ignore
    const { chat } = this.props;
    // @ts-ignore
    const { text } = this.state;
    let mes = [...chat];

    if (mes.length > 1)
      mes.sort((a, b) => {
        return a.Time - b.Time;
      });

    return (
      <div className="full">
        <div className="chatcontainer">
          <div className="sendcontainer">
            <input
              className="Mesinputbox input is-small"
              type="Meassage"
              value={text}
              onChange={this.handleChange}
            />
            <button
              className="sendbutton button is-small "
              type="submit"
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
          <div className="chatfeedbox">
            {mes.length > 1 &&
              mes.map((val, index) => <MessageBox key={index} mes={val} />)}
          </div>
          <span id="bot"></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat.chat,
  adv: state.login.adv
});

const mapDispatchToProps = dispatch => {
  return {
    newChat: () => dispatch(getTooNew()),
    send: (to, message) => dispatch(sendMessage(to, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatStudentForm);
