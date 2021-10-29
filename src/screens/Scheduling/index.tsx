import React, { useState } from 'react';
import {useTheme} from 'styled-components'
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDates } from '../../utils/getPlatformDates';
import { CarDTO } from '../../dtos/CarDTO';


import { BackButton } from '../../component/BackButton';
import { Button } from '../../component/Button';
import { Calendar,
     DayProps,  
     generateInterval,
     MarkedDatesProps
    } from '../../component/Calendar';


import ArrowSvg from '../../assets/arrow.svg'
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO
}



export function Scheduling(){
    const [lastSeletedDate, setLastSeletedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    
    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const {car} = route.params as Params;

    function handleConfirmRental() {
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert("Selecione o intervalo para alugar ")
        }else{
        navigation.navigate('SchedulingDetails',{
            car,
            dates: Object.keys(markedDates)
        });
        }
    }

    function handleBack(){
		navigation.goBack();
	}

    function handleChangeDate (date : DayProps ){
        let start = !lastSeletedDate.timestamp ? date : lastSeletedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSeletedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length -1];

        setRentalPeriod ({
            startFormatted: format(getPlatformDates(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDates(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

    
    return (
        <Container>
        <Header>
            <StatusBar 
                barStyle="lightcontent"
                translucent
                backgroundColor="transparent"
            />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Escolha uma{'\n'}
                    data de início e{'\n'}
                    fim do aluguel{'\n'}

                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                            </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                            </DateValue>
                    </DateInfo>
                </RentalPeriod>
                
            </Header>
            <Content>
                <Calendar 
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button 
                title="Confirmar" 
                onPress={handleConfirmRental}
                enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}