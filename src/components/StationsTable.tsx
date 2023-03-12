import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { stations } from "../api";
import { Station } from "../api/models";

interface Row {
    id: string
    name: string
    water: string
    latitude: number
    longitude: number
}

export default function StationsTable() {

    // state which holds the datagrid rows (aka. the list of
    // available stations)
    const [rows, setOptions] = useState<Row[]>([])

    // Query the api, to get all available stations
    const { data } = useQuery({
        queryKey: "stations", // cache the api results using the cache key "stations"
        queryFn: () => stations.getStations() // api function to call
    })
    
    // When the api returns the list of stations,
    // convert the results into an autocomplete options
    // interface and set the "options" state
    useEffect(() => {
        if (data !== undefined) {
            setOptions(generateDataGridRows(data))
        }
    }, [data])  // data here means, that the useEffect hook will be called
                // when a change happens to this value

    // function to convert the list of stations into the required
    // Row interface for the MUI datagrid component
    function generateDataGridRows(stations: Station[]) {
        let rows: Row[] = []
        stations.map((station) => {
            rows.push({
                id: station.uuid!,
                name: station.longname!.toLowerCase(),
                water: station.water!.longname!.toLowerCase(),
                latitude: station.latitude!,
                longitude: station.longitude!
            })
        })
        return rows
    }

    const columns: GridColDef[] = [
        { 
            field: 'name', headerName: 'Name', flex: 1,
            renderCell: (params) => (
                <>
                    <Link to={`/station/${params.row.id}`}>{params.row.name}</Link>
                </>
            )
        },
        { field: 'water', headerName: 'Water', flex: 1 },
        { field: 'latitude', headerName: 'latitude', flex: 1 },
        { field: 'longitude', headerName: 'longitude', flex: 1 },
    ];

    return(<>
        <DataGrid
            paginationModel={{ pageSize: 15, page: 0 }}
            pageSizeOptions={[15, 25, 50, 100]}
            autoHeight rows={rows} columns={columns} />
    </>)
}
