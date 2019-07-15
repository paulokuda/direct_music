import * as React from "react";
import { Dialog, FormGroup, InputGroup, Classes, Button, Checkbox } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import { fetchAllUsernames } from "./actions";

interface ICreateRoomDialogProps {
    isOpen: boolean;
    onClose(): void;
    onCreateChat(name: string, usernames: string[], isPrivate: boolean): Promise<void>;
}

interface ICreateRoomDialogState {
    availableUsernames: string[];
    isPrivate: boolean;
    name: string;
    usernames: string[];
}

export class CreateRoomDialog extends React.Component<ICreateRoomDialogProps> {
    public state: ICreateRoomDialogState = {
        availableUsernames: [],
        isPrivate: false,
        name: "",
        usernames: [],
    }

    public componentDidMount() {
        this.load();
    }
    
    public render() {
        return (
            <Dialog
                isOpen={this.props.isOpen}
                onClose={this.closeCreateRoomDialog}
                title="Create room"
            >
                <form onSubmit={this.handleSubmit}>
                    <div className={Classes.DIALOG_BODY}>
                    <FormGroup
                        intent={undefined}
                        label="Room name"
                        labelFor="create-room-name"
                        helperText={undefined}
                    >
                        <InputGroup
                            autoFocus={true}
                            placeholder="Add room name…"
                            id="create-room-name"
                            intent={undefined}
                            onChange={this.handleNameChange}
                            value={this.state.name}
                        />
                    </FormGroup>
                    <FormGroup
                        intent={undefined}
                        label="Users"
                        helperText={undefined}
                    >
                        <MultiSelect<string>
                            items={this.state.availableUsernames}
                            itemRenderer={this.renderUsername}
                            onItemSelect={this.handleSelectUsername}
                            tagRenderer={this.renderUsernameTag}
                        />
                        {/* <TagInput
                            placeholder="Add users…"
                            onKeyDown={this.handleTagInputKeyDown}
                            onChange={this.handleChangeUsernames}
                            tagProps={{ minimal: true }}
                            values={this.state.usernames}
                        /> */}
                    </FormGroup>
                    <FormGroup>
                        <Checkbox checked={this.state.isPrivate} label="Private" onChange={this.toggleIsPrivate} />
                    </FormGroup>
                    </div>
                    <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.closeCreateRoomDialog} text="Cancel" />
                        <Button
                            disabled={false}
                            intent="primary"
                            loading={false}
                            tabIndex={3}
                            text="Create room"
                            type="submit"
                        />
                    </div>
                </div>
                </form>
            </Dialog>
        );
    }

    private renderUsernameTag = (username: string) => {
        console.log("tag", username);
        return <span>{username}</span>;
    }

    private handleSelectUsername = (username: string) => {
        this.setState((state: ICreateRoomDialogState) => {
            return {
                usernames: state.usernames.concat(username),
            };
        });
    }

    private renderUsername = (username: string) => {
        return <div>{username}</div>;
    }

    private toggleIsPrivate = () => {
        this.setState((state: ICreateRoomDialogState) => ({
            isPrivate: !state.isPrivate,
        }))
    }

    private handleChangeUsernames = (usernames: React.ReactNode[]) => this.setState({ usernames });

    private handleTagInputKeyDown(event: React.KeyboardEvent<{}>) {
        const ENTER = 13;
        if (event.keyCode === ENTER) {
            event.preventDefault();
        }
    }

    private handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ name: event.currentTarget.value });
    }

    private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onCreateChat(this.state.name, this.state.usernames, this.state.isPrivate);
    }

    private closeCreateRoomDialog = () => {
        this.props.onClose();
    }

    private load = async () => {
        const usernames = await fetchAllUsernames();
        this.setState({ availableUsernames: usernames });
    }
}