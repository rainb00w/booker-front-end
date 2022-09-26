import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormikControl from './FormikControl';
import 'react-datepicker/dist/react-datepicker.css';

const StyledControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PeriodSelection = ({ onStartTraining }) => {
  const initialValues = {
    startDate: null,
    endDate: null,
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
  });

  const onSubmit = values => {
    console.log('Form data', values);
    onStartTraining(values);
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <StyledControlsWrapper>
            <FormikControl control="data" label="Початок" name="startDate" />
            <FormikControl control="data" label="Завершення" name="endDate" />
          </StyledControlsWrapper>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default PeriodSelection;
