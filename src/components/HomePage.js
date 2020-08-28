import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MenuItem, FormControl, Select} from '@material-ui/core';
import { List, ListItem, ListItemText} from '@material-ui/core';
import { AppBar, Toolbar, Typography, Grid, Divider, CircularProgress, Paper } from '@material-ui/core';
import { getCharacters, getMovies } from '../actions';
import logo from '../assests/star_wars_logo.png';
import poster from '../assests/starwars.jpg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  spinner: {
    color: theme.palette.background.paper,
    height: '50px !important',
    width: '50px !important',
  },
  image: {
    height: '65px',
    width: '100px',
  },
  formControl: {
    margin: '8px 0',
    minWidth: 250,
    color: theme.palette.background.paper,
    border: '1px solid #ffffff',
  },
  selectText: {
    color: '#ffffff !important',
  },
  root: {
    height: '100vh',
    flexWrap: 'nowrap',
    backgroundImage: `url(${poster})`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    margin: '32px 32px 8px 32px;',
    color: theme.palette.background.paper,
  },
  demo: {
   minWidth: 250,
 },
 label: {
   fontWeight: 'bold',
 }
}));

const HomePage = (props) => {
  const classes = useStyles();
  const [character, setCharacter] = useState('');
  const [lastMovie, setLastMovie] = useState('');

  const { characterList, moviesList, loading } = props;

  useEffect(() => {
    props.getCharacters();
  }, []);

  useEffect(() => {
    props.getMovies(character);
  }, [character]);

  useEffect(() => {
    getLastMovie();
  }, [props.moviesList]);

  const handleChange = (event) => {
    setCharacter(event.target.value);
  };

  const getLastMovie = () => {
    let sortedList = [];
    if(moviesList.length > 0) {
      sortedList =  moviesList.reduce((a, b) => {
          return new Date(a.release_date) > new Date(b.release_date) ? a : b;
        });
      setLastMovie(sortedList.title + ' ('+ moment(sortedList.release_date).format('YYYY')+')');
      }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={logo} className={classes.image} alt="starwars-logo" />
        </Toolbar>
      </AppBar>
      <Divider />
      <Paper elevation={3}>
        {loading ?
          <Grid container
            justify="center"
            className={classes.root}
          >
          <CircularProgress className={classes.spinner} /></Grid> :
          <div className={classes.root}>
            <Grid container
              justify="center"
            >
              <Grid container item xs={9} md={9} sm={9} lg={3} className={classes.container}>
                <Typography variant="h5" className={classes.label} display="inline">
                  Select Character:
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={character}
                    onChange={handleChange}
                    inputProps={{
                      classes: {
                        root: classes.selectText,
                        icon: classes.selectText,
                      },
                    }}
                  >
                  {characterList.length > 0 && characterList.map((character) => {
                    return (
                      <MenuItem value={character.name} key={character.name}>{character.name}</MenuItem>
                      );
                    })
                  }
                  </Select>
                </FormControl>
              </Grid>
            {moviesList.length > 0 &&
              <Grid container item xs={9} md={9} sm={9} lg={3} className={classes.container}>
                <Typography variant="h5" className={classes.label}>
                  List of Movies:
                </Typography>
                <div className={classes.demo}>
                  <List>
                  {moviesList.map((movie) => {
                    return (
                      <ListItem key={movie.title} button>
                        <ListItemText primary={movie.title} />
                      </ListItem>
                    );
                  })
                  }
                  </List>
                </div>
              </Grid>}
              {moviesList.length > 0 && <Grid container item xs={9} md={9} sm={9} lg={3} className={classes.container}>
                <Typography variant="h5" className={classes.label}>
                  Name/Year last Movie:
                </Typography>
                <p>{lastMovie}</p>
              </Grid>}
            </Grid>
          </div>}
        </Paper>
      </React.Fragment>
  );
}

const mapStateToProps = state => ({
  characterList: state.characterList,
  moviesList: state.moviesList,
  loading: state.loading
});

const mapDispatchToProps = {
  getCharacters,
  getMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
