import React from 'react';
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { BackButton } from '../../component/BackButton';
import { ImageSlider } from '../../component/ImageSlider';
import { Accessory } from '../../component/Accessory';
import { Button } from '../../component/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuotes,
    RentalPriceTotal,
} from './styles';
import { useNavigation } from '@react-navigation/native';



export function SchedulingDetails(){
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('SchedulingComplete')
    }
    function handleBack(){
		navigation.goBack();
	}
    const theme = useTheme();
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />

            </Header>

            <CarImages>
                <ImageSlider
                    imagesURL={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfAIfIYvGPVUxUBxR-_tdyDZcunqAB2c0fA&usqp=CAU']}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao Dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800hp" icon={forceSvg} />
                    <Accessory name="Gasonlina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon> 
                    <Feather
                        name= "calendar"
                        size={RFValue(24)}
                        color= {theme.colors.shape}
                    />
                    </CalendarIcon>
                    
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>22/10/2021</DateValue>
                    </DateInfo>

                        <Feather
                        name= "chevron-right"
                        size={RFValue(10)}
                        color= {theme.colors.text}
                    />
                    
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>25/10/2021</DateValue>
                    </DateInfo>

                </RentalPeriod>   

                <RentalPrice>
                    <RentalPriceLabel> TOTAL </RentalPriceLabel>
                    <RentalPriceDetails>

                        <RentalPriceQuotes>R$580 x3 diárias </RentalPriceQuotes>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    
                    </RentalPriceDetails>
                    
                </RentalPrice>

            </Content>
            <Footer>
                <Button title="Alugar Agora" color={theme.colors.success} onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}