import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Flex, Select, theme } from 'antd';
import { useEffect } from 'react';

dayjs.extend(dayLocaleData);

const CalendarBox = ({ availableDays, selectedDate, setSelectedDate }) => {
    const { token } = theme.useToken();

    useEffect(() => {
        if (availableDays?.length && !selectedDate) {
            setSelectedDate(availableDays[0]);
        }
    }, [availableDays, selectedDate, setSelectedDate]);

    const onDateChange = (value) => {
        setSelectedDate(value.format('YYYY-MM-DD'));
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div style={wrapperStyle}>
            <Calendar
                fullscreen={false}
                value={selectedDate ? dayjs(selectedDate) : undefined}
                onChange={onDateChange}
                disabledDate={(date) => {
                    if (!availableDays || availableDays.length === 0) return true;
                    return !availableDays.includes(date.format('YYYY-MM-DD'));
                }}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const year = value.year();
                    const month = value.month();

                    const yearOptions = Array.from({ length: 20 }, (_, i) => ({
                        label: year - 10 + i,
                        value: year - 10 + i,
                    }));
                    const monthOptions = value
                        .localeData()
                        .monthsShort()
                        .map((label, index) => ({ label, value: index }));

                    return (
                        <div style={{ padding: 8 }}>
                            <Flex gap={3}>
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={year}
                                    options={yearOptions}
                                    onChange={(newYear) => onChange(value.clone().year(newYear))}
                                />
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={month}
                                    options={monthOptions}
                                    onChange={(newMonth) => onChange(value.clone().month(newMonth))}
                                />
                            </Flex>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default CalendarBox;
