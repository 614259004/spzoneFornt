
import axios from 'axios';


let url = "http://localhost/finalspzoneback/public";
let url2 = "https://trackapi.thailandpost.co.th/post/api/v1/track";

let axiosConfig = {
    headers:{
        'Authorization':'Token '+process.env.REACT_APP_AUTHORIZATION,
         'Content-Type':'application/json'
    }
}

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

async function axiosMethodPostEms(params){
    
    try {
        const result = await axios.post(url2,params,axiosConfig);
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

export function getprofile(params){
    let path = '/customers/getprofile';
    return axiosMethodPost(path,params);
};

export function updateprofile(params){
    let path = '/customers/updateprofile';
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

export const checkDelStock = (params) => {
    let path = '/orders/checkoutstock';
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

export const delAddress = (params) => {
    let path = '/customers/deleteaddressbyid';
    return axiosMethodPost(path,params);
};

export const updateAddress = (params) => {
    let path = '/customers/updateaddress';
    return axiosMethodPost(path,params);
};

//-------------------------------------------------------------------------
//Orders
export const addOrders = (params) => {
    let path = '/orders/addorder';
    return axiosMethodPost(path,params);
};

export const getOrders = () => {
    let path = '/orders/showorder';
    return axiosMethodGet(path);
};

export const getOrdersById = (params) => {
    let path = '/orders/showoderbyid';
    return axiosMethodPost(path,params);
};

export const getOrdersByCusId = (params) => {
    let path = '/orders/showOderbyCustomerid';
    return axiosMethodPost(path,params);
};

export const comfirmOrder = (id) => {
    let path = '/orders/confirmorder/'+id;
    console.log(path);
    return axiosMethodPut(path);
};

export const getOrdersDetail = (params) => {
    let path = '/orders/showOrderdetailbyid';
    return axiosMethodPost(path,params);
};

export const getAllOrdersDetail = () => {
    let path = '/orders/showOrderdetailAll';
    return axiosMethodGet(path);
};

export const cancleOrder = (id) => {
    let path = '/orders/cancleorder/'+id;
    return axiosMethodPut(path);
};


//-------------------------------------------------------------------------
//Promotion
export const getPromotion = () => {
    let path = '/promotions/showPromotion';
    return axiosMethodGet(path);
}

export const getPromotionUse = () => {
    let path = '/promotions/showPromotionbystatus';
    return axiosMethodGet(path);
}

export const addPromotion = (params) => {
    let path = '/promotions/addPromotion';
    return axiosMethodPost(path,params);
}

export const delPromotion = (params) => {
    let path = '/promotions/deletebyid';
    return axiosMethodPost(path,params);
}

export const updatePromotion = (params) => {
    let path = '/promotions/updatePromotion';
    return axiosMethodPost(path,params);
}

//-------------------------------------------------------------------------
//thailand
//แสดงจังหวัด
export const getProvince = () => {
    let path = '/thailand/getprovince';
    return axiosMethodGet(path);
}
//แสดงอำเภอตามไอดี
export const getAmphurById = (param) => {
    let path = '/thailand/getamphurbyid';
    return axiosMethodPost(path,param);
}

//แสดงอำเภอ
export const getAmphur = () => {
    let path = '/thailand/getamphur';
    return axiosMethodGet(path);
}

//แสดงตำบล
export const getDistrict = () => {
    let path = '/thailand/getdistrict';
    return axiosMethodGet(path);
}



//-------------------------------------------------------------------------
//tracking
//เพิ่มเลขพัสดุ
export const addTracking = (param) => {
    let path = '/ems/addTracking';
    return axiosMethodPost(path,param);
}
//โชว์เลขพัสดุ
export const showTracking = () => {
    let path = '/ems/showTracking';
    return axiosMethodGet(path);
}
//แก้ไขเลขพัสดุ
export const updateTracking = (param) => {
    let path = '/ems/editTracking';
    return axiosMethodPost(path,param);
}

//ติดตามเลขพัสดุ
export const followTracking = (param) => {
    return axiosMethodPostEms(param);
}