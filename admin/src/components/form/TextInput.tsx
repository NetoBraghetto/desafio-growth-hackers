import { StateLinkable } from 'hooks/useForm';
import { FormControl } from 'react-bootstrap';

export function TextInput({
  link,
  error = '',
  extraProps,
} : {
  link: StateLinkable,
  error?: string,
  extraProps: any,
}) {
  const { name, value, onChange } = link;

  return (
    <>
      <FormControl onChange={onChange} value={value} name={name} isInvalid={!!error} {...extraProps} type="text" />
      { error ? (
        <FormControl.Feedback type="invalid">
          { error }
        </FormControl.Feedback>
      ) : null }
    </>
  );
}
