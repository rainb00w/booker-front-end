import DatePicker from "./DataPicker";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'data':
      return <DatePicker {...rest} />;
    case 'select':
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}
export default FormikControl;
