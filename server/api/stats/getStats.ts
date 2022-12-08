import { db } from '@/server/lib/index';
import { collection, getDocs } from "firebase/firestore";

export default defineEventHandler(async event => { 
    const body = await useBody(event);
    const res = {};
    const collecUserDB = collection(db, "user", body.address, "stats")

    const getCollectionStats = await getDocs(collecUserDB)
    getCollectionStats.forEach((doc) => {
        res[doc.id] = doc.data();
    })
    return res;
})