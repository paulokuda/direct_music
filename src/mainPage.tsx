import React from "react";

import Chatkit from "@pusher/chatkit-client";

import { ChatRooms } from "./chatRooms";
import { CurrentChatRoom } from "./currentChatRoom";
import "./mainPage.scss";

const tokenProvider = new Chatkit.TokenProvider({
	url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/77b21d6a-9c4c-4f53-bc62-09e71a32a680/token",
})



interface IMainPageProps {
    chatkitId: string;
}

interface IMainPageState {
    chatMessages: Map<string, any[]>;
    focusedRoomId: string;
    loading: boolean;
    user: any | undefined;
}

export class MainPage extends React.Component<IMainPageProps, IMainPageState> {
    public state: IMainPageState = {
        chatMessages: new Map(),
        focusedRoomId: "",
        loading: false,
        user: undefined,
    }
    
    public componentDidMount() {
        this.load();
    }
    
    public render() {
        if (this.state.user === undefined) {
            return null;
        }
        if (this.state.loading) {
            return "Loading…";
        }
        
        return (
            <div className="main-container">
                <ChatRooms onChatClick={this.focusChat} onCreateChat={this.handleCreateRoom} rooms={this.state.user.rooms} />
                <CurrentChatRoom
                    currentUserId={this.props.chatkitId}
                    messages={this.state.chatMessages.get(this.state.focusedRoomId)}
                    onMessageSend={this.handleMessageSend}
                />
            </div>
        );
    }

    private handleCreateRoom = async (name: string, usernames: string[], isPrivate: boolean) => {
        const room = await this.state.user.createRoom({
            name,
            private: isPrivate,
            addUserIds: usernames,
        });
        // HACKHACK: Somehow the user.rooms reference now knows about the new room that was added
        this.setState(state => {
            return {
                user: state.user,
            }
        });
    }

    private handleMessageSend = async (text: string) => {
        await this.state.user.sendSimpleMessage({ roomId: this.state.focusedRoomId, text });
    }

    private focusChat = async (roomId: string) => {
        const messages = await this.state.user.fetchMultipartMessages({ roomId });
        this.setState(state => ({
            chatMessages: state.chatMessages.set(roomId, messages),
            focusedRoomId: roomId,
        }))
    }
    
    private load = async () => {
        this.setState({ loading: true });
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: "v1:us1:77b21d6a-9c4c-4f53-bc62-09e71a32a680",
            userId: this.props.chatkitId,
            tokenProvider,
        });
        const chatkitUser = await chatManager.connect();
        chatkitUser.rooms.forEach((room: any) => {
            chatkitUser.subscribeToRoomMultipart({
                roomId: room.id,
                hooks: {
                    onMessage: (message: any) => {
                        let existingChatMessages = this.state.chatMessages.get(room.id);
                        if (existingChatMessages === undefined) {
                            existingChatMessages = [];
                        } else {
                            existingChatMessages = [...existingChatMessages, message];
                        }
                        this.setState(state => ({
                            chatMessages: state.chatMessages.set(room.id, existingChatMessages as any[]),
                        }))
                    }
                }
            })
        })
        this.setState({ loading: false, user: chatkitUser });
    }
}