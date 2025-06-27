import React, { useState } from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Header } from '../components';

const scheduleData = [
  {
    Id: 1,
    Subject: 'Team Stand-up Meeting',
    StartTime: new Date(2025, 5, 17, 9, 0),
    EndTime: new Date(2025, 5, 17, 10, 0),
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: 'Design Review',
    StartTime: new Date(2025, 5, 18, 11, 0),
    EndTime: new Date(2025, 5, 18, 12, 30),
    CategoryColor: '#357cd2',
  },
  {
    Id: 3,
    Subject: 'Client Meeting',
    StartTime: new Date(2025, 5, 19, 14, 0),
    EndTime: new Date(2025, 5, 19, 15, 0),
    CategoryColor: '#7fa900',
  },
];

const PropertyPane = ({ children }) => (
  <div className="mt-5">{children}</div>
);

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState(null);
  const today = new Date();

  const change = (args) => {
    if (scheduleObj) {
      scheduleObj.selectedDate = args.value;
      scheduleObj.dataBind();
    }
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-gray-800 rounded-3xl shadow">
      <Header category="App" title="Calendar" />

      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={today}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>

      <PropertyPane>
        <div className="w-full mt-4">
          <DatePickerComponent
            value={today}
            showClearButton={false}
            placeholder="Select a Date"
            floatLabelType="Always"
            change={change}
            cssClass="e-outline"
          />
        </div>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
