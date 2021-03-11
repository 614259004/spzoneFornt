
import axios from 'axios';


let url = "http://localhost/finalspzoneback/public";

//-------------------------------------------------------------------------

async function axiosMethodPost(path,params){
    try {
        const result = await axios.post(url+path,params);
        return result.data;
    } 
    catch (error) {
        return error.message;
    }


}

async function axiosMethodPut(path,params){
    try {
        const result = await axios.put(url+path,params);
        return result.data;
    } 
    catch (error) {
        return error.message;
    }
}

async function axiosMethodGet(path){
    try {
        const result = await axios.get(url+path);
        return result.data;
    } 
    catch (error) {
        return error.message;
    }
}

//-------------------------------------------------------------------------
// Customer

export function sendDataRegister(params){
    let path = '/Customer/addCustomer';
    console.log(params);
    return axiosMethodPost(path,params);
};

export function addcustomer(params){
    let path = '/customers/addcustomer';
    return axiosMethodPost(path,params);
};

export function addaddress(params){
    let path = '/customers/addaddress';
    return axiosMethodPost(path,params);
};

export function getprofile(params){
    let path = '/customers/getprofile';
    return axiosMethodPost(path,params);
};

export function updateprofile(params){
    let path = '/customers/updateprofile/CM0001';
    return axiosMethodPut(path,params);
};

export function updateaddress(params){
    let path = '/customers/updateaddress';
    return axiosMethodPost(path,params);
};

//-------------------------------------------------------------------------
//Category

export function showcate(){
    let path = '/categorys/showcate';
    return axiosMethodGet(path);
};

export function addcate(params){
    let path = '/categorys/addcate';
    return axiosMethodPost(path,params);
};

export function editcate(params){
    let path = '/categorys/updatecate/'+params.Cg_categoryid;
    console.log(path);
    return axiosMethodPut(path,params);
};

export function deletecate(params){
    let path = '/categorys//updatestatuscate/'+params.Cg_categoryid;
    console.log(path);
    return axiosMethodPut(path,params);
};

//-------------------------------------------------------------------------
//Brand

export function showbrand(){
    let path = '/brands/showbrand';
    return axiosMethodGet(path);
};

export function addbrand(params){
    console.log(params);
    let path = '/brands/addbrand';
    return axiosMethodPost(path,params);
};

export function updatebrand(params){
    let path = '/brands/updatebrand/'+params.B_brandid;
    return axiosMethodPut(path,params);
};

export function deletebrand(params){
    let path = '/project/public/Brand/'+params.B_brandid;
    return axiosMethodPut(path,params);
};

//-------------------------------------------------------------------------
//Product