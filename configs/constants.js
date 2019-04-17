// mirror-creator
// One more way to create an object with values equal to its key names.
// https://www.npmjs.com/package/mirror-creator
// Pros: DRY & clean.
// Cons: If you use Closure Compiler advanced mode for JS minification — keys are not optimized. Use keyMirror instead. Details.
import mirrorCreator from 'mirror-creator';

export default mirrorCreator(
    [
        // App - System Actions 
        'APP_ACTIVE',
        'APP_INACTIVE',

        'SYSTEM_LOGIN',
        'SYSTEM_LOGOUT',

        // user Actions 
        'USER_CHANGE_LOCALE_REQUEST',
        'USER_CHANGE_LOCALE',
        'USER_CHANGE_LAST_ACCESS',

        // Authenication  Login Page
        'UI_LOGIN_AUTH_REQUEST',
        'UI_LOGIN_AUTH_SUCCESS',
        'UI_LOGIN_AUTH_FAILURE',
        'UI_LOGIN_FORM_FIELD_CHANGE',

        //Home Screen
        'UI_LOAD_HOME_SCREEN_VIDEO_LIST_DATA_ACTION',
        'UI_GET_HOME_SCREEN_VIDEO_LIST_DATA_SUCCESS',
        'UI_GET_HOME_SCREEN_VIDEO_LIST_DATA_FAILURE', 
        // Comment
        'UI_LOAD_COMMENT_SCREEN_LIST_DATA_ACTION',
        'UI_LOAD_COMMENT_SCREEN_LIST_DATA_SUCCESS',
        'UI_LOAD_COMMENT_SCREEN_LIST_DATA_FAILURE',
        //  Add Comment to server
        'UI_ADD_COMMENT_TO_SERVER_ACTION',
        'UI_ADD_COMMENT_TO_SERVER_SUCCESS',
        'UI_ADD_COMMENT_TO_SERVER_FAILURE',

        //Exploring Screen
        'UI_LOAD_HASHTAG_LIST_DATA_ACTION',
        'UI_LOAD_HASHTAG_LIST_DATA_SUCCESS',
        'UI_LOAD_HASHTAG_LIST_DATA_FAILURE', 


    ], { //prefix: 'com.gammon.cm.ctdSlumpTestApp/' 
        prefix: 'foodiePick'
    },
);