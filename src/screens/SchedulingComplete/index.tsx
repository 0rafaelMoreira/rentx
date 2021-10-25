import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';


import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../component/ConfirmButton';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,

} from './styles';
import { useNavigation } from '@react-navigation/native';


export function SchedulingComplete(){
    const {width} = useWindowDimensions();
    const navigation = useNavigation();

    function handleConfirm() {
        navigation.navigate('Home')
    }

    return (
        <Container>

            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            
            />

            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro Alugado!</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até a consessionária da RENTX {'\n'}
                    pegar o seu automóvel.{'\n'}
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title= "OK" onPress={handleConfirm}/>
            </Footer>
        </Container>
    );
}