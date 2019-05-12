import React, {Component} from 'react';

interface ISignupDialogState {
    username: string;
}

export class SignupDialog extends Component<{}, ISignupDialogState> {
    public constructor() {
        super({});
        this.state = {
            username: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({username: event.currentTarget.value});
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("submit", this.state);
    }
    render() {
        return(
            <div className="form-container">
                <h1>Let's Talk</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <label htmlFor="email">What is your email?</label>
                    <input type="email" name="username" onChange={this.handleChange} className="input" />
                    <button className="submit">Submit</button>
                </form>
            </div>
        )
    }
}