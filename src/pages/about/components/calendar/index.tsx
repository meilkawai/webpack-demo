import React from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import styles from './index.less'
const CalendarComponent: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'));
  };

  return (
    <div className={styles.siteCalendarDemoCard}>
      <Calendar 
      className={styles.calendar}
      fullscreen={false} 
      onPanelChange={onPanelChange} />
    </div>
  );
};

export default CalendarComponent;
