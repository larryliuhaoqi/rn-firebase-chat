/*

https://noootown.gitbooks.io/deeperience-react-native-boilerplate/content/Redux/Redux%20&%20React.html

https://redux.js.org/basics/actions

https://hulufei.gitbooks.io/react-tutorial/content/redux-basic.html

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

*/

// user Actions : change language payload
export type ChangeLocalePayload = {
    language: string,
};

// App - System Actions 
export type SystemState = {
    state: string,
    isFetching: boolean,
};

// auth Actions

// Login Page 
export type LoginFieldChangePayload = {
    field: string,
    value: string,
};

// Auth Sagas 
export type ResponseSuccessPayload = {
    data: any,
};

export type ResponseFailurePayload = {
    status: number,
    error: any,
};


// Auth Saga
export type AuthForm = {
    username: string,
    password: string,
};

export type AuthState = {
    state: string,
    isFetching: boolean,
    errorMessage: string,
    form: AuthForm,
    token: any,
    localAuth: LocalAuthPayload,
};


// User
export type UserState = {
    language: string,
    jobNo: string,
    lastAccess: Date,
    scene: string,
};



// HomeScreen type

export type HomeScreenVideoListDataPayload = {
    homeScreenVideoListData: Object,
};

export type HomeScreenState = {
    homeScreenVideoListData: HomeScreenVideoListDataPayload,
};

//
// ExploringScreen Type
export type ExploringScreenState = {
    exploringScreenData:Object,
};

export type HashTagDataPayload = {
    hashTagDataPayload:Object,
};

//CameraScreen Type
export type CameraScreenState = {
    cameraScreenData:Object,
};
// RestaurantScreen Type
export type  RestaurantScreenState = {
    restaurantScreenData:Object,
};
// UserProfileScreen Type
export type UserProfileScreenState = {
    userProfileScreenData:Object,
};

//CommentScreen type
export type CommentFormatPayload = {
    key:String,
    name:String,
    imageUrl:String,
    foodDescription:String,
    createdTime: Date,
    thumbnail:String,
};

export type CommentScreenListDataPayload = {
    commentScreenListData: Object,
};

export type CommentScreenState = {
    commentScreenListData:CommentScreenListDataPayload,
};

