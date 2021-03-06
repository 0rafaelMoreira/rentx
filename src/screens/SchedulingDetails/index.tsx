import React, { useEffect, useState } from 'react';
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

import { BackButton } from '../../component/BackButton';
import { ImageSlider } from '../../component/ImageSlider';
import { Accessory } from '../../component/Accessory';
import { Button } from '../../component/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDates } from '../../utils/getPlatformDates';
import { format } from 'date-fns';





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






interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}


export function SchedulingDetails(){
    const [rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({}as RentalPeriod)
    const [loading, setLoading] = useState()

    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const {car, dates} = route.params as Params;
    
    const rentTotal = Number(dates.length * car.rent.price);



    async function handleConfirmRental() {
        setLoading(true);
        const schedules_bycars:any = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            
            ...schedules_bycars.data.unavailable_dates,
            ...dates,
        ];

        await api.post('/schedules_byuser', {
            user_id: 1,
            car,
            
            startDate: format(getPlatformDates(new Date(dates[0])),'dd/MM/yyyy'),
            endDate: format(getPlatformDates(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
        });

        api.put(`/schedules_bycars/${car.id}`, {
			id: car.id,
			unavailable_dates
		})
		.then(() => navigation.navigate("SchedulingComplete"))
		.catch(() => {
			setLoading(false);
			Alert.alert("N??o foi poss??vel realizar o agendamento")
		})

       


    }


    function handleBack(){
		navigation.goBack();
	}
    useEffect(() =>{
        setRentalPeriod({
            start: format(getPlatformDates(new Date(dates[0])),'dd/MM/yyyy'),
            end: format(getPlatformDates(new Date(dates[dates.length - 1])),'dd/MM/yyyy'),
        })
    },[])
    
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
                        icon={getAccessoryIcon(accessory.type)}  />
                        ))
                    }
                   
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
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                        <Feather
                        name= "chevron-right"
                        size={RFValue(10)}
                        color= {theme.colors.text}
                    />
                    
                    <DateInfo>
                        <DateTitle>AT??</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>

                </RentalPeriod>   

                <RentalPrice>
                    <RentalPriceLabel> TOTAL </RentalPriceLabel>
                    <RentalPriceDetails>

                        <RentalPriceQuotes>{`R$ ${car.rent.price} x${dates.length} di??rias`} </RentalPriceQuotes>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    
                    </RentalPriceDetails>
                    
                </RentalPrice>

            </Content>
            <Footer>
                <Button 
                title="Alugar Agora" 
                color={theme.colors.success} 
                onPress={handleConfirmRental}
                enabled={!loading}
                loading={loading}
                />
            </Footer>
        </Container>
    );
}