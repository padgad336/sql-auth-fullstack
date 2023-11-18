
import { Link as routeLink, useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { request } from "../axios-config";



const GetProfile = () => {

    const [me, setMe] = useState(null)
    const navagate = useNavigate()


    useEffect(() => {
        const getMe = async () => {
            const token = localStorage.getItem('mytoken')
            const response = await request.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response?.data)
                setMe(response?.data)
        }
        getMe()
    }, [])
    console.log(me);
    return (
        <>
            <Container component="main" maxWidth="lg">
                <Box component={'div'} sx={{ display: 'flex', justifyContent: 'flex-start', width: '1000px' }}>
                    {
                        me ?
                            <div>

                                <Typography variant="h1">Welcome ! {me?.name}</Typography>
                                <Typography variant="h4">pid:{me?.pid}</Typography>
                                <Typography variant="h4">name: {me?.name}</Typography>
                                <Typography variant="h4">username: {me?.username}</Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        localStorage.setItem('mytoken', '')
                                        navagate('/')
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>

                            : <div >
                                <Typography variant="h1">Please Login</Typography>
                                <Link component={routeLink} to={'/'}> Go go Login</Link>
                            </div>
                    }

                </Box>
            </Container>
        </>
    )
}
export default GetProfile