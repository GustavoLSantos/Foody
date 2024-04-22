import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { categoryData } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CachedImage from '../helpers/image';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledAnimatedView = styled(Animated.View);
const StyledScrollView = styled(ScrollView);

export default function Categories({categories, activeCategory, setActiveCategory, handleChangeCategory}) {

    return (
        <StyledAnimatedView entering={FadeInDown.duration(500).springify()}>
            <StyledScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    categories.map((cat, index) => {
                        let isActive = cat.name==activeCategory;
                        let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';
                        return(
                            <TouchableOpacity
                                key={index}
                                className='flex items-center space-y-1'
                                onPress={() => handleChangeCategory(cat.strCategory)}
                            >
                                <View className={'rounded-full p-[6px]'+activeButtonClass}>
                                    <CachedImage
                                        uri={cat.strCategoryThumb}
                                        style={{width: hp(6), height: hp(6)}}
                                        className='rounded-full'
                                    />
                                </View>
                                <StyledText className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                                    {cat.strCategory}
                                </StyledText>
                            </TouchableOpacity>
                        )
                    })
                }
            </StyledScrollView>
        </StyledAnimatedView>
    );
}