
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
    let path = '/customer/addCustomer';
    
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

export function logIn(params){
    let path = '/customers/login';
    
    return axiosMethodPost(path,params);
}

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

export const showbrand = () => {
    let path = '/brands/showbrand';
    return axiosMethodGet(path);
};

export function addbrand(params){
    
    let path = '/brands/addbrand';
    return axiosMethodPost(path,params);
};

export const  updatebrand = (params)=>{
    let path = '/brands/updatebrand/'+params.B_brandid;
    return axiosMethodPut(path,params);
};

export function deletebrand(params){
    let path = '/brands/updatestatusbrand/'+params.B_brandid;
    return axiosMethodPut(path,params);
};

//-------------------------------------------------------------------------
//Product

export const showproduct = () => {
    let path = '/products/showproduct';
    return axiosMethodGet(path);
};

export const addproduct = (params) => {
    let path = '/products/addproduct';
    return axiosMethodPost(path,params);
};

export const editproduct = (params,id) => {
    let path = '/products/updateproduct/'+id;
    return axiosMethodPut(path,params);
};

//-------------------------------------------------------------------------
//Product size
export const showsize = (params) => {
    let path = '/products/showproductandsize/'+params.P_productid;
    return axiosMethodGet(path,params);
};

export const addsize = (params) => {
    let path = '/products/addsize';
    return axiosMethodPost(path,params);
};

export const showallsize = () => {
    let path = '/products/showsize';
    return axiosMethodGet(path);
};

export const updateamountsize = (params,id) => {
    
    let path = '/products/updatesize/'+id;
    return axiosMethodPut(path,params);
};

export const deletesize = (params) => {
    let path = '/products/deletesize';
    return axiosMethodPost(path,params);
};

//-------------------------------------------------------------------------

//Check Product Check size
export const checkDataDuplicate = (params) => {
    let path = '/recheck/checkduplicatename';
    return axiosMethodPost(path,params);
};

export const checkSizeDataDuplicate = (params) => {
    
    let path = '/recheck/checkSize';
    return axiosMethodPost(path,params);
};
//-------------------------------------------------------------------------
//Cart

export const addCart = (params) => {
    let path = '/carts/addcart';
    return axiosMethodPost(path,params);
};

export const getCart = (params) => {
    let path = '/carts/showcartbyid';
    return axiosMethodPost(path,params);
};

export const delCart = (params) => {
    let path = '/carts/deletecartbyid';
    return axiosMethodPost(path,params);
};


//-------------------------------------------------------------------------
//Address

export const getAddress = (params) => {
    let path = '/customers/getaddress';
    return axiosMethodPost(path,params);
};

export const addAddress = (params) => {
    let path = '/customers/addaddress';
    return axiosMethodPost(path,params);
};




//-------------------------------------------------------------------------
//Orders
export const addOrders = (params) => {
    let path = '/orders/addorder';
    return axiosMethodPost(path,params);
};


//-------------------------------------------------------------------------
//Promotion
export const getPromotion = () => {
    let path = '/promotions/showPromotion';
    return axiosMethodGet(path);
}

//-------------------------------------------------------------------------