import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            loading: false,
            options: [{
                key: 1,
                value: 1,
                text: 'First book'
            }, {
                key: 1,
                value: 1,
                text: 'First book'
            }],
            books: {}
        }
    }
    render() {
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder="Search for a book by title"
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                />

            </Form>
        );
    }
}

export default SearchBookForm;
