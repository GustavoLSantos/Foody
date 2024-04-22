import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import { styled } from 'nativewind';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loading from './loading';
import CachedImage from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledAnimatedView = styled(Animated.View);


const Recipes = ({categories, meals}) => {
    const navigation = useNavigation();
    return (
        <StyledView>
            <StyledText style={{fontSize: hp(3)}} className='font-semibold text-neutral-600 mx-4 space-y-2 mb-2'>Recipes</StyledText>
            <StyledView>
                {
                    categories.length==0 || meals.length==0 ? 
                    <Loading size='large' className='mt-20'/>
                    :
                    <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    onEndReachedThreshold={0.1}
                    />
                }
               
            </StyledView>
        </StyledView>
    );
};

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index % 2 === 0;
    return(
        <StyledAnimatedView entering={FadeInDown.delay(index*100).duration(600).damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven ? 0:8, paddingRight: isEven ? 8:0}}
                className='flex justify-center mb-4 space-y-1'
                onPress={() => navigation.navigate('RecipeDetail', {...item})}
            >
                <CachedImage 
                    uri={item.strMealThumb}
                    style={{width: '100%', height: index%3===0? hp(25) : hp(35), borderRadius: 35}}
                    className='bg-black/5 mb-2 ml-2 mr-2 mt-4'
                />
                <StyledText style={{fontSize: hp(1.5)}} className='font-semibold ml-2 text-neutral-600'>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0,20) + '...': item.strMeal
                    }
                </StyledText>
            </Pressable>
        </StyledAnimatedView>
    )
}

export default Recipes;