import DatePicker from './DataPicker';
import SetMultiselectValues from './SetMultiselectValues';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'data':
      return <DatePicker {...rest} />;
    case 'multiselect':
      return <SetMultiselectValues {...rest} />;
    default:
      return null;
  }
}
export default FormikControl;
