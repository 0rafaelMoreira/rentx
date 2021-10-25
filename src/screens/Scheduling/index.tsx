import React from 'react';
import {useTheme} from 'styled-components'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../component/BackButton';
import { Button } from '../../component/Button';
import { Calendar } from '../../component/Calendar';


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




export function Scheduling(){
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails')
    }
    function handleBack(){
		navigation.goBack();
	}


    const theme = useTheme()
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
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>
                
            </Header>
            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}