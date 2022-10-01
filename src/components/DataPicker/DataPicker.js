import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
export { useState } from 'react';

function DatePicker(props) {
  const { label, name, setValue, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}></label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              placeholderText={label}
              onChange={val => {
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
}

export default DatePicker;
