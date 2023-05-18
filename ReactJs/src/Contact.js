import { useState } from "react";
import ContactList from "./ContactList";

const Contact = () => {
    let email ='mylasayhii@gmail.com';
    let addressobj={address1:'new street', address2:'chennai'}

    const[techlist, listupdate]=useState(
        [
            {id: 1, name: 'React', version: 18.2},
            {id: 2, name: 'Angular', version: 18.2},
            {id: 3, name: 'NodeJS', version: 18.2}
        ]
    )

    const removetech=(id)=> {
        console.log(id);
        const newlist=techlist.filter(item=>item.id!=id);
        listupdate(newlist);
    }
    return ( 
        <div>
            <ContactList title="Welcome to React Class" email={email} addobj={addressobj} techlist={techlist} removetech={removetech}></ContactList>
        </div>
    );
}

export default Contact;