import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Add as AddIcon,
  ViewWeek as ViewWeekIcon,
  Home as HomeIcon,
  MoreHoriz as MoreHorizIcon,
  Star as StarIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import AppBar from '~/components/AppBar/AppBar'


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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const BoardCard = styled(Card)(({ theme }) => ({
  height: '96px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

//fixed color for board
const fixedColor = ['#0079bf', '#b04632', '#70a95d', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#b04632', '#70a95d', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0'];

export default function HomePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  

  //fixed board data
  const recentBoards = [
    { id: 1, title: 'Clone Trello - MERN', color: '#0079bf' }
  ]

  const workspaces = [
    {
      id: 1,
      name: 'NEU SV',
      boards: [
        { id: 1, title: 'Tasks Management', color: '#0079bf' },
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafc' }}>
      
      <AppBar />

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          My Boards
        </MenuItem>
      </Menu>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
              <ListItem button selected>
                <ListItemIcon>
                  <ViewWeekIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Boards" primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ViewWeekIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Templates" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={9}>

            {/* <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Your boards
            </Typography>
            <Grid container spacing={2}>
              {recentBoards.map((board) => (
                <Grid item xs={12} sm={6} md={4} key={board.id}>
                  <BoardCard sx={{ bgcolor: board.color, color: 'white' }}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{board.title}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton size="small" sx={{ color: 'white' }}>
                          <StarIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'white' }}>
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </BoardCard>
                </Grid>
              ))}
            </Grid> */}

            <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
              YOUR BOARDS
            </Typography>
            {workspaces.map((workspace) => (
              <Box key={workspace.id} sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                  {workspace.boards.map((board) => (
                    <Grid item xs={12} sm={6} md={3} key={board.id}>
                      <BoardCard sx={{ bgcolor: board.color, color: 'white' }}>
                        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{board.title}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton size="small" sx={{ color: 'white' }}>
                              <StarIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white' }}>
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </BoardCard>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6} md={3}>
                    <BoardCard sx={{ bgcolor: '#ffffff', border: '2px dashed #dfe1e6' }}>
                      <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button startIcon={<AddIcon />} sx={{ color: '#172b4d', textTransform: 'none' }}>
                          Create new board
                        </Button>
                      </CardContent>
                    </BoardCard>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
