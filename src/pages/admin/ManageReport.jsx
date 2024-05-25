import { useMemo } from 'react';
import { useTable } from 'react-table';
import { MdOutlineFilterAlt } from "react-icons/md";

const getStatusClass = (status) => {
  switch (status) {
    case 'Need Review':
      return 'bg-yellow-500 text-white';
    case 'Rejected':
      return 'bg-red-500 text-white';
    case 'Accepted':
      return 'bg-green-500 text-white';
    default:
      return '';
  }
}

const ManageReport = () => {
  const data = useMemo(
    () => [
      { id: 'RPT001', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '12/12/2022', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT002', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '22/12/2021', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT003', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '31/12/2023', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT004', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '21/12/2033', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT005', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '11/12/2012', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT006', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '19/12/2011', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT007', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Accepted', date: '02/12/2041', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT008', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '05/12/2002', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT009', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '03/12/2003', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT010', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '10/12/2041', location: 'Cimahi, Jawa Barat' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Report ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Report Category', accessor: 'category' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Location', accessor: 'location' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="px-6 py-9">
      <div className='flex items-end justify-between text-[#414141]'>
        <h1 className="h4 font-semibold mb-4">Manage Report</h1>
        <button className='px-9 flex items-center body-m'>
          Filter
          <MdOutlineFilterAlt className="w-5 h-5 ml-2" />
        </button>
      </div>
      <div className="overflow-x-scroll">
        <table {...getTableProps()} className="w-full table-auto">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className={`px-6 py-3 ${column.id == 'status' ? "text-center" : "text-left"} whitespace-nowrap text-neutral-900 body-m`}
                    key={column.id}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className={`border px-6 py-3 whitespace-nowrap body-m text-[#444A6D] ${cell.column.id == 'status' && "text-center"}`}
                      key={cell.column.id}
                      style={{ minWidth: '150px' }}
                    >
                      {cell.column.id === 'status' ? (
                        <span className={`rounded-full px-5 py-px ${getStatusClass(cell.value)}`}>
                          {cell.value}
                        </span>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReport
