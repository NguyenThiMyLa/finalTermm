import { useEffect, useState } from "react";

const Home = () => {
    const HandleClick=()=> {
        headerChange('React JS');
        //console.log(pageTitle);
    }
    //let pageTitle='React JS 18.2 Tutorial';
    const[pageTitle, titleChange] = useState('React JS 18.2 Tutorial' )
    const[pageHeader, headerChange] = useState('React JS' )
    const obj={name: 'MyLa'}
        useEffect(()=> {
        },[pageTitle,pageHeader ]);
    return ( 
        <div>
            <h2>{pageTitle}</h2>
            <h2>{obj.name}</h2>
            <button class="btn btn-primary" onClick={()=> HandleClick()}>Click Here</button>
        </div>
    );
}
 
export default Home;
