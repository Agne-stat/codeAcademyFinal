import React, { useEffect, useContext, useState } from 'react'
import { Enemies } from '../inventory/Enemies'
import { DataContext } from '../App';
import axios from 'axios';

export default function Arena() {
    const { userData } = useContext(DataContext)

    let enemies = Enemies;

    const id = localStorage.getItem('gameUser-id');

    return (
        <div>
            <h1>Arena</h1>
        </div>
    )
}
