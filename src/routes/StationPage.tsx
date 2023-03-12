import { Breadcrumbs, Fade, Grid, Paper, Skeleton, styled, Typography } from "@mui/material";
import { useQueries, useQuery } from "react-query";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Link, useParams } from "react-router-dom"
import { measurement, stations, water } from "../api";
import Navigation from "../components/Navigation";

import StraightenIcon from '@mui/icons-material/Straighten';
import InfoBox from "../components/InfoBox";
import BasePage from "../components/BasePage";

export default function StationPage() {

    const { stationId } = useParams();

    const stationQuery = useQuery({
        queryKey: ["station", stationId],
        queryFn: () => stations.getStationsById({
            station: `${stationId}`})
    })

    const currentMeasurementQuery = useQuery({
        queryKey: ["station", stationId, "currentMesurement"],
        queryFn: () => water.getCurrentMeasurmentByStation({
            station: `${stationId}`,
            includeCurrentMeasurement: true,
            timeseries: "W"
        })
    })

    const measurementQuery = useQuery({
            queryKey: ["measurement", stationId],
            queryFn: () => measurement.getMeasurementByStation({
                station: `${stationId}`,
                timeseries: "W"
            })
        })

    return (
        <BasePage>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to={"/"} color="text.primary">Stations</Link>
                <Typography color="text.primary">{stationId}</Typography>
            </Breadcrumbs>
            <div style={{marginTop: "5px"}}></div>
            
            <Typography variant="h3">
                { stationQuery.isLoading ? <Skeleton width={400} /> : <Fade in={true}><div>{ stationQuery.data?.longname?.toLowerCase() }</div></Fade>}
            </Typography>
            <div style={{marginTop: "10px"}}></div>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                        {stationId}
                </Grid>
                <Grid item xs={6}>
                    <InfoBox
                        loading={currentMeasurementQuery.isLoading}
                        subtitle={`Current level (${currentMeasurementQuery.data?.unit})`}
                        value={`${currentMeasurementQuery.data?.currrentMeasurement?.value}`}
                        lastUpdate={`${currentMeasurementQuery.data?.currrentMeasurement?.timestamp}`}
                        />
                        {JSON.stringify(currentMeasurementQuery.data)}
                </Grid>
            </Grid>
        </BasePage>
    )
}
