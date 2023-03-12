import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { stations } from "../api"
import Navigation from "../components/Navigation"

export default function RootPage() {

    const { isLoading, error, data } = useQuery({
        queryKey: "stations",
        queryFn: () => stations.getStations()
    })

    if (error) return (<p>error</p>)

    if (isLoading) return (<>
        <Navigation></Navigation>
        <div style={{marginTop: "15px"}}></div>
        <p>Loading</p>
        </>
    )

    return (
        <>
        <Navigation></Navigation>
        <div style={{marginTop: "15px"}}></div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>latitude</TableCell>
                <TableCell>longitude</TableCell>
                <TableCell>water</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data!.map((station) => (
                <TableRow
                key={station.uuid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell><Link to={`station/${station.uuid}`}>{station.longname?.toLowerCase()}</Link></TableCell>
                    <TableCell>{station.latitude}</TableCell>
                    <TableCell>{station.longitude}</TableCell>
                    <TableCell>{station.water?.longname?.toLowerCase()}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}
