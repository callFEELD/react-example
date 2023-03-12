import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { stations } from "../api"
import Navigation from "../components/Navigation"
import StationsTable from "../components/StationsTable"

export default function RootPage() {

    return (
        <>
            <Navigation></Navigation>
            <div style={{marginTop: "15px"}}></div>
            <StationsTable />
        </>
    )
}
