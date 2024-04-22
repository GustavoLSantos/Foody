import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Loading(props) {
    return (
        <StyledView className='flex-1 flex justify-center items-center'>
            <ActivityIndicator {...props}/>
        </StyledView>
    );
}