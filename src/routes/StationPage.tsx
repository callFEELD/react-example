import { Breadcrumbs, Fade, Grid, Paper, Skeleton, styled, Typography } from "@mui/material";
import { useQueries, useQuery } from "react-query";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useParams } from "react-router-dom"
import { measurement, stations, water } from "../api";
import Navigation from "../components/Navigation";

import StraightenIcon from '@mui/icons-material/Straighten';
import InfoBox from "../components/InfoBox";

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
        <>
            <Navigation></Navigation>
            <div style={{marginTop: "25px"}}></div>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Station</Typography>
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
        </>
    )
}