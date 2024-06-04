import DataTable from "react-data-table-component";

export interface CustomTableRow {
    name: string;
    leading_candidate: string;
    leading_party: string;
    leading_party_color: string;
    ruling_2014: string;
    ruling_2019: string;
}

interface CustomTableProps {
    data: CustomTableRow[]
}

const CustomTable = (data: CustomTableProps) => {

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#202124',
                backgroundColor: '#f8f9fa',
                textAlign: 'center' as 'center'  // Explicitly cast the string to match the expected type
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontSize: '15px',
                color: '#495057',
                textAlign: 'center' as 'center'  // Explicitly cast the string to match the expected type
            },
        },
    };
    
    
    

    const columns = [
        {
            name: 'Constituency',
            selector: (row: CustomTableRow) => row.name,
            sortable: true,
        },
        {
            name: 'Current Leading',
            selector: (row: CustomTableRow) => row.leading_candidate,
            sortable: true
        },
        {
            name: 'Leading Party',
            selector: (row: CustomTableRow) => row.leading_party,
            sortable: true,
            cell: (row: CustomTableRow) => (
                <div style={{
                    backgroundColor: row.leading_party_color, // Set the background color
                    color: '#fff', // Optional: change text color if needed for contrast
                    padding: '10px', // Optional: add padding for better visual appeal
                    borderRadius: '4px'  // Optional: round corners
                }}>
                    {row.leading_party}
                </div>
            ),
    
        },
        {
            name: '2019 Ruling Party',
            selector: (row: CustomTableRow) => row.ruling_2014,
            sortable: true
        },
        {
            name: '2014 Ruling Party',
            selector: (row: CustomTableRow) => row.ruling_2019,
            sortable: true
        }
    ]

    return (
        <div className="dataTableWrapper">
            <DataTable columns={columns} data={data.data} customStyles={customStyles} pointerOnHover></DataTable>
        </div>
    )
}

export default CustomTable