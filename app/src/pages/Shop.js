import React, { useEffect, useContext, useState } from 'react'
import { Weapons } from '../inventory/Weapons'
import { Armors } from '../inventory/Armors'
import { Potions } from '../inventory/Potions'
import axios from 'axios'
import { DataContext } from '../App';
import './Shop.css'

export default function Shop() {
    const { userData } = useContext(DataContext)
    const [userGold, setuserGold] = useState(0)

    let weapons = Weapons;
    let armors = Armors;
    let potions = Potions;
    const id = localStorage.getItem('gameUser-id');

    useEffect(() => {
        setuserGold(userData.gold)
    }, [userData])


    const addWeapon = (index) => {
        let weapon = weapons[index]

            axios.put('http://localhost:5000/addWeapon/'+id, {weapon})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - weapon.price
            
            console.log(gold)

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)
    }

    const addArmor = (index) => {
        let armor = armors[index]

        if(userData.gold >= armor.price) {
            axios.put('http://localhost:5000/addArmor/'+id, {armor})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - armor.price

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)

        } else {
            console.log('Not enought gold')
        }
    }

    const addPotion = (index) => {
        let potion = potions[index]

        if(userData.gold >= potion.price) {
            axios.put('http://localhost:5000/addPotion/'+id, {potion})
            .then((res) => {
                console.log(res)
            })

            let gold = userData.gold - potion.price

            axios.put('http://localhost:5000/updateUserData/'+id, {gold})
            .then((res) => {
                console.log(res)
            })

            setuserGold(gold)

        } else {
            console.log('Not enought gold')
        }
    }


    return (
        <div>
           <h1>Shop</h1>
           <div>
               <h3>You have {userGold}</h3>
           </div>
           <div>
               <div>
                   <h3>Weapons</h3>
                   {weapons.map(weapon => (
                       <div>
                            <button disabled={userGold<weapon.price} onClick={()=>addWeapon(weapon.index)}>{weapon.price}</button>
                            <img src={weapon.image} alt="weapon"></img>
                       </div>
                       
                   ))}
               </div>
               <div>
                   <h3>Armors</h3>
                   {armors.map(armor => (
                       <div>
                            <button disabled={userGold<armor.price} onClick={()=>addArmor(armor.index)}>{armor.price}</button>
                            <img src={armor.image} alt="armor"></img>
                       </div>
                       
                   ))}
               </div>
               <div>
                   <h3>Potions</h3>
                   {potions.map(potion => (
                       <div>
                            <button disabled={userGold<potion.price} onClick={()=>addPotion(potion.index)}>{potion.price}</button>
                            <img src={potion.image} alt="potion"></img>
                       </div>
                    ))}
                   
               </div>
           </div>
        </div>
    )
}
