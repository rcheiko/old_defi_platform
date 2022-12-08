import { db } from '@/server/lib/index';
import { collection, getDocs } from "firebase/firestore";

export default defineEventHandler(async event => { 
    const res = {};
    const collecUserDB = collection(db, "user", "0x6985409648", "trx")

    const getCollectionTrx = await getDocs(collecUserDB)
    getCollectionTrx.forEach((doc) => {
        res[doc.id] = doc.data();
    })
    return res;
})