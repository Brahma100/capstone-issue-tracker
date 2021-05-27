import axios from 'axios';
export default class UserApi{

    static async loadUser(token){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        console.log("Token",token);
        if(token){
            config.headers['x-auth-token']=token;
            
            return await axios.get("http://localhost:8000/auth/user",config)
            .then(res=>res.data)
            .catch(err=>console.log("Load Error ",err))

            
            
              
        }
        else{
            return Promise.reject();
        }

    }


    static loginUser({email,password}){
        
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({email,password});
         console.log(body);

        return axios.post("http://localhost:8000/auth/login",body,config)
             .then(res=>res.data)
             .catch(err=>err)

    }

    static  registerUser({fname,lname,email, password,city,state,postal,country,ip}){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({fname,lname,email, password,city,state,postal,country,ip});
         console.log("Data:",body);

        return axios.post("http://localhost:8000/auth/register",body,config)
             .then(res=> res.data)
         
    }
}