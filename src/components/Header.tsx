import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    '&::placeholder': {
      textOverflow: 'none',
      color: 'white'
    },
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    color: 'white',
    width: '10ch',
    '&:focus': {
      width: '20ch',
      borderBottom: '2px solid white',
    },
  },
}));

const MetLogo = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em" 
      height="1em" 
      viewBox="0 0 40 40" 
      style={{height:'40px', width:'40px'}}
    >
      <path fill="currentColor" d="M39.74 27.009a11.607 11.607 0 0 0-.88-1.861 9.872 9.872 0 0 0-1.33-1.824 7.6 7.6 0 0 0-1.72-1.387 3.993 3.993 0 0 0-2.04-.55v15.4A3.032 3.032 0 0 0 34 38a2.648 2.648 0 0 0 .64.883 2.821 2.821 0 0 0 .95.55 3.518 3.518 0 0 0 1.17.19V40h-6.13V21.577a4.916 4.916 0 0 0-2.08.4 4.175 4.175 0 0 0-1.47 1.111 5.312 5.312 0 0 0-.94 1.709 11.471 11.471 0 0 0-.54 2.213h-.26a11.489 11.489 0 0 0-.54-2.194 5.48 5.48 0 0 0-.97-1.718 4.287 4.287 0 0 0-1.54-1.121 5.558 5.558 0 0 0-2.21-.4h-1.36V30h1.24a4.344 4.344 0 0 0 .57-.133 2.833 2.833 0 0 0 1.22-.788 3.233 3.233 0 0 0 .68-1.339 7.637 7.637 0 0 0 .21-1.909h.29L24 34.947h-.29a5.834 5.834 0 0 0-1.62-3.228A3.808 3.808 0 0 0 20.84 31h-2.12v8.43h2.19a5.146 5.146 0 0 0 2.17-.456 6.5 6.5 0 0 0 1.79-1.216 7.934 7.934 0 0 0 1.39-1.737 10.231 10.231 0 0 0 .96-2.023h.26l-.77 6H12.57v-.38a3.518 3.518 0 0 0 1.17-.19 2.821 2.821 0 0 0 .95-.55 2.47 2.47 0 0 0 .63-.893 2.081 2.081 0 0 0 .18-.987V24.5L10 38h-.5L4 25.593V36.5a4.721 4.721 0 0 0 .37 1.487 2.62 2.62 0 0 0 .64.893 2.727 2.727 0 0 0 .95.55 3.5 3.5 0 0 0 1.16.19V40H0v-.38a3.561 3.561 0 0 0 1.17-.19 2.682 2.682 0 0 0 .94-.55 2.493 2.493 0 0 0 .64-.893 3.045 3.045 0 0 0 .23-1.2V23.362A3.1 3.1 0 0 0 0 21.387v-.379h3.07a4.583 4.583 0 0 1 1.94.37 2.685 2.685 0 0 1 1.28 1.472L11 33.5l4.5-11a2.05 2.05 0 0 1 1.17-1.113 3.971 3.971 0 0 1 1.7-.379h20.94l.69 6h-.26Zm-15.93-8.017v-.38a2.169 2.169 0 0 0 2.49-2.525V10h-6.82v6.087a2.169 2.169 0 0 0 2.49 2.525v.38h-8.63v-.38a3.493 3.493 0 0 0 1.17-.189 2.806 2.806 0 0 0 .95-.551 2.616 2.616 0 0 0 .64-.892 3.045 3.045 0 0 0 .23-1.2V5.7a6.756 6.756 0 0 0-.41-2.5 4.035 4.035 0 0 0-1.15-1.644 4.588 4.588 0 0 0-1.8-.9 9.207 9.207 0 0 0-2.34-.275v18.612H4.49v-.38a3.493 3.493 0 0 0 1.17-.189 2.806 2.806 0 0 0 .95-.551 2.638 2.638 0 0 0 .64-.883 3.023 3.023 0 0 0 .23-1.206V.384a3.938 3.938 0 0 0-1.98.56 8.306 8.306 0 0 0-1.82 1.4 11.9 11.9 0 0 0-1.47 1.814 8.736 8.736 0 0 0-.94 1.851h-.26l.77-6h20.19v.38a2.217 2.217 0 0 0-2.49 2.526V9h6.82V2.906A2.22 2.22 0 0 0 23.81.38V0h13.67l.77 6h-.26a10.276 10.276 0 0 0-.96-2.022 7.987 7.987 0 0 0-1.39-1.738 6.422 6.422 0 0 0-1.8-1.215 5.146 5.146 0 0 0-2.17-.456h-2.21V9h1.32a3.84 3.84 0 0 0 1.98-.861 4.343 4.343 0 0 0 1.03-3.315h.29l1.18 9.117h-.29a5.86 5.86 0 0 0-.72-1.89A4.644 4.644 0 0 0 31.64 10h-2.18v8.423h2.95a5.146 5.146 0 0 0 2.17-.456 6.726 6.726 0 0 0 1.8-1.216 8.264 8.264 0 0 0 1.39-1.737 11.526 11.526 0 0 0 .96-2.023h.26l-.78 6h-14.4Z">
      </path>
    </svg>
  )
}

type HeaderProps =  {
  searchTerm: string;
  setSearchTerm: (e: string) => void ;
};

export default function Header({searchTerm, setSearchTerm}: HeaderProps) {
  const router = useRouter();

  const [headerSearchTerm, setHeaderSearchTerm] = useState<string>(searchTerm);
  const [focus, setFocus] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.stopPropagation;
    const term = event.target.value; 
    setHeaderSearchTerm(term)
  }

  // submit search phrase
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == 'Enter' && focus) {
        setSearchTerm(headerSearchTerm)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [headerSearchTerm, focus, setSearchTerm]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ 
        boxShadow: 'none'
        }}>
        <Container maxWidth="xl">

          <Toolbar disableGutters>
          <Typography
              variant="h1"
              noWrap
              onClick={(e) => {
                router.push('/collection').then(e => {
                  router.reload()
                });
              }}
              sx={{
                mr: 2,
                display: 'flex',
                textDecoration: 'none',
                flexGrow: 1,
                '&:hover': {
                  cursor: "pointer"
                }
              }}
            >
              <MetLogo />
            </Typography>



            <Search>
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
              
              <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                value={headerSearchTerm}
                onChange={(e) => handleSearchChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </Search>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}


