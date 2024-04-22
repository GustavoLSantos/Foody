import React, {useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(Animated.View)
const StyledText = styled(Text)

const WelcomeScreen = () => {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value+hp(4)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value+hp(4.5)), 100);

        setTimeout(() => navigation.navigate('Home'), 2000)
    }, []);


    return (
        <StyledView className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
            <StatusBar style='dark'/>

            <StyledView className='bg-white/20 rounded-full' style={{padding: ring2padding}}>
                <StyledView className='bg-white/20 rounded-full' style={{padding: ring1padding}}>
                    <Image source={require('../../assets/images/welcome.png')} style={{width: hp(30), height: hp(30)}}/>
                </StyledView>
            </StyledView>
        
            <StyledView className='flex items-center space-y-2'>
                <StyledText className='font-bold text-white tracking-widest' style={{fontSize: hp(7)}}>
                    Foody
                </StyledText>
                <StyledText className='font-medium text-white tracking-widest' style={{fontSize: hp(2)}}>
                    Food is always right
                </StyledText>

            </StyledView>
        </StyledView>
    );
};


export default withExpoSnack(WelcomeScreen);