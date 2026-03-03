import { baseURL } from "./baseUrl"
import commonAPI from "./commonAPI"

// 1. authentication
//register
export const registerUser = async(reqBody)=>{

    return await commonAPI('POST',`${baseURL}/api/register`,reqBody,{})
}

//login
export const loginUser = async(reqBody) =>{
    return await commonAPI('POST',`${baseURL}/api/login`,reqBody,{})
}
//login-google
export const googleUser = async(reqBody) =>{
    return await commonAPI('POST',`${baseURL}/api/google-login`,reqBody,{})
}

// 2. language selection

export const addLanguage = async(reqBody,reqHeader) =>{
    return await commonAPI('PUT',`${baseURL}/api/user/language`,reqBody,reqHeader)
}
 // POST
// 1. Add POST
export const addPost = async(reqBody,reqHeader) =>{
    return await commonAPI('POST',`${baseURL}/api/addpost`,reqBody,reqHeader)
}

//2. Get POST - Feed
export const getFeedAPI = async(searchKey,reqHeader) =>{
    const url = searchKey
    return await commonAPI('GET',`${url ? `${baseURL}/api/feed?search=${searchKey}` : `${baseURL}/api/feed`}`,{},reqHeader)
}
// 3.Report

export const reportPostAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('POST',`${baseURL}/api/report`,reqBody,reqHeader)
}

// 4.like
export const likePostAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${baseURL}/api/like`,reqBody,reqHeader)
}
// 4.1 unlike
export const unLikePostAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${baseURL}/api/like`,reqBody,reqHeader)
}

//4. get post -user
export const userFeed = async(reqHeader)=>{
      return await commonAPI('GET',`${baseURL}/api/posts`,{},reqHeader)
}
//view post
export const viewPostAPI = async(id)=>{
      return await commonAPI('GET',`${baseURL}/api/posts/${id}`,{},{})
}
//edit post
export const EditPostAPI = async(id,reqBody,reqHeader) =>{
    return await commonAPI('PUT',`${baseURL}/api/updatepost/${id}`,reqBody,reqHeader)
}
//delete post
export const deletePostAPI = async(id,reqHeader) =>{
    return await commonAPI('DELETE',`${baseURL}/api/deletepost/${id}`,{},reqHeader)
}

//3 chat 
// 3. Chat APIs

// Search users
export const searchUserAPI = async (searchKey, reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/user-search?search=${searchKey}`, {}, reqHeader);
};

// Access (start) 1-1 chat
export const accessChatAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${baseURL}/api/access-chat`, reqBody, reqHeader);
};

// Fetch all chats of logged-in user
export const fetchChatsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/get-chat`, {}, reqHeader);
};

// Create group chat
export const createGroupChatAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${baseURL}/api/group-chat`, reqBody, reqHeader);
};

// Rename group chat
export const renameGroupChatAPI = async (reqBody, reqHeader) => {
    return await commonAPI('PUT', `${baseURL}/api/rename-groupchat`, reqBody, reqHeader);
};

// Messages

// Fetch messages of a chat
export const fetchMessagesAPI = async (chatId, reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/message/${chatId}`, {}, reqHeader);
};

// Send a message in a chat
export const sendMessageAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${baseURL}/api/message`, reqBody, reqHeader);
};


//4 user
export const userAPI = async(reqHeader)=>{
      return await commonAPI('GET',`${baseURL}/api/userData`,{},reqHeader)
}
export const userUpdateAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${baseURL}/api/updateData`,reqBody,reqHeader)
}


// 5 Payment
export const createCheckoutSessionAPI = async (reqHeader) => {
    return await commonAPI('POST',`${baseURL}/api/payment/create-session`,{},reqHeader);};

export const UpdatePremiumAPI = async (reqBody,reqHeader) => {
    return await commonAPI('POST',`${baseURL}/api/payment/update-premium`,reqBody,reqHeader);};

// Admin

export const allUserAPI = async(reqHeader)=>{
     return await commonAPI('GET',`${baseURL}/api/allUser`,{},reqHeader)
}
export const allReportsAPI = async(reqHeader)=>{
     return await commonAPI('GET',`${baseURL}/api/allReports`,{},reqHeader)
}
//ignore Report
export const ignoreReportsAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${baseURL}/api/ignoreReport`,reqBody,reqHeader)
}
//delete Report
export const deleteReportsAPI = async(postId,reqHeader)=>{
     return await commonAPI('DELETE',`${baseURL}/api/deleteReport/${postId}`,{},reqHeader)
}

//userList-search
export const adminSearchUserAPI = async (searchKey, reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/userList?search=${searchKey}`, {}, reqHeader);
};
// userList -deleteUser
export const adminDeleteUserAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${baseURL}/api/admin-deleteUser/${id}`, {}, reqHeader);
};

export const adminAPI = async ( reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/getAdmin`, {}, reqHeader);
};

export const updateadminAPI = async ( reqBody,reqHeader) => {
    return await commonAPI('PUT', `${baseURL}/api/updateAdmin`, reqBody, reqHeader);
};


//chart
export const chartPieAPI = async ( reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/chart-language`, {}, reqHeader);
};
export const chartLineAPI = async ( reqHeader) => {
    return await commonAPI('GET', `${baseURL}/api/chart-premium`, {}, reqHeader);
};

// 6. Notifications

// Get all notifications
export const getNotificationsAPI = async (reqHeader) => {
    return await commonAPI(
        'GET',
        `${baseURL}/api/notifications`,
        {},
        reqHeader
    );
};

// Mark all notifications as read
export const markNotificationsReadAPI = async (reqHeader) => {
    return await commonAPI(
        'PUT',
        `${baseURL}/api/notifications/read`,
        {},
        reqHeader
    );
};
