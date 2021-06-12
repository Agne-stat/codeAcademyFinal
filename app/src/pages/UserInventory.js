import React, { useContext, useEffect } from 'react'
import { DataContext } from '../App';

export default function UserInventory() {
    const { userData } = useContext(DataContext)

    useEffect(() => {

    }, [])
    return (
        <div>
            <h1>Your Inventory</h1>
            <div>
                <div>
                    <h3>Weapon:</h3>
                    <p>{userData.inventoryWeapons[0].name}</p>
                    
                </div>
                <div>
                    <h3>Armor:</h3>
                    <p>{userData.inventoryArmors[0].defence}</p>
                </div>
                <div>
                    <h3>Potion:</h3>
                    <p>{userData.inventoryPotions[0].heals}</p>
                </div>
            </div>
        </div>
    )
}
