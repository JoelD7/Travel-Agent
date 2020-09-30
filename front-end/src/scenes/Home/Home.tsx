import * as React from 'react';
import { Component } from 'react';
import { Navbar } from '../../components/molecules';
import { homeStyles } from '../../styles/Home/home-styles';

export function Home() {
    const style = homeStyles();
    
    return(
        <div>
            <Navbar/>
            home
        </div>
    );
};
