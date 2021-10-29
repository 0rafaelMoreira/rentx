import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../component/BackButton';
import { LoadAnimation } from '../../component/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import {StatusBar, FlatList} from 'react-native';
import { Car } from '../../component/Car';
import {AntDesign} from '@expo/vector-icons'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
    
} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: Number;
    endDate: Number;
}

export function MyCars(){
    const [cars, setCars]= useState<CarProps[]>([]);
    const [loading, setLoading]  = useState(true);

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                console.log(response.data);
                setCars(response.data);
            } catch (error) {
                console.log(error);
            }finally {
                setLoading(false);
            }
        }
        fetchCars();
    },[])

    const navigation = useNavigation();
    const theme = useTheme();

    function handleBack(){
		navigation.goBack();
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

                    <SubTitle>
                        Conforto, segurança e praticidade
                    </SubTitle>
                  
            </Header>
                {loading ?<LoadAnimation/> : 
            <Content>
                <Appointments>
                <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>
                
                <FlatList 
                    data={cars}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item })=> (
                        <CarWrapper>
                        <Car data={item.car}/>
                        <CarFooter>
                            <CarFooterTitle>Período</CarFooterTitle>
                            <CarFooterPeriod>
                                <CarFooterDate>{item.startDate}</CarFooterDate>
                            
                            <AntDesign
                            name="arrowright"
                            size={20}
                            color={theme.colors.title}
                            style={{marginHorizontal: 10}}
                            />
                            <CarFooterDate>{item.endDate}</CarFooterDate>
                            </CarFooterPeriod>
                        </CarFooter>
                        </CarWrapper>
                    )} 
                />
            </Content>
            }
        </Container>
    );
}
