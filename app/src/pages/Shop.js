import React, { useEffect, useContext, useState } from 'react'
import { Weapons } from '../inventory/Weapons'
import { Armors } from '../inventory/Armors'
import { Potions } from '../inventory/Potions'
import axios from 'axios'
import { DataContext } from '../App';
import UserProfile from '../components/UserProfile'
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
            <UserProfile user={userData} gold={userGold} health={userData.health}></UserProfile>
           <h1>Shop</h1>
           <div>
               <div>
                   <h3>Weapons</h3>
                       <div>
                            <button disabled={userGold<weapons[0].price} onClick={()=>addWeapon(0)}>{weapons[0].price}</button>
                            <img src={weapons[0].image} alt="weapon"></img>
                       </div>
                       <div>
                            <button disabled={userGold<weapons[1].price} onClick={()=>addWeapon(1)}>{weapons[1].price}</button>
                            <img src={weapons[1].image} alt="weapon"></img>
                       </div>
                       <div>
                            <button disabled={userGold<weapons[2].price} onClick={()=>addWeapon(2)}>{weapons[2].price}</button>
                            <img src={weapons[2].image} alt="weapon"></img>
                       </div>
                   
               </div>
               <div>
                   <h3>Armors</h3>
                       <div>
                            <button disabled={userGold<armors[0].price} onClick={()=>addArmor(0)}>{armors[0].price}</button>
                            <img src={armors[0].image} alt="armor"></img>
                       </div>
                       <div>
                            <button disabled={userGold<armors[1].price} onClick={()=>addArmor(1)}>{armors[1].price}</button>
                            <img src={armors[1].image} alt="armor"></img>
                       </div>
                       <div>
                            <button disabled={userGold<armors[2].price} onClick={()=>addArmor(2)}>{armors[2].price}</button>
                            <img src={armors[2].image} alt="armor"></img>
                       </div>
               </div>
               <div>
                   <h3>Potions</h3>
                       <div>
                            <button disabled={userGold<potions[0].price} onClick={()=>addPotion(0)}>{potions[0].price}</button>
                            <img src={potions[0].image} alt="potion"></img>
                       </div>
                       <div>
                            <button disabled={userGold<potions[1].price} onClick={()=>addPotion(1)}>{potions[1].price}</button>
                            <img src={potions[1].image} alt="potion"></img>
                       </div>
                       <div>
                            <button disabled={userGold<potions[2].price} onClick={()=>addPotion(2)}>{potions[2].price}</button>
                            <img src={potions[2].image} alt="potion"></img>
                       </div>
               </div>
           </div>
        </div>
    )
}
