
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar, Flex, Radio, Select, theme, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSelectedDate } from '../../../../../store/slice/BookingCardDataState/BookingCardDataSlice';
dayjs.extend(dayLocaleData);


const CalendarBox = ({ availableDays, onDateSelect, selectedDate }) => {

    const dispatch = useDispatch()

    const { token } = theme.useToken();

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const onDateChange = (value) => {
        if (onDateSelect) {
            onDateSelect(value.format('YYYY-MM-DD'));
        }
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };


    useEffect(() => {
        setSelectedDate(availableDays[0])
    }, [dispatch])

    return (
        <div>
            <Calendar
                fullscreen={false}
                value={selectedDate ? dayjs(selectedDate) : undefined}
                onChange={onDateChange}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const year = value?.year();
                    const month = value?.month();
                    const yearOptions = Array.from({ length: 20 }, (_, i) => {
                        const label = year - 10 + i;
                        return { label, value: label };
                    });
                    const monthOptions = value
                        ?.localeData()
                        ?.monthsShort()
                        ?.map((label, index) => ({
                            label,
                            value: index,
                        }));
                    return (
                        <div style={{ padding: 8 }}>
                            {/* <Typography.Title level={4}>Select Date{`${year}`}</Typography.Title> */}
                            <Flex gap={3}>
                                <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                                    {/* <Radio.Button value="month">Month</Radio.Button> */}
                                    {/* <Radio.Button value="year">Year</Radio.Button> */}
                                </Radio.Group>
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={year}
                                    options={yearOptions}
                                    onChange={newYear => {
                                        const now = value.clone().year(newYear);
                                        onChange(now);
                                    }}
                                />
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={month}
                                    options={monthOptions}
                                    onChange={newMonth => {
                                        const now = value.clone().month(newMonth);
                                        onChange(now);
                                    }}
                                />
                            </Flex>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
                disabledDate={(date) => {
                    if (!availableDays || availableDays.length === 0) {
                        return true;
                    }
                    const formattedDate = date.format('YYYY-MM-DD');

                    return !availableDays.includes(formattedDate);
                }}

            />
        </div>
    );
};
export default CalendarBox;



