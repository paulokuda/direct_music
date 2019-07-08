import * as React from "react";

import { Button } from "@blueprintjs/core";

import { CreateRoomDialog } from "./createRoomDialog";
import "./mainPage.scss";

interface IChatRoomsProps {
    onChatClick(roomId: string): void;
    onCreateChat(name: string, usernames: string[], isPrivate: boolean): Promise<void>;
    rooms: any[];
}

interface IChatRoomsState {
    isCreateDialogOpen: boolean;
}

export class ChatRooms extends React.PureComponent<IChatRoomsProps, IChatRoomsState> {
    public state: IChatRoomsState = {
        isCreateDialogOpen: false,
    }
    
    public render() {
        return (
            <div className="chat-rooms">
                <div className="chat-rooms__list">
                    {this.props.rooms.map((room) => (
                        <div key={room.id} className="chat-room-item" onClick={() => this.handleChatClick(room.id)}>{room.name}</div>
                    ))}
                </div>
                <div className="chat-rooms__create">
                    <Button className="chat-rooms__create-button" icon="plus" intent="primary" onClick={this.openCreateRoomDialog} text="New group" />
                    <CreateRoomDialog isOpen={this.state.isCreateDialogOpen} onClose={this.closeCreateRoomDialog} onCreateChat={this.props.onCreateChat} />
                </div>
            </div>
        )
    }

    private closeCreateRoomDialog = () => this.setState({ isCreateDialogOpen: false });

    private openCreateRoomDialog = () => {
        this.setState({ isCreateDialogOpen: true });
    }

    private handleChatClick = (roomId: string) => {
        this.props.onChatClick(roomId);
    }
}