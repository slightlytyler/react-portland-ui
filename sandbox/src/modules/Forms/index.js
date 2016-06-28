import React, { Component } from 'react';
import {
  Form,
  Field,
  FieldSet,
  Input,
  Select,
  Switch,
  Checkbox,
  RadioGroup,
  Button,
} from 'pui';
import yup from 'yup';

const formSchema = yup.object({
  firstName: yup.string().required('is required'),
  lastName: yup.string().required('is required'),
  age: yup.string().required('is required'),
  favoriteFood: yup.string().required('is required'),
  otherText: yup.string().required('is required'),
  ketchup: yup.bool().test('is-checked', 'You must like ketchup.', value => value),
  ketchupSure: yup.bool().test('is-checked', 'You must like ketchup.', value => value),
  starWars: yup.string().required('is required'),
});

export default class App extends Component {
  render() {
    return (
      <Form schema={formSchema} panel>
        <FieldSet>
          <Field
            type={Input}
            width={3}
            name="firstName"
            label="First Name"
            placeholder
          />
          <Field
            type={Input}
            width={3}
            name="lastName"
            label="Last Name"
            placeholder
          />
          <Field
            type={Input}
            width={2}
            name="age"
            label="Age"
            placeholder
          />
        </FieldSet>
        <Field
          type={Select}
          name="favoriteFood"
          label="Favorite Food"
          placeholder
          options={[
            { value: 'Pizza' },
            { value: 'Tacos' },
            { value: 'Vegan Stuff', label: 'Soy' },
          ]}
        />
        <Field
          type={Input}
          name="otherText"
          label="Other Text"
          placeholder
        />
        <Field
          type={Switch}
          name="ketchup"
          label="Ketchup, yay or nay?"
        />
        <Field
          type={Checkbox}
          name="ketchupSure"
          label="Are you sure?"
        />
        <Field
          type={RadioGroup}
          name="starWars"
          label="Favorite Star Wars"
          options={[
            { value: 'I', label: 'The one with JarJar' },
            { value: 'IV' },
            { value: 'VII' },
          ]}
        />
        <Button type="submit" fluid>Submit</Button>
      </Form>
    );
  }
}
