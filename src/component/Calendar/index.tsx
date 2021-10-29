import React from 'react';
import { Feather }from '@expo/vector-icons';
import {useTheme} from 'styled-components';
import {ptBR} from './localeConfig'
import {generateInterval} from './generateinterval';


import {
    Calendar as CustomCalendar,
    LocaleConfig,
    DateCallbackHandler,

} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDatesProps{
    [date: string]:{
        color: string;
        textColor: string;
        disabled?: Boolean;
        disableTouchEvent?: Boolean;

    }
}


interface CalendarProps {
    markedDates: MarkedDatesProps;
    onDayPress: DateCallbackHandler;
}
interface DayProps {
    dateString: string;
    day: number;
    month: string;
    timestamp: number;
    year: number;


}

function Calendar({ markedDates, onDayPress }: CalendarProps){
    const theme = useTheme()
    return (
        <CustomCalendar 
            renderArrow={(direction) =>
                <Feather 
                    name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
                    size={24}
                    color={theme.colors.text}
                />

            }

            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom:10,
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,

                textMonthFontFamily: theme.fonts.secondary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,

                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={new Date()}
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />

        
    );
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval,

}