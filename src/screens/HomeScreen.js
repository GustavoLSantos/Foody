import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon, UserIcon} from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);


const Home = () => {

    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = (category) => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    const getCategories = async () => {
        try{
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            if(response && response.data){
                setCategories(response.data.categories)
            }
        } catch(err){
            console.log('error: ', err.message)
        }
    }

    const getRecipes = async (category='Beef') => {
        try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if(response && response.data){
                setMeals(response.data.meals);
            }
        } catch(err){
            console.log('error: ', err.message)
        }
    }

    return (
        <StyledView>
            <StatusBar style='dark'/>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className='space-y-6  pt-14'
            >
                <StyledView className='mx-4 flex-row justify-between items-center mb-2'>
                    <UserIcon size={hp(4)} color='gray'/>
                    <BellIcon size={hp(4)} color='gray'/>
                </StyledView>

                <StyledView className='mx-4 space-y-2 mb-2'>
                    <StyledText className='text-neutral-600' style={{fontSize: hp(1.7)}}>Hello, Gusta!</StyledText>
                    <StyledView>
                        <StyledText className='font-semibold text-neutral-600' style={{fontSize: hp(3.8)}}>Make your own food</StyledText>
                    </StyledView>
                    <StyledText className='font-semibold text-neutral-600' style={{fontSize: hp(3.8)}}>
                        stay at <Text className="text-amber-400">home</Text>
                    </StyledText>
                </StyledView>

                <StyledView>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{fontSize: hp(1.7)}}
                        className="flex-1 bg-gray-200 rounded-full text-base mb-1 pl-3 tracking-wider mx-4 h-14"
                    />
                </StyledView>

                <StyledView className='mx-4'>
                    {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} handleChangeCategory={handleChangeCategory}/>}
                </StyledView>

                <StyledView>
                    <Recipes categories={categories} meals={meals}/>
                </StyledView>
            </StyledScrollView>
        </StyledView>
    );
};

export default withExpoSnack(Home);