import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';

import InlineError from './../messages/InlineError';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                token: props.token,
                password: '',
                passwordConfirm: ''
            },
            loading: false,
            errors: {}
        };
    }

    onChange = e => this.setState({ ...this.state, data: { ...this.state.data, [e.target.name]: e.target.value } })

    onSubmit = e => {
        e.preventDefault();

        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = data => {
        const errors = {};
        if (!data.password) errors.password = 'Cant be blank';
        if (data.password !== data.passwordConfirm) errors.passwordConfirm = 'Password must match';

        return errors;
    }

    render() {
        const { data, loading, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading} >
                {!!errors.global && <Message negative>{errors.global}</Message>}
                <Form.Field error={errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={data.password} onChange={this.onChange} />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Form.Field error={errors.passwordConfirm}>
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm password" value={data.passwordConfirm} onChange={this.onChange} />
                    {errors.passwordConfirm && <InlineError text={errors.passwordConfirm} />}
                </Form.Field>
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
