import Button from '@mui/material/Button';

export default function ButtonUsage({name, onClick}) {
  if (onClick) {
    return <Button variant="contained" onClick={onClick}>{name}</Button>;
  }
  return <Button variant="contained">{name}</Button>;
}