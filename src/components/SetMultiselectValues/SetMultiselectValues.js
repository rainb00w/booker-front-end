import SelectBooks from '../SelectBooksNative/SelectBooks'
import { Field, ErrorMessage, FieldArray } from 'formik';
export { useState } from 'react';

const SetMultiselectValues = props => {
  const { name, setValue, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}></label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;

          const { value } = field;
          return (
            <SelectBooks
              id={name}
              {...field}
              {...rest}
              selected={value}
              setArrayValue={val => {
                setFieldValue(name, val);
                setValue(val);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default SetMultiselectValues;
