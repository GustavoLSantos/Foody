import { View, Text, ScrollView, StatusBar, TouchableOpacity}  from 'react-native'
import React, {useState, useEffect} from 'react'
import { styled } from 'nativewind'
import CachedImage from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import {ChevronLeftIcon, ClockIcon, FireIcon, UsersIcon} from 'react-native-heroicons/outline';
import {HeartIcon, Square3Stack3DIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledTO = styled(TouchableOpacity);


export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])
    

    const getMealData = async (id) => {
        try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if(response && response.data){
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch(err){
            console.log('error: ', err.message)
        }
    }

    const ingredientsIndexes = (meal) => {
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = (url) => {
       const regex = /[?&]v=([^&]+)/;
       const match = url.match(regex);
       if(match && match[1]){
           return match[1];
       }
       return null;
    }

  return (
    <StyledScrollView
        className='bg-white flex-1'
        showVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
    >
        <StatusBar style={'light'}/>

        <StyledView className='flex-row justify-center'>
            <CachedImage
                uri={item.strMealThumb}
                style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
            />
        </StyledView>

        <StyledView className='w-full absolute flex-row justify-between items-center pt-14'>
            <StyledTO onPress={() => navigation.goBack()} className='p-2 rounded-full ml-5 bg-white'>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24'/>   
            </StyledTO>
            <StyledTO onPress={() => setIsFavourite(!isFavourite)} className='p-2 rounded-full mr-5 bg-white'>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red' : 'gray'} />   
            </StyledTO>
        </StyledView>


        {
            loading ? (
                <Loading size='large' className="mt-16"/>
            ):
            (
                <StyledView className='px-4 flex justify-betweeb space-y-4 pt-8'>
                    <StyledView className='space-y-2'>
                        <StyledText style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                            {meal?.strMeal}
                        </StyledText>
                        <StyledText style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-500'>
                            {meal?.strArea}
                        </StyledText>
                    </StyledView>

                    <StyledView className='flex-row justify-around'>
                        <StyledView className='flex rounded-full bg-amber-300 p-2'>
                            <StyledView
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className='bg-white rounded-full flex items-center justify-center'
                            >
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                            </StyledView>
                            <StyledView className='flex items-center py-2 space-y-1'>
                                <StyledText style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                    35
                                </StyledText>
                                <StyledText style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                    Mins
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='flex rounded-full bg-amber-300 p-2'>
                            <StyledView
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className='bg-white rounded-full flex items-center justify-center'
                            >
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                            </StyledView>
                            <StyledView className='flex items-center py-2 space-y-1'>
                                <StyledText style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                    03
                                </StyledText>
                                <StyledText style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                    Servings
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='flex rounded-full bg-amber-300 p-2'>
                            <StyledView
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className='bg-white rounded-full flex items-center justify-center'
                            >
                                <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                            </StyledView>
                            <StyledView className='flex items-center py-2 space-y-1'>
                                <StyledText style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                    103
                                </StyledText>
                                <StyledText style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                    Cal
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className='flex rounded-full bg-amber-300 p-2'>
                            <StyledView
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className='bg-white rounded-full flex items-center justify-center'
                            >
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                            </StyledView>
                            <StyledView className='flex items-center py-2 space-y-1'>
                                <StyledText style={{fontSize: hp(2)}} className='font-bold text-neutral-700'/>
                                <StyledText style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                    Easy
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    <StyledView className='space-y-4'>
                        <StyledText style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                            Ingredients
                        </StyledText>
                        <StyledView className='space-y-2 ml-3'>
                            {ingredientsIndexes(meal).map(i => {
                                return(
                                    <StyledView key={i} className='flex-row space-x-4'>
                                        <StyledView style={{height: hp(1.5), width: hp(1.5)}} className='bg-amber-300 rounded-full'/>
                                        <StyledView className='flex-row space-x-2'>
                                            <StyledText style={{fontSize: hp(1.7)}} className='font-extrabold text-neutral-600'>{meal['strMeasure'+i]}</StyledText>
                                            <StyledText style={{fontSize: hp(1.7)}} className='font-medium text-neutral-600'>{meal['strIngredient'+i]}</StyledText>
                                        </StyledView>
                                    </StyledView>
                                )
                            })}
                        </StyledView>
                    </StyledView>

                    <StyledView className='space-y-4'>
                        <StyledText style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                            Instructions
                        </StyledText>
                       <StyledText style={{fontSize: hp(1.6)}} className='text-neutral-700'>
                            {
                                meal?.strInstructions
                            }
                       </StyledText>
                    </StyledView>

                    {
                        meal.strYoutube && (
                            <StyledView className='space-y-4'>
                                <StyledText style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                                    Recipe Video
                                </StyledText>
                                <StyledView>
                                     <YoutubeIframe
                                        videoId={getYoutubeVideoId(meal.strYoutube)}
                                        height={hp(30)}
                                    />
                                </StyledView>
                            </StyledView>
                        )
                    }

                </StyledView>
            )
        }
    </StyledScrollView>
  )
}