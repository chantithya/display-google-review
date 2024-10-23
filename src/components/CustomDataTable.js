import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './CustomDataTable.css'; // Ensure the custom styles are imported

// Sample data for the table
const data = [
  { id: 1, date: '2024-10-01', review_name: 'Jane Doe', rating: '5 stars', review: 'Amazing food and ambiance, will come again' },
  { id: 2, date: '2024-10-02', review_name: 'John Smith', rating: '4 stars', review: 'Good service, but the food could be better.' },
  { id: 3, date: '2024-10-03', review_name: 'Alice Johnson', rating: '3 stars', review: 'Average experience, nothing special.' },
  // Add more data as needed...
];

// Define columns for the table
const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'Review Name',
    selector: row => row.review_name,
    sortable: true,
  },
  {
    name: 'Rating',
    selector: row => row.rating,
    sortable: true,
  },
  {
    name: 'Review',
    selector: row => row.review,
    sortable: true,
  },
];

const CustomDataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    const filtered = data.filter((item) => Object.values(item).some(value => value.toString().toLowerCase().includes(query)));
    setFilteredData(filtered);
  };

  // Prepare CSV data
  const csvData = filteredData.map(({ id, date, review_name, rating, review }) => ({
    ID: id,
    Date: date,
    'Review Name': review_name,
    Rating: rating,
    Review: review,
  }));

  // Generate PDF document
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Customer Reviews', 14, 30);
    doc.autoTable({
      head: [['ID', 'Date', 'Review Name', 'Rating', 'Review']],
      body: filteredData.map(({ id, date, review_name, rating, review }) => [id, date, review_name, rating, review]),
    });
    doc.save('reviews.pdf');
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '50px',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
    },
  };

  return (
    <div className="custom-data-table">
      <h1>Customer Reviews</h1>

      <div className="search-and-button">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="rows-per-page-dropdown"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="button-group">
          <CSVLink
            data={csvData}
            filename="reviews.csv"
            className="csv-download-button"
            style={{ textDecoration: 'none' }}
          >
            <i className="fa-solid fa-file-csv" style={{ color: '#fff', fontSize: '24px' }}></i>
          </CSVLink>
          <button onClick={downloadPdf} className="pdf-download-button">
            <i className="fa-solid fa-file-pdf" style={{ color: '#fff', fontSize: '24px' }}></i>
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={rowsPerPage}
          highlightOnHover
          pointerOnHover
          striped
          customStyles={customStyles} // Apply the custom styles here
        />
      </div>
    </div>
  );
};

export default CustomDataTable;
