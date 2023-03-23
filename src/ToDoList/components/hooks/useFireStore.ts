import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../index";

export const  useFireStore = (mycollection:string) => {
    const [docs, setDocs] = useState<any[]>([]);


    // @ts-ignore
    useEffect(() => {
    const  unsubscribe = async () => {
        const querySnapshot = await getDocs(collection(db,mycollection));

        const document:any[] =[];
        querySnapshot.forEach((doc) => {
            document.push({
                ...doc.data(),
                id: doc.id
            });
        });
        setDocs(document);
    }

        return unsubscribe;
    }, [mycollection]);

    return { docs };
}