import bow from '../images/bow.png'
import sword from '../images/sword.png'
import magic from '../images/magic.png'
export const Weapons = [
    {
        "type":"weapon",
        "name":"sword",
        "damage":8,
        "price":40,
        "sellPrice":5,
        "special":"has 20% chance to block enemy attack",
        "image":sword
    },
    {
        "type":"weapon",
        "name":"bow",
        "damage":6,
        "price":300,
        "sellPrice":80,
        "special":"has 30% chance to do double damage",
        "image":bow
    },
    {
        "type":"weapon",
        "name":"magic wand",
        "damage":5,
        "price":1000,
        "sellPrice":400,
        "special":"has 40% chance to heal hero on enemy attack by 10hit points",
        "image":magic
    }
]