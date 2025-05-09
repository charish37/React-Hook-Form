import {format} from 'date-fns';
import {ColumnFilter} from './ColumnFiltering';

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        Filter: ColumnFilter
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        Filter: ColumnFilter
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({value}) => {return format(new Date(value),'dd/mm/yyyy')}, //formatted the date type to dd/mm/yyyy
        Filter: ColumnFilter
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
        Filter: ColumnFilter
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        Filter: ColumnFilter
    }
]

export const GROUPED_COLUMNS = [
    {
      Header: 'Id',
      Footer: 'Id',
      accessor: 'id',
      Filter: ColumnFilter
    },
    {
      Header: 'Name',
      Footer: 'Name',
      columns: [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'first_name',
          Filter: ColumnFilter
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'last_name',
          Filter: ColumnFilter
        },
      ]
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
        {
          Header: 'Date of Birth',
          Footer: 'Date of Birth',
          accessor: 'date_of_birth',
          Filter: ColumnFilter,
          Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
        },
        {
          Header: 'Country',
          Footer: 'Country',
          accessor: 'country',
          Filter: ColumnFilter
        },
        {
          Header: 'Phone',
          Footer: 'Phone',
          accessor: 'phone',
          Filter: ColumnFilter
        }
      ]
    }
  ];