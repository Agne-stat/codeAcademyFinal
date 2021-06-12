import React, { useEffect, useContext, useState } from 'react'
import { Weapons } from '../inventory/Weapons'
import { Armors } from '../inventory/Armors'
import { Potions } from '../inventory/Potions'
import axios from 'axios'
import { DataContext } from '../App';

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
    // const addWeapon = (index) => {
    //     let weapon = weapons[index]

    //     if(userData.gold >= weapon.price) {
    //         axios.put('http://localhost:5000/addWeapon/'+id, {weapon})
    //         .then((res) => {
    //             console.log(res)
    //         })

    //         let gold = userData.gold - weapon.price
            
    //         console.log(gold)

    //         axios.put('http://localhost:5000/updateUserData/'+id, {gold})
    //         .then((res) => {
    //             console.log(res)
    //         })

    //         setuserGold(gold)

    //     } else {
    //         console.log('Not enought gold')
    //     }
    // }

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
                   <div onClick={()=>addWeapon(0)}>Sword <span>{weapons[0].price}</span></div>
                   <div onClick={()=>addWeapon(1)}>Bow <span>{weapons[1].price}</span></div>
                   <div onClick={()=>addWeapon(2)}>Magic Wand <span>{weapons[2].price}</span></div>
               </div>
               <div>
                   <h3>Armors</h3>
                   <div onClick={()=>addArmor(0)}>Light <span>{armors[0].price}</span></div>
                   <div onClick={()=>addArmor(1)}>Medium <span>{armors[1].price}</span></div>
                   <div onClick={()=>addArmor(2)}>Strong <span>{armors[2].price}</span></div>
               </div>
               <div>
                   <h3>Potions</h3>
                   <div onClick={()=>addPotion(0)}>1 <span>{potions[0].price}</span></div>
                   <div onClick={()=>addPotion(1)}>2 <span>{potions[1].price}</span></div>
                   <div onClick={()=>addPotion(2)}>3 <span>{potions[2].price}</span></div>
               </div>
           </div>
        </div>
    )
}
