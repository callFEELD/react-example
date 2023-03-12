import { Box, Fade, Grid, Paper, Skeleton, styled, Typography, Tooltip } from "@mui/material";


interface InfoBoxParameters {
    subtitle: string
    value: string
    lastUpdate?: string
    icon?: any
    loading?: boolean
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


export default function InfoBox(params: InfoBoxParameters) {
    if (params.loading) {
        return (
            <Item>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Skeleton width={100} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                <Skeleton width={"60%"} />
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Item>
        )
    }

    return (
            <Item>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Fade in={true}>
                            <Grid item xs={12}>
                                {params.icon}{params.subtitle}
                            </Grid>
                        </Fade>
                        <Fade in={true}>
                            <Grid item xs={12}>
                                <Tooltip title={params.lastUpdate}>
                                    <Typography variant="h4">
                                        {params.value}
                                    </Typography>
                                </Tooltip>
                            </Grid>
                        </Fade>
                    </Grid>
                </Box>
            </Item>
    )
}