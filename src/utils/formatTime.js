import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'yyyy MM dd';
  // console.log (fm);
  return date ? format(new Date(date), fm) : '';
}


export function fEspDate(date, newFormat) {

    const Meses = 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre'.split(',')
    let result = "";

        
    if (date) {
        result = `${date.getFullYear()}-${Meses[date.getMonth() + 1]}-${date.getDay()}`;
    }

    return result;
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
