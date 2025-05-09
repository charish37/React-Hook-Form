import React from 'react'

// global filtering will be used if we have entire data available at the client side, if we are fetching row after row column filtering is the best
export const ColumnFilter = ({column}) => {
    const {filterValue,setFilter} = column;
  return (
    <span>
        Search: {' '}
        <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
      
    </span>
  )
}

