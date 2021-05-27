import axios from 'axios';
export default class issueApi{

    static async loadIssue(){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        // console.log("Token",token);
        
            // config.headers['x-auth-token']=token;
            
            return await axios.get("http://localhost:8000/issues",config)
            .then(res=>res.data)
            .catch(err=>console.log("Load Error ",err))   

    }


    static loginUser(){
        const email="2@a.a";
        const password="aaaaaa";
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({email,password});
         console.log(body);

        return axios.post("http://localhost:8000/auth/login",body,config)
             .then(res=>res.data)

    }

    static  addIssue({Issue,Description,Severity,Status,user}){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({Issue,Description,Severity,Status,user});
         console.log("Data:",body);

        return axios.post("http://localhost:8000/add_issue",body,config)
             .then(res=> res.data)
            //  .catch(err=>console.log("Register Error:",err))
    }



    
    static  editIssue({id,Issue,Description,Severity,Status,user,Comments}){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({id,Issue,Description,Severity,Status,user,Comments});
         console.log("Data:",body);

        return axios.post("http://localhost:8000/update_issue",body,config)
             .then(res=> res.data)
            //  .catch(err=>console.log("Register Error:",err))
    }



    static  deleteIssue({id}){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body=JSON.stringify({id});
         console.log("Data:",body);

        return axios.post("http://localhost:8000/delete_issue",body,config)
             .then(res=> res.data)
            //  .catch(err=>console.log("Register Error:",err))
    }
}