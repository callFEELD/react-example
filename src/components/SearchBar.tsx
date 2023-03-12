import { alpha, Autocomplete, createFilterOptions, Input, InputAdornment, InputBase, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { stations } from "../api";
import { Station } from "../api/models/Station"
import SearchIcon from '@mui/icons-material/Search';

interface SearchParameters {
    stations?: Station[]
}

interface AutocompleteOption {
    id: string
    label: string
    group: string
}


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: 'inherit',
    '.MuiInputBase-root': {
        paddingLeft: 56
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function SearchBar() {

    // to navigate to the StationPage for the given search result
    const navigate = useNavigate();

    // state which holds the autocomplete options (aka. the list of
    // available stations)
    const [options, setOptions] = useState<AutocompleteOption[]>([])

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
            setOptions(generateAutocompleteOptions(data))
        }
    }, [data])  // data here means, that the useEffect hook will be called
                // when a change happens to this value

    // function to convert the list of stations into the required
    // AutocompleteOptions interface for the MUI Autocomplete
    // component
    function generateAutocompleteOptions(stations: Station[]) {
        let autocomplete: AutocompleteOption[] = []
        stations.map((station) => {
            autocomplete.push({
                id: station.uuid!,
                label: station.longname!.toLowerCase(),
                group: station.water!.longname!.toLowerCase()
            })
        })
        return autocomplete
    }

    return (
        <>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
                id="grouped-demo"
                options={options}
                groupBy={(option) => option.group}
                sx={{ width: 300 }}
                renderInput={(params) => <StyledInputBase {...params} autoComplete='off' placeholder="Search…" />}
                onChange={ (e, obj) => { if(obj) { navigate(`/station/${obj.id}`) } } }
            />
        </Search>
        </>
    )
}
