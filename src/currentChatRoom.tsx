import * as React from "react";
import classNames from "classnames";
import Microlink from '@microlink/react'
import { isValidURL } from "./utils";

interface ICurrentChatRoomProps {
    currentUserId: string;
    messages: any[] | undefined;
    onMessageSend(text: string): Promise<void>;
}

interface ICurrentChatRoomsState {
    currentMessage: string;
}

export class CurrentChatRoom extends React.Component<ICurrentChatRoomProps, ICurrentChatRoomsState> {
    public state: ICurrentChatRoomsState = {
        currentMessage: "",
    }
    
    public render() {
        if (this.props.messages === undefined) {
            return <span>No chat selected</span>;
        }

        return (
            <div className="current-chat-room">
                <div className="current-chat-room__messages">
                    {this.renderMessages()}
                    {/* <Microlink url="https://soundcloud.com/flipboit4midles/sad-peach" /> */}
                </div>
                <div className="current-chat-room__input-wrapper">
                    <form className="current-chat-room__form" onSubmit={this.handleSendMessage}>
                        <input className="current-chat-room__input" placeholder="Enter a message…" type="text" value={this.state.currentMessage} onChange={this.handleMessageChange} />
                    </form>
                </div>
            </div>
        );
    }

    private renderMessages = () => {
        if (this.props.messages === undefined) {
            return null;
        }
        
        if (this.props.messages.length === 0) {
            return <div>No messages in this chat</div>
        } else {
            return this.props.messages.map(message => (
                <div className={classNames("chat-room-message", { "chat-room-message__self": this.props.currentUserId === message.senderId })}>
                    <strong>{message.senderId}</strong>
                    <div className="chat-room-message__content">{message.parts.map((part: any) => {
                        if (isValidURL(part.payload.content)) {
                            return (
                                <Microlink
                                    style={{
                                        maxWidth: "none",
                                    }}
                                    textAlign="right"
                                    url={part.payload.content}
                                />
                            )
                        }
                        return part.payload.content;
                    })}</div>
                </div>
            ))
        }
    }

    private handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onMessageSend(this.state.currentMessage);
        this.setState({ currentMessage: "" });
        // console.log("send message!", this.state.currentMessage);
    }

    private handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ currentMessage: event.currentTarget.value });
    }
}