import React from 'react';

const Table = ({ data, selectedRows, toggleRowSelection, handleDelete }) => {
  return (
    <table>
    <thead>
      <tr>
        <th>Select</th>
        <th>ID</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Hobbies</th>
        <th>Update/Delete</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row._id}>
          <td>
            <input
              type="checkbox"
              checked={selectedRows.includes(row._id)}
              onChange={() => toggleRowSelection(row._id)}
            />
          </td>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.phoneNumber}</td>
          <td>{row.email}</td>
          <td>{row.hobbies}</td>
          <td>
            <button onClick={() => handleDelete(row._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
};

export default Table;

