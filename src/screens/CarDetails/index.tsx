import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../component/BackButton';
import { ImageSlider } from '../../component/ImageSlider';
import { Accessory } from '../../component/Accessory';
import { Button } from '../../component/Button';


import {getAccessoryIcon} from '../../utils/getAccessoryIcon';


import {
    Container,
    Header,
    CarImages,
    Content,
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

interface Params {
    car: CarDTO
}

export function CarDetails(){
    const route = useRoute();
    const {car} = route.params as Params;

    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('Scheduling')
    }
    function handleBack(){
		navigation.goBack();
	}

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />

            </Header>

            <CarImages>
                <ImageSlider
                    imagesURL={car.photos}
                />
            </CarImages>

            <Content>
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

                <About>{car.about}</About>

            </Content>
            <Footer>
                <Button title="Escolher Período do Aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}