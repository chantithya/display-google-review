import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv'; // Import CSVLink
import './CustomDataTable.css'; // Ensure this file is imported

// Sample data for the table
const data = [
  {
    id: 1,
    date: '2024-10-01',
    review_name: 'Jane Doe',
    rating: '5 stars',
    review: 'Amazing food and ambiance, will come again',
  },
  {
    id: 2,
    date: '2024-10-02',
    review_name: 'John Smith',
    rating: '4 stars',
    review: 'Good service, but the food could be better.',
  },
  {
    id: 3,
    date: '2024-10-03',
    review_name: 'Alice Johnson',
    rating: '3 stars',
    review: 'Average experience, nothing special.',
  },
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
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 entries per page

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
  
    const filtered = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(query)
      );
    });
  
    setFilteredData(filtered);
  };

  // Prepare CSV data
  const csvData = filteredData.map(item => ({
    ID: item.id, // Include ID in CSV data
    Date: item.date,
    'Review Name': item.review_name,
    Rating: item.rating,
    Review: item.review,
  }));

  return (
    <div className="custom-data-table">
      <h1>Customer Review</h1>

      
      <div className="search-and-button">
        <div className="col-sm-4"> {/* Bootstrap column class for small screens */}
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
        </div>
        <div className="col-sm-4"> {/* Another column for dropdown */}
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
        <div className="col-sm-4"> {/* Column for CSV download button */}
            <CSVLink
                data={csvData}
                filename="reviews.csv"
                className="csv-download-button"
                style={{ textDecoration: 'none' }} // No underline for the link
            >
                <i className="fa-solid fa-file-csv" style={{ color: '#fff', fontSize: '24px' }}></i>
            </CSVLink>
        </div>
    </div>


      <div className="data-table-container">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={rowsPerPage} // Set the number of rows per page
          paginationComponentOptions={{
            noRowsPerPage: true, // Hide the rows per page dropdown
          }}
          highlightOnHover
          pointerOnHover
          striped
          customStyles={{
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
          }}
          paginationCustomComponent={({ paginationProps }) => (
            <div className="custom-pagination">
              <button
                className={`pagination-button ${paginationProps.previousButton ? '' : 'disabled'}`}
                onClick={paginationProps.onPrevious}
                disabled={!paginationProps.previousButton}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {paginationProps.currentPage} of {paginationProps.pageCount}
              </span>
              <button
                className={`pagination-button ${paginationProps.nextButton ? '' : 'disabled'}`}
                onClick={paginationProps.onNext}
                disabled={!paginationProps.nextButton}
              >
                Next
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CustomDataTable;
