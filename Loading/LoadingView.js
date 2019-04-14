import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View} from 'react-native';

import styles from './styles';



const LoadingView = ( { children, style}) =>{
    
    const containerStyles = [styles.container];
    if( style !== null ){
        containerStyles.push(style);
    }
    
    let childrenView = children;
    if( !childrenView ){
        childrenView = <ActivityIndicator size="large" color="#fff" />;
    }

    return (
        <View style={ containerStyles} { ...this.props}>
            { childrenView }
        </ View>
    );
};


LoadingView.propTypes = {
    children: PropTypes.node,
    style: PropTypes.any,
};

LoadingView.defaultProps ={
    style:null,
};

export default LoadingView;