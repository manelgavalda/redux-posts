import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {},
  categories: {},
  content: {}
}

class PostsNew extends Component {
  renderField(field) {

    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <field.type
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          type="input"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          type="input"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Posts Content"
          type="textarea"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `Enter ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);