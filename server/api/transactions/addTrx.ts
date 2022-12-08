import { db } from '@/server/lib/index';
import { useNow } from "@vueuse/core";
import { doc, setDoc, collection } from "firebase/firestore"; 


export default defineEventHandler(async (event) => {
    const now = useNow();
    const body = await useBody(event);
    
    const dbNew = doc(db, "user", body.address);
    await setDoc(dbNew, {});
    const dbTrx = doc(collection(db, "user", body.address, "trx"));
    
    await setDoc(dbTrx, {
        balance: body.balance,
        created: now.value
      });

    return "";
})