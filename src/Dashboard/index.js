import React, { Component } from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

//Icons
import AccountBox from '@material-ui/icons/AccountBox';
import Looks3 from '@material-ui/icons/Looks3';
import Looks4 from '@material-ui/icons/Looks4';
import Looks5 from '@material-ui/icons/Looks5';
import Looks6 from '@material-ui/icons/Looks6';

import { subjects, instructionalMethods, campuses, courseLevels, partOfTerms, instructors, sessions, attributeTypes, HAVEDROPDOWN, WANTDROPDOWN } from '../consts/consts'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    height: '100%',
    background: 'white'
  },
  container: {
      paddingTop: '24px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    flexBasis: 200,
  },
});

class Dashboard extends Component {

  state = {
    openProfileDialog: false,
    button3: false,
    button4: false,

    subject: 0, 
    haveSelected: 0,
    wantSelected: 0,
    instructionalMethod: 0, 
    campus: 0, 
    courseLevel: 0,
    partOfTerm: 0, 
    instructor: 0, 
    session: 0, 
    attributeType: 0,

  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openProfileDialogBox = () => {
      this.setState({
        openProfileDialog: !this.state.openProfileDialog
      })
  }

  openButton3Form = () => {
    this.setState({
        button3: !this.state.button3
      })
  }

  openButton4Form = () => {
      this.setState({
          button4: !this.state.button4
      })
  }

  handleClose = () => {
      this.setState({
        openProfileDialog: false,
        button3: false,
        button4: false
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
                Dashboard Page of {this.props.username}
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
        <div className={classes.container}>
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.openProfileDialogBox} >
                Profile
                <AccountBox className={classes.rightIcon} />
            </Button>
            <Button variant="contained" size="large" color="primary" className={classes.button}>
                Annoucement
                <AccountBox className={classes.rightIcon} />
            </Button>
            <Button variant="outlined" size="large" color="primary" className={classes.button} onClick={this.openButton3Form}>
                Button
                <Looks3 className={classes.rightIcon} />
            </Button>
        </div>
        <div className={classes.container}>
            <Button variant="outlined" size="large" color="primary" className={classes.button} onClick={this.openButton4Form}>
                Button
                <Looks4 className={classes.rightIcon} />
            </Button>
            <Button variant="outlined" size="large" color="primary" className={classes.button}>
                Button
                <Looks5 className={classes.rightIcon} />
            </Button>
            <Button variant="outlined" size="large" color="primary" className={classes.button}>
                Button
                <Looks6 className={classes.rightIcon} />
            </Button>
            </div>
        </div>

        {/* Profile dialog start */}
        <Dialog
          open={this.state.openProfileDialog}
          onClose={this.handleClose}
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Add new profile here
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="id"
              label="ID"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="phone"
              label="Phone"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="year"
              label="Year"
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              id="program"
              label="Program"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {/* Profile dialog end */}

        {/* ____ dialog start */}
        <Dialog
          open={this.state.button3}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Button 3</DialogTitle>
          <DialogContent>
            <form>
                <TextField
                    id="subject"
                    select
                    label="Subject"
                    className={classes.textField}
                    value={this.state.subject}
                    onChange={this.handleChange('subject')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    >
                    {subjects.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    id="courseNumber"
                    label="Course Number"
                    type="text"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    style={{ height: 50 }}
                />
                <TextField
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    style={{ height: 50 }}
                />
                <TextField
                    id="instructionMethod"
                    select
                    label="Instruction Method"
                    className={classes.textField}
                    value={this.state.instructionalMethod}
                    onChange={this.handleChange('instructionalMethod')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {instructionalMethods.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                    <TextField
                        margin="dense"
                        id="creditRangeFrom"
                        label="Credit Range From"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment> }}
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="creditRangeTo"
                        label="Credit Range To"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment> }}
                        variant="outlined"
                    />
                </div>
                <TextField
                    id="campus"
                    select
                    label="Campus"
                    className={classes.textField}
                    value={this.state.campus}
                    onChange={this.handleChange('campus')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {campuses.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="courseLevel"
                    select
                    label="Course Level"
                    className={classes.textField}
                    value={this.state.courseLevel}
                    onChange={this.handleChange('courseLevel')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {courseLevels.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="partOfTerm"
                    select
                    label="Part Of Term"
                    className={classes.textField}
                    value={this.state.partOfTerm}
                    onChange={this.handleChange('partOfTerm')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Non-date based classes only"
                    >
                    {partOfTerms.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="instructor"
                    select
                    label="Instructor"
                    className={classes.textField}
                    value={this.state.instructor}
                    onChange={this.handleChange('instructor')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {instructors.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="session"
                    select
                    label="Session"
                    className={classes.textField}
                    value={this.state.session}
                    onChange={this.handleChange('session')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {sessions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="attributeType"
                    select
                    label="Attribute Type"
                    className={classes.textField}
                    value={this.state.attributeType}
                    onChange={this.handleChange('attributeType')}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    >
                    {attributeTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        margin="dense"
                        className={classes.textField}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        style={{ flexBasis: 'unset', marginRight: '12px' }}
                    />
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        margin="dense"
                        className={classes.textField}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        style = {{ flexBasis: 'unset' }}
                    />
                </div>
                <FormControl component="fieldset" className={classes.formControl} margin="dense">
                    <FormLabel component="legend">Days</FormLabel>
                    <FormGroup style={{ flexDirection: 'unset'}} >
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Mon" /> } label="Mon" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Tue" /> } label="Tue" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Wed" /> } label="Wed" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Thu" /> } label="Thu" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Fri" /> } label="Fri" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Sat" /> } label="Sat" />
                        <FormControlLabel control={ <Checkbox color="primary" onChange={this.handleChange('gilad')} value="Sun" /> } label="Sun" />
                    </FormGroup>
                    </FormControl>
            <DialogActions>
                <Button type="reset" color="default">
                Reset
                </Button>
                <Button type="submit" onClick={this.handleClose} color="primary">
                Class Search
                </Button>
            </DialogActions>
            </form>
        </DialogContent>
        </Dialog>
        {/* ____ dialog end */}



        {/* ____ dialog start */}
        <Dialog
          open={this.state.button4}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Button 4</DialogTitle>
          <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: '280px' }}>
          <h2> I have </h2>
            <TextField
                id="haveSelected"
                select
                label="haveSelected"
                className={classes.textField}
                value={this.state.haveSelected}
                onChange={this.handleChange('haveSelected')}
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="dense"
                variant="outlined"
                style={{ maxWidth: '180px', marginLeft: '8px' }}
                fullWidth
                >
                {HAVEDROPDOWN.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', minWidth: '280px' }} > 
            <h2> I want </h2>
            <TextField
                id="wantSelected"
                select
                label="wantSelected"
                className={classes.textField}
                value={this.state.wantSelected}
                onChange={this.handleChange('wantSelected')}
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="dense"
                variant="outlined"
                style={{ maxWidth: '180px', marginLeft: '8px' }}
                fullWidth
                >
                {WANTDROPDOWN.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <DialogActions>
                <Button type="submit" onClick={this.handleClose} color="primary">
                Post
                </Button>
            </DialogActions>
        </DialogContent>
        </Dialog>


      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
