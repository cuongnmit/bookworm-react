import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

import InlineError from './../messages/InlineError';

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                email: '',
                password: ''
            },
            loading: false,
            errors: {}
        }
    }

    onChange = e => this.setState({
        ...this.state,
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = 'Invalid email address';
        if (!data.password) errors.password = 'Cant be blank';

        return errors;
    }

    render() {
        const { data, loading, errors } = this.state;

        return (
           <Form onSubmit={this.onSubmit} loading={loading} >
                <Form.Field error={errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com" value={data.email} onChange={this.onChange} />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={errors.password} >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={data.password} onChange={this.onChange} />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Sign Up</Button>
           </Form>
        );
    }
}

SignUpForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default SignUpForm;
