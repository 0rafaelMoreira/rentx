import React  from 'react';
import { useNavigation, useRoute,  } from '@react-navigation/native';

import Animated,{
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate

} from 'react-native-reanimated';

import { BackButton } from '../../component/BackButton';
import { ImageSlider } from '../../component/ImageSlider';
import { Accessory } from '../../component/Accessory';
import { Button } from '../../component/Button';


import {getAccessoryIcon} from '../../utils/getAccessoryIcon';


import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import {useTheme} from 'styled-components'

interface Params {
    car: CarDTO
}

export function CarDetails(){
    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y)

    })

    const route = useRoute();
    const {car} = route.params as Params;

    const navigation = useNavigation();

    const theme = useTheme();

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
          height: interpolate(
            scrollY.value,
            [0, 200],
            [200, 70],
            Extrapolate.CLAMP
          ),
        }
      });

    const sliderCarsStyleAnimation =  useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }

    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', {car})
    }
    function handleBack(){
		navigation.goBack();
	}



    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    {backgroundColor: theme.colors.background_secondary}
                
                ]}
            >
                <Header>
                    <BackButton
                        onPress={handleBack}
                        
                    />

                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                    <ImageSlider
                        imagesURL={car.photos}
                    />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
            contentContainerStyle= {{
                paddingHorizontal: 24,
                paddingTop: getStatusBarHeight() + 160,  

            }}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator= {false}
            scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                            <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                        car.accessories.map(accessory => (
                        <Accessory 
                        key={accessory.type} 
                        name={accessory.name} 
                        icon={getAccessoryIcon(accessory.type)} />
                        ))
                    }
                   
                </Accessories>

                <About>
                    
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                
                </About>

            </Animated.ScrollView>
            <Footer>
                <Button title="Escolher Período do Aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex:1,
}

})